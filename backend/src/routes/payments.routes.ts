import { Router } from "express";
import { processPayment } from "../controllers/payments.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.post("/", requireAuth, processPayment);

export default router;
