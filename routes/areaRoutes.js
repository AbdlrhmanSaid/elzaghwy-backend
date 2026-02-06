import express from "express";
import {
  addArea,
  getAreas,
  deleteArea,
} from "../controllers/areaController.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAreas); // متاح للكل
router.post("/", verifyToken, addArea); // أدمن فقط
router.delete("/:id", verifyToken, deleteArea); // أدمن فقط

export default router;
