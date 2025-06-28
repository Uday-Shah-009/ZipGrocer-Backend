import { findByID, findByRole } from "../DOA/auth.doa.js";
import { getOrderById } from "../DOA/order.doa.js";
import {
  acceptOrderService,
  createOrderService,
  getAllOrders,
  updateOrderStatus,
  userOrders,
  GetProductDetails
} from "../services/order.service.js";
import { sendMail } from "../utils/nodeMailer.js";
import { emitUpdate } from "../utils/socketEmits.js";
import { tryCatchWrapper } from "../utils/tryCatchWrapper.js";
import dotenv from "dotenv"

dotenv.config({path: './.env'})

export const createOrder = tryCatchWrapper(async (req, res) => {
  const { id } = req.user;
  const placeOrder = await createOrderService(id);
  const user = await findByID(id);
  const product = await GetProductDetails(placeOrder._id)

  if (!placeOrder) {
    return res
      .status(400)
      .json({ message: "something Went Wrong while placing order" });
  }

  await sendMail({
    to: user.email,
    subject: "🛒 Your Order Has Been Placed!",
    templateName: "orderPlaced",
    data: {
      name: user.name,
      orderId: placeOrder._id.toString(),
      items:product
    },
  });


  await sendMail({
    to: process.env.ADMIN_MAIL,
    subject: "🚨 New Order Placed",
    templateName: "newOrderAlert",
    data: {
      user: user.name,
      userEmail: user.email,
      orderId: placeOrder._id.toString(),
      items:product
    },
  });

  res
    .status(201)
    .json({ message: "order Placed Successfully", orderId: placeOrder._id });
});

export const allOrders = tryCatchWrapper(async (req, res) => {
  const result = await getAllOrders();
  res.status(200).json({ message: "Orders: ", orders: result });
});

export const OrdersByUser = tryCatchWrapper(async (req, res) => {
  const { id } = req.user;
  const orders = await userOrders(id);
  if (!orders || orders.length === 0) {
    return res
      .status(200)
      .json({ message: "No orders Placed Start Shopping!!" });
  }
  return res.status(200).json({ orders });
});

export const updateStatus = tryCatchWrapper(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = await getOrderById(id);

  if (!order) {
    return res.status(400).json({ message: "order not found" });
  }

  if (order.status === status) {
    return res.status(200).json({ message: "Status already updated" });
  }

  if (req.user.role === "delivery" && status !== "delivered") {
    return res.status(403).json({
      message:
        "Delivery partners can only mark as delivered or picked for delivery",
    });
  }

  const updated = await updateOrderStatus(id, status);

  const userId = order.userId._id.toString();
  const deliveryId = order.deliveryPartnerId?._id?.toString();

  emitUpdate({ userId, deliveryId, id, status });

  if (updated.status === "delivered") {
    await sendMail({
      to: order.userId.email,
      subject: "🛒 Your Order Has Been Delivered",
      templateName: "Delivered",
      data: {
        name: order.userId.name,
        orderId: order._id.toString(),
      },
    });
  }

  if (updated.status === "assigning partner") {
    const deliveryPartners = await findByRole();
    await Promise.all(
      deliveryPartners.map((partner) =>
        sendMail({
          to: partner.email,
          subject: "🚚 New Order Available for Delivery",
          templateName: "newDelivery",
          data: {
            name: partner.name,
            orderId: order._id.toString(),
          },
        })
      )
    );
  }

  if (!updated) {
    return res.status(400).json({ message: "updating status failed" });
  }
  return res
    .status(200)
    .json({ message: `status updated to ${updated.status}` });
});

export const AcceptOrder = async (req, res) => {
  const { orderId } = req.params;
  const { id } = req.user;
  const status = "picked for delivery";
  const accepted = await acceptOrderService(orderId, id, status);
  if (!accepted.accepted) {
    return res.status(400).json({ message: "something went wrong " });
  }
  return res.status(200).json({ accepted });
};
