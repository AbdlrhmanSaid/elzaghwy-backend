import express from "express";
import {
  createOrder,
  trackOrder,
  updateOrderStatus,
  getAllOrders,
  deleteOrder,
  deleteAllOrders,
} from "../controllers/orderController.js";
import verifyToken from "../middleware/auth.js";
import { orderLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/", orderLimiter, createOrder);
router.get("/track/:orderNumber", trackOrder);

router.get("/", verifyToken, getAllOrders);
router.put("/:orderNumber", verifyToken, updateOrderStatus);
router.delete("/delete-all", verifyToken, deleteAllOrders);
router.delete("/:orderNumber", verifyToken, deleteOrder);

export default router;
