import { Response, NextFunction } from "express";
import { z } from "zod";
import { pool } from "../db/pool";
import { ApiError } from "../middleware/errorHandler";
import { AuthedRequest } from "../middleware/auth";
import { generateBookingReference } from "../utils/reference";

const TAX_RATE = 0.12;
const SERVICE_FEE = 180;

const createBookingSchema = z.object({
  hotelId: z.number(),
  roomId: z.number(),
  checkIn: z.string(), // ISO date
  checkOut: z.string(),
  guests: z.number().min(1).max(8),
  specialRequests: z.string().optional(),
  promoCode: z.string().optional(),
});

export async function createBooking(req: AuthedRequest, res: Response, next: NextFunction) {
  const client = await pool.connect();
  try {
    const data = createBookingSchema.parse(req.body);
    const checkIn = new Date(data.checkIn);
    const checkOut = new Date(data.checkOut);
    const nights = Math.max(1, Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)));
    if (nights < 1) throw new ApiError(400, "checkOut must be after checkIn");

    await client.query("BEGIN");

    const roomResult = await client.query(
      "SELECT * FROM rooms WHERE id = $1 AND hotel_id = $2 FOR UPDATE",
      [data.roomId, data.hotelId]
    );
    if (!roomResult.rowCount) throw new ApiError(404, "Room not found for this hotel");
    const room = roomResult.rows[0];
    if (!room.is_available) throw new ApiError(409, "This room is not available");

    const overlap = await client.query(
      `SELECT 1 FROM bookings
       WHERE room_id = $1 AND status IN ('pending','confirmed')
         AND daterange(check_in, check_out) && daterange($2::date, $3::date)
       LIMIT 1`,
      [data.roomId, data.checkIn, data.checkOut]
    );
    if (overlap.rowCount) throw new ApiError(409, "Room is already booked for those dates");

    const subtotal = Number(room.price) * nights;
    let discount = 0;
    if (data.promoCode) {
      const promo = await client.query(
        "SELECT * FROM promo_codes WHERE code = $1 AND active = true AND (expires_at IS NULL OR expires_at > now())",
        [data.promoCode.toUpperCase()]
      );
      if (!promo.rowCount) throw new ApiError(400, "Invalid or expired promo code");
      discount = Math.round(subtotal * (Number(promo.rows[0].discount_percent) / 100));
    }
    const taxes = Math.round((subtotal - discount) * TAX_RATE);
    const total = subtotal - discount + taxes + SERVICE_FEE;
    const reference = generateBookingReference();

    const bookingResult = await client.query(
      `INSERT INTO bookings
        (reference, user_id, hotel_id, room_id, check_in, check_out, guests, nights,
         special_requests, promo_code, subtotal, discount, taxes, service_fee, total, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,'pending')
       RETURNING *`,
      [reference, req.user!.userId, data.hotelId, data.roomId, data.checkIn, data.checkOut,
       data.guests, nights, data.specialRequests ?? null, data.promoCode?.toUpperCase() ?? null,
       subtotal, discount, taxes, SERVICE_FEE, total]
    );

    await client.query("COMMIT");
    res.status(201).json(bookingResult.rows[0]);
  } catch (err) {
    await client.query("ROLLBACK");
    next(err);
  } finally {
    client.release();
  }
}

// GET /api/bookings/mine  (a.k.a. "My Trips")
export async function listMyBookings(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const result = await pool.query(
      `SELECT b.*, h.name AS hotel_name, h.location, h.image_url, r.name AS room_name
       FROM bookings b
       JOIN hotels h ON h.id = b.hotel_id
       JOIN rooms r ON r.id = b.room_id
       WHERE b.user_id = $1
       ORDER BY b.check_in DESC`,
      [req.user!.userId]
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
}

export async function getBooking(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT b.*, h.name AS hotel_name, h.location, h.image_url, r.name AS room_name
       FROM bookings b
       JOIN hotels h ON h.id = b.hotel_id
       JOIN rooms r ON r.id = b.room_id
       WHERE b.id = $1 AND (b.user_id = $2 OR $3 = 'admin')`,
      [id, req.user!.userId, req.user!.role]
    );
    if (!result.rowCount) throw new ApiError(404, "Booking not found");
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function cancelBooking(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `UPDATE bookings SET status = 'cancelled'
       WHERE id = $1 AND user_id = $2 AND status IN ('pending','confirmed')
       RETURNING *`,
      [id, req.user!.userId]
    );
    if (!result.rowCount) throw new ApiError(404, "Booking not found or cannot be cancelled");
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}

// POST /api/bookings/promo/validate  { code, subtotal }
export async function validatePromo(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const { code, subtotal } = req.body;
    if (!code || typeof subtotal !== "number") throw new ApiError(400, "code and subtotal are required");
    const promo = await pool.query(
      "SELECT * FROM promo_codes WHERE code = $1 AND active = true AND (expires_at IS NULL OR expires_at > now())",
      [String(code).toUpperCase()]
    );
    if (!promo.rowCount) throw new ApiError(404, "Invalid or expired promo code");
    const discount = Math.round(subtotal * (Number(promo.rows[0].discount_percent) / 100));
    res.json({ valid: true, discountPercent: promo.rows[0].discount_percent, discount });
  } catch (err) {
    next(err);
  }
}
