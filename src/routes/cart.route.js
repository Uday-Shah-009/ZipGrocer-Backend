import {
  addToCartController,
  getCartController,
  removeFromCartController,
} from "../Controllers/cart.controller.js";
import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { userRoleAuth } from "../middlewares/roleAuth.middleware.js";

const cartRouter = express.Router();

cartRouter.post(
  "/add",
  authMiddleware,
  userRoleAuth("user"),
  addToCartController
);

cartRouter.delete(
  "/remove/:productId",
  authMiddleware,
  userRoleAuth("user"),
  removeFromCartController
);

cartRouter.get("/get", authMiddleware, userRoleAuth("user"), getCartController);

export default cartRouter;
