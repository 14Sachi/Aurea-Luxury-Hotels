import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { pool } from "../db/pool";
import { signToken } from "../utils/jwt";
import { ApiError } from "../middleware/errorHandler";
import { AuthedRequest } from "../middleware/auth";

const signupSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(8),
});

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const data = signupSchema.parse(req.body);
    const existing = await pool.query("SELECT id FROM users WHERE email = $1", [data.email]);
    if (existing.rowCount) throw new ApiError(409, "An account with this email already exists");

    const passwordHash = await bcrypt.hash(data.password, 10);
    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, email, phone, password_hash)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, first_name, last_name, email, phone, role, loyalty_points, created_at`,
      [data.firstName, data.lastName, data.email, data.phone ?? null, passwordHash]
    );
    const user = result.rows[0];
    const token = signToken({ userId: user.id, role: user.role });
    res.status(201).json({ token, user });
  } catch (err) {
    next(err);
  }
}

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function signin(req: Request, res: Response, next: NextFunction) {
  try {
    const data = signinSchema.parse(req.body);
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [data.email]);
    const user = result.rows[0];
    if (!user) throw new ApiError(401, "Invalid email or password");

    const valid = await bcrypt.compare(data.password, user.password_hash);
    if (!valid) throw new ApiError(401, "Invalid email or password");

    const token = signToken({ userId: user.id, role: user.role });
    delete user.password_hash;
    res.json({ token, user });
  } catch (err) {
    next(err);
  }
}

export async function me(req: AuthedRequest, res: Response, next: NextFunction) {
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
