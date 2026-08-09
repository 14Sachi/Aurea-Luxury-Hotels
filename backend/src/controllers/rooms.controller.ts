import { Request, Response, NextFunction } from "express";
import { pool } from "../db/pool";
import { ApiError } from "../middleware/errorHandler";

// GET /api/hotels/:hotelId/rooms
export async function listRoomsForHotel(req: Request, res: Response, next: NextFunction) {
  try {
    const { hotelId } = req.params;
    const result = await pool.query(
      "SELECT * FROM rooms WHERE hotel_id = $1 ORDER BY price ASC",
      [hotelId]
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
}

// GET /api/rooms/:id/availability?checkIn=&checkOut=
export async function checkAvailability(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { checkIn, checkOut } = req.query;
    if (!checkIn || !checkOut) throw new ApiError(400, "checkIn and checkOut are required");

    const room = await pool.query("SELECT * FROM rooms WHERE id = $1", [id]);
    if (!room.rowCount) throw new ApiError(404, "Room not found");
    if (!room.rows[0].is_available) return res.json({ available: false });

    const overlap = await pool.query(
      `SELECT 1 FROM bookings
       WHERE room_id = $1 AND status IN ('pending','confirmed')
         AND daterange(check_in, check_out) && daterange($2::date, $3::date)
       LIMIT 1`,
      [id, checkIn, checkOut]
    );
    res.json({ available: overlap.rowCount === 0 });
  } catch (err) {
    next(err);
  }
}
