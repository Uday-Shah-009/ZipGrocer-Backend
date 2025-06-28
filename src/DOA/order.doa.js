import { Order } from "../Models/order.model.js";

export const createOrderDoa = async (orderData) => {
  const order = await Order.create(orderData);
  return order;
};

export const GetAllOrdersDoa = async () => {
  const orders = await Order.find()
    .populate("userId", "name email")
    .populate("products.productId", "name price")
    .sort({ createdAt: -1 });
  return orders;
};

export const orderStatus = async (id, status) => {
  return await Order.findByIdAndUpdate(
    id,
    { status },
    {
      new: true,
      runValidators: true,
    }
  );
};

export const getOrderByuser = async (userId) => {
  const userOrders = await Order.find({ userId: userId });
  return userOrders;
};

export const AvailableOrders = async () => {
  const Available = await Order.find({ status: "assigning partner" });
  return Available;
};

export const getOrderById = async(id) => {
  return await Order.findOne({_id: id}).populate("userId")
}

export const GetProductsDetailsDao = async(id) => {
  return await Order.findOne({_id: id}).populate("products.productId", "name")
}

export const acceptedOrder = async (id, partnerId, status) => {
  return await Order.findByIdAndUpdate(
    id,
    { status: status, deliveryPartnerId: partnerId },
    { new: true, runValidators: true }
  );
};
