import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import areaRoutes from "./routes/areaRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import offerRoutes from "./routes/offerRoutes.js";

dotenv.config();

connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

//(Routes)
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/areas", areaRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/offers", offerRoutes);

app.get("/", (req, res) => {
  res.send("Poultry Shop API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
