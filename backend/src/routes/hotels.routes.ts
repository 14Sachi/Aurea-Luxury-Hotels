import { Router } from "express";
import { listHotels, getHotel, createHotel, updateHotel, deleteHotel } from "../controllers/hotels.controller";
import { listRoomsForHotel } from "../controllers/rooms.controller";
import { listHotelReviews } from "../controllers/reviews.controller";
import { requireAuth, requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", listHotels);
router.get("/:id", getHotel);
router.get("/:hotelId/rooms", listRoomsForHotel);
router.get("/:hotelId/reviews", listHotelReviews);

router.post("/", requireAuth, requireAdmin, createHotel);
router.patch("/:id", requireAuth, requireAdmin, updateHotel);
router.delete("/:id", requireAuth, requireAdmin, deleteHotel);

export default router;
