import { Router } from "express";
import { getStats, listAllBookings, revenueByHotel } from "../controllers/admin.controller";
import { requireAuth, requireAdmin } from "../middleware/auth";

const router = Router();

router.use(requireAuth, requireAdmin);

router.get("/stats", getStats);
router.get("/bookings", listAllBookings);
router.get("/revenue-by-hotel", revenueByHotel);

export default router;
