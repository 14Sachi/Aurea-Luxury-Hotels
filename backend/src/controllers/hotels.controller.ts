import { Request, Response, NextFunction } from "express";
import { pool } from "../db/pool";
import { ApiError } from "../middleware/errorHandler";

// GET /api/hotels?country=&category=&minPrice=&maxPrice=&search=
export async function listHotels(req: Request, res: Response, next: NextFunction) {
  try {
    const { country, city, category, minPrice, maxPrice, search } = req.query;
    const clauses: string[] = [];
    const values: any[] = [];

    if (country) { values.push(country); clauses.push(`country = $${values.length}`); }
    if (city) { values.push(city); clauses.push(`city = $${values.length}`); }
    if (category) { values.push(category); clauses.push(`category = $${values.length}`); }
    if (minPrice) { values.push(Number(minPrice)); clauses.push(`base_price >= $${values.length}`); }
    if (maxPrice) { values.push(Number(maxPrice)); clauses.push(`base_price <= $${values.length}`); }
    if (search) { values.push(`%${search}%`); clauses.push(`(name ILIKE $${values.length} OR location ILIKE $${values.length})`); }

    const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
    const result = await pool.query(
      `SELECT * FROM hotels ${where} ORDER BY rating DESC, id ASC`,
      values
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
}

// GET /api/hotels/:id
export async function getHotel(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const hotelResult = await pool.query("SELECT * FROM hotels WHERE id = $1", [id]);
    if (!hotelResult.rowCount) throw new ApiError(404, "Hotel not found");

    const [roomsResult, imagesResult, reviewsResult] = await Promise.all([
      pool.query("SELECT * FROM rooms WHERE hotel_id = $1 ORDER BY price ASC", [id]),
      pool.query("SELECT * FROM hotel_images WHERE hotel_id = $1 ORDER BY sort_order ASC", [id]),
      pool.query(
        `SELECT r.id, r.rating, r.comment, r.admin_reply, r.created_at,
                u.first_name, u.last_name
         FROM reviews r JOIN users u ON u.id = r.user_id
         WHERE r.hotel_id = $1 ORDER BY r.created_at DESC LIMIT 20`,
        [id]
      ),
    ]);

    res.json({
      ...hotelResult.rows[0],
      images: imagesResult.rows,
      rooms: roomsResult.rows,
      reviews: reviewsResult.rows,
    });
  } catch (err) {
    next(err);
  }
}

// Admin only
export async function createHotel(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, location, city, state, country, category, description, basePrice, imageUrl, badge, tags, amenities } = req.body;
    const result = await pool.query(
      `INSERT INTO hotels (name, location, city, state, country, category, description, base_price, image_url, badge, tags, amenities)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
      [name, location, city ?? null, state ?? null, country, category, description ?? null, basePrice, imageUrl ?? null, badge ?? null, tags ?? [], amenities ?? []]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function updateHotel(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const fields = ["name","location","city","state","country","category","description","base_price","image_url","badge","tags","amenities"];
    const body = req.body;
    const sets: string[] = [];
    const values: any[] = [];
    for (const f of fields) {
      const key = f.replace(/_([a-z])/g, (_, c) => c.toUpperCase()); // camelCase lookup
      if (body[key] !== undefined) {
        values.push(body[key]);
        sets.push(`${f} = $${values.length}`);
      }
    }
    if (!sets.length) throw new ApiError(400, "No fields to update");
    values.push(id);
    const result = await pool.query(
      `UPDATE hotels SET ${sets.join(", ")} WHERE id = $${values.length} RETURNING *`,
      values
    );
    if (!result.rowCount) throw new ApiError(404, "Hotel not found");
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function deleteHotel(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM hotels WHERE id = $1", [id]);
    if (!result.rowCount) throw new ApiError(404, "Hotel not found");
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
