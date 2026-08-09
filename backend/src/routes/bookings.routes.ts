import { Router } from "express";
import {
  createBooking,
  listMyBookings,
  getBooking,
  cancelBooking,
  validatePromo,
} from "../controllers/bookings.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.use(requireAuth);

router.post("/", createBooking);
router.get("/mine", listMyBookings);
router.get("/:id", getBooking);
router.post("/:id/cancel", cancelBooking);
router.post("/promo/validate", validatePromo);

export default router;
