import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  image: {type: String},
  name: { type: String, required: true, trim: true, unique: true },
  subcategory: [{ type: String, trim: true }],
  isDeleted: {type: Boolean, default: false}
});

export const Category = mongoose.model("category", categorySchema);
