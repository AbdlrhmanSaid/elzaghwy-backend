import mongoose from "mongoose";

const areaSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  deliveryPrice: { type: Number, required: true },
});

export default mongoose.model("Area", areaSchema);
