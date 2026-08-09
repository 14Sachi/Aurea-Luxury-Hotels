import { Request, Response, NextFunction } from "express";
import { pool } from "../db/pool";

// GET /api/admin/stats?period=30d
export async function getStats(req: Request, res: Response, next: NextFunction) {
  try {
    const periodDays = { "7d": 7, "30d": 30, "90d": 90 }[String(req.query.period)] ?? 30;

    const [revenue, bookingsCount, guestsCount, avgRating, occupancy] = await Promise.all([
      pool.query(
        `SELECT COALESCE(SUM(total),0) AS total FROM bookings
         WHERE status IN ('confirmed','completed') AND created_at >= now() - ($1 || ' days')::interval`,
        [periodDays]
      ),
      pool.query(
        `SELECT COUNT(*) AS count FROM bookings WHERE created_at >= now() - ($1 || ' days')::interval`,
        [periodDays]
      ),
      pool.query(`SELECT COUNT(DISTINCT id) AS count FROM users WHERE role = 'guest'`),
      pool.query(`SELECT ROUND(AVG(rating)::numeric, 2) AS avg FROM hotels`),
      pool.query(
        `SELECT ROUND(100.0 * COUNT(*) FILTER (WHERE status IN ('confirmed','completed')) / GREATEST(COUNT(*),1), 1) AS pct
         FROM bookings WHERE created_at >= now() - ($1 || ' days')::interval`,
        [periodDays]
      ),
    ]);

    res.json({
      periodDays,
      revenue: Number(revenue.rows[0].total),
      bookings: Number(bookingsCount.rows[0].count),
      guests: Number(guestsCount.rows[0].count),
      avgRating: Number(avgRating.rows[0].avg ?? 0),
      confirmationRate: Number(occupancy.rows[0].pct ?? 0),
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/admin/bookings
export async function listAllBookings(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await pool.query(
      `SELECT b.*, h.name AS hotel_name, u.first_name, u.last_name, u.email
       FROM bookings b
       JOIN hotels h ON h.id = b.hotel_id
       JOIN users u ON u.id = b.user_id
       ORDER BY b.created_at DESC LIMIT 200`
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
}

// GET /api/admin/revenue-by-hotel
export async function revenueByHotel(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await pool.query(
      `SELECT h.id, h.name, COALESCE(SUM(b.total),0) AS revenue, COUNT(b.id) AS bookings
       FROM hotels h
       LEFT JOIN bookings b ON b.hotel_id = h.id AND b.status IN ('confirmed','completed')
       GROUP BY h.id, h.name
       ORDER BY revenue DESC`
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
}
