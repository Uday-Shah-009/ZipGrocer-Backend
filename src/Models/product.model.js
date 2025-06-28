import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    image: {type: String , required: true , unique: true },
    name: { type: String, required: true, unique: true ,trim: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    quantity: { type: Number, required: true },
    status: {
      type: String,
      enum: ["available", "out of stock"],
      default: "available",
    },
    price: { type: Number, required: true, min: 10 },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model('product', productSchema);
