import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllproducts,
  updateProduct,
} from "../Controllers/product.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { userRoleAuth } from "../middlewares/roleAuth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  authMiddleware,
  userRoleAuth(["admin"]),
  upload,
  addProduct
);

productRouter.delete(
  "/delete/:id",
  authMiddleware,
  userRoleAuth(["admin"]),
  deleteProduct
);

productRouter.put(
  "/update/:id",
  authMiddleware,
  userRoleAuth(["admin"]),
  upload,
  updateProduct
);

productRouter.get(
  "/all",
  authMiddleware,
  userRoleAuth(["admin", "user"]),
  getAllproducts
);

export default productRouter