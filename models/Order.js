import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, unique: true, required: true },
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    area: { type: String, required: true },
    address: { type: String, required: true },
    deliveryPrice: { type: Number, required: true },

    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        quantity: Number,
        unit: String,
      },
    ],
    subTotal: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["معلق", "يتم التحضير", "خرج للتوصيل", "وصل"],
      default: "معلق",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Order", orderSchema);
