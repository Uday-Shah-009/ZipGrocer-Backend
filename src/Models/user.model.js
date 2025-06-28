import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    addresses: [{ type: String }],
    role: { type: String, enum: ["user", "admin", "delivery"], default: "user" },
    cartData:{type: Object, default: {}},
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

export const userModel = mongoose.model("user", userSchema);
