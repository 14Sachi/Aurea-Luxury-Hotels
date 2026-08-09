import { Response, NextFunction } from "express";
import { pool } from "../db/pool";
import { AuthedRequest } from "../middleware/auth";

export async function listWishlist(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const result = await pool.query(
      `SELECT h.* FROM wishlists w JOIN hotels h ON h.id = w.hotel_id
       WHERE w.user_id = $1 ORDER BY w.created_at DESC`,
      [req.user!.userId]
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
}

export async function addToWishlist(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const { hotelId } = req.body;
    await pool.query(
      `INSERT INTO wishlists (user_id, hotel_id) VALUES ($1,$2)
       ON CONFLICT (user_id, hotel_id) DO NOTHING`,
      [req.user!.userId, hotelId]
    );
    res.status(201).json({ liked: true });
  } catch (err) {
    next(err);
  }
}

export async function removeFromWishlist(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const { hotelId } = req.params;
    await pool.query("DELETE FROM wishlists WHERE user_id = $1 AND hotel_id = $2", [req.user!.userId, hotelId]);
    res.json({ liked: false });
  } catch (err) {
    next(err);
  }
}
