import express from "express";
const router = express.Router();
// استيراد الدوال بالتحديد
import { login, createFirstAdmin } from "../controllers/authController.js";

router.post("/login", login);

export default router; 
