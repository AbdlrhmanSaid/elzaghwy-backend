import express from "express";
import {
  createOrder,
  trackOrder,
  updateOrderStatus,
  getAllOrders,
} from "../controllers/orderController.js";
import verifyToken from "../middleware/auth.js";
import { orderLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/", orderLimiter, createOrder);
router.get("/track/:orderNumber", trackOrder);

router.get("/", verifyToken, getAllOrders);
router.put("/:orderNumber", verifyToken, updateOrderStatus);

export default router;
