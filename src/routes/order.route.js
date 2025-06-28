import {
  AcceptOrder,
  allOrders,
  createOrder,
  OrdersByUser,
  updateStatus,
} from "../Controllers/order.controller.js";
import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { userRoleAuth } from "../middlewares/roleAuth.middleware.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, userRoleAuth("user"), createOrder);

orderRouter.get("/all", authMiddleware, userRoleAuth("admin"), allOrders);

orderRouter.get(
  "/my-orders",
  authMiddleware,
  userRoleAuth("user"),
  OrdersByUser
);

orderRouter.patch(
  "/update/:id/status",
  authMiddleware,
  userRoleAuth(["admin","delivery"]),
  updateStatus
);

orderRouter.patch(
  "/:orderId/accept",
  authMiddleware,
  userRoleAuth("delivery"),
  AcceptOrder
);

export default orderRouter;
