import mongoose from "mongoose";
import Product from "./Product.js";

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },

  includedItems: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      quantity: Number,
      unit: String,
    },
  ],
  isActive: { type: Boolean, default: true },
});

export default mongoose.model("Offer", offerSchema);
