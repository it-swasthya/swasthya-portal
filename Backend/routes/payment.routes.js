
import express from "express";
const router = express.Router();
import { generateOrder,capturePayment } from "../controllers/payment.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";



router.post("/create-order",authenticate , generateOrder);
router.post("/capture-payment", authenticate , capturePayment);


export default router;
