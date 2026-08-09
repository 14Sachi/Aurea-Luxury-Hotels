import { Response, NextFunction } from "express";
import { z } from "zod";
import { pool } from "../db/pool";
import { ApiError } from "../middleware/errorHandler";
import { AuthedRequest } from "../middleware/auth";

const paySchema = z.object({
  bookingId: z.string().uuid(),
  method: z.enum(["card", "paypal", "bank_transfer"]),
  cardLast4: z.string().length(4).optional(),
});

// POST /api/payments
// NOTE: This simulates a payment gateway. Swap the "processing" block for a
// real provider (Stripe, etc.) in production.
export async function processPayment(req: AuthedRequest, res: Response, next: NextFunction) {
  const client = await pool.connect();
  try {
    const data = paySchema.parse(req.body);

    await client.query("BEGIN");
    const bookingResult = await client.query(
      "SELECT * FROM bookings WHERE id = $1 AND user_id = $2 FOR UPDATE",
      [data.bookingId, req.user!.userId]
    );
    if (!bookingResult.rowCount) throw new ApiError(404, "Booking not found");
    const booking = bookingResult.rows[0];
    if (booking.status !== "pending") throw new ApiError(409, "Booking is not awaiting payment");

    // Simulated gateway call — always succeeds here.
    const success = true;
    const transactionRef = `TXN-${Date.now()}`;

    const paymentResult = await client.query(
      `INSERT INTO payments (booking_id, method, amount, status, transaction_ref, card_last4)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [data.bookingId, data.method, booking.total, success ? "succeeded" : "failed", transactionRef, data.cardLast4 ?? null]
    );

    if (success) {
      await client.query("UPDATE bookings SET status = 'confirmed' WHERE id = $1", [data.bookingId]);
      await client.query(
        `INSERT INTO notifications (user_id, title, body, type)
         VALUES ($1, 'Booking Confirmed', $2, 'booking')`,
        [req.user!.userId, `Your reservation ${booking.reference} has been confirmed.`]
      );
    }

    await client.query("COMMIT");
    res.status(success ? 201 : 402).json(paymentResult.rows[0]);
  } catch (err) {
    await client.query("ROLLBACK");
    next(err);
  } finally {
    client.release();
  }
}
