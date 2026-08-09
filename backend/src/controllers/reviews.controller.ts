import { Response, NextFunction } from "express";
import { z } from "zod";
import { pool } from "../db/pool";
import { ApiError } from "../middleware/errorHandler";
import { AuthedRequest } from "../middleware/auth";

const createReviewSchema = z.object({
  hotelId: z.number(),
  bookingId: z.string().uuid().optional(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});

export async function createReview(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const data = createReviewSchema.parse(req.body);

    if (data.bookingId) {
      const booking = await pool.query(
        "SELECT id FROM bookings WHERE id = $1 AND user_id = $2 AND status = 'completed'",
        [data.bookingId, req.user!.userId]
      );
      if (!booking.rowCount) throw new ApiError(403, "You can only review completed stays");
    }

    const result = await pool.query(
      `INSERT INTO reviews (hotel_id, user_id, booking_id, rating, comment)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [data.hotelId, req.user!.userId, data.bookingId ?? null, data.rating, data.comment ?? null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function listHotelReviews(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const { hotelId } = req.params;
    const result = await pool.query(
      `SELECT r.*, u.first_name, u.last_name
       FROM reviews r JOIN users u ON u.id = r.user_id
       WHERE r.hotel_id = $1 ORDER BY r.created_at DESC`,
      [hotelId]
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
}
