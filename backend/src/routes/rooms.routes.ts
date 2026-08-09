import { Router } from "express";
import { checkAvailability } from "../controllers/rooms.controller";

const router = Router();

router.get("/:id/availability", checkAvailability);

export default router;
