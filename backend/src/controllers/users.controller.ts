import { Response, NextFunction } from "express";
import { pool } from "../db/pool";
import { AuthedRequest } from "../middleware/auth";
import { ApiError } from "../middleware/errorHandler";

export async function getProfile(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const result = await pool.query(
      `SELECT id, first_name, last_name, email, phone, role, loyalty_points, avatar_url, created_at
       FROM users WHERE id = $1`,
      [req.user!.userId]
    );
    if (!result.rowCount) throw new ApiError(404, "User not found");
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function updateProfile(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const { firstName, lastName, phone, avatarUrl } = req.body;
    const result = await pool.query(
      `UPDATE users SET
         first_name = COALESCE($1, first_name),
         last_name  = COALESCE($2, last_name),
         phone      = COALESCE($3, phone),
         avatar_url = COALESCE($4, avatar_url)
       WHERE id = $5
       RETURNING id, first_name, last_name, email, phone, role, loyalty_points, avatar_url`,
      [firstName, lastName, phone, avatarUrl, req.user!.userId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}
