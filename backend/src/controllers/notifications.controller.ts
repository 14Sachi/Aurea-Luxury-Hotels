import { Response, NextFunction } from "express";
import { pool } from "../db/pool";
import { AuthedRequest } from "../middleware/auth";

export async function listNotifications(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const result = await pool.query(
      "SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC",
      [req.user!.userId]
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
}

export async function markRead(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await pool.query("UPDATE notifications SET read = true WHERE id = $1 AND user_id = $2", [id, req.user!.userId]);
    res.json({ read: true });
  } catch (err) {
    next(err);
  }
}

export async function markAllRead(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    await pool.query("UPDATE notifications SET read = true WHERE user_id = $1", [req.user!.userId]);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

export async function deleteNotification(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM notifications WHERE id = $1 AND user_id = $2", [id, req.user!.userId]);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
