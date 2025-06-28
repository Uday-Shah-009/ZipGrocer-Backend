import {
  availableOrders,
  getProfile,
  partnerRegister,
} from "../Controllers/Delivery.controller.js";
import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { userRoleAuth } from "../middlewares/roleAuth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const deliveryRouter = express.Router();

deliveryRouter.post(
  "/create",
  authMiddleware,
  upload,
  userRoleAuth("delivery"),
  partnerRegister
);

deliveryRouter.get(
  "/profile",
  authMiddleware,
  userRoleAuth("delivery"),
  getProfile
);

deliveryRouter.get(
  "/available",
  authMiddleware,
  userRoleAuth("delivery"),
  availableOrders
);

export default deliveryRouter;
