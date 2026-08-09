import { Router } from "express";
import { listWishlist, addToWishlist, removeFromWishlist } from "../controllers/wishlist.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.use(requireAuth);

router.get("/", listWishlist);
router.post("/", addToWishlist);
router.delete("/:hotelId", removeFromWishlist);

export default router;
