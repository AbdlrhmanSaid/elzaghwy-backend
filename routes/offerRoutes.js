import express from "express";
import {
  addOffer,
  getOffers,
  deleteOffer,
  updateOffer,
} from "../controllers/offerController.js";
import verifyToken from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getOffers);
router.post("/", verifyToken, upload.single("image"), addOffer);
router.delete("/:id", verifyToken, deleteOffer);
router.put("/:id", verifyToken, upload.single("image"), updateOffer);

export default router;
