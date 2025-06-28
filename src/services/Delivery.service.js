import { findById, RegisterPartner } from "../DOA/Delivery.doa.js";
import { AvailableOrders } from "../DOA/order.doa.js";

export const partnerService = async (partnerData) => {
  const exists = await findById(partnerData.userId);
  if (exists) {
    return { message: "you can create one profile only", data: null };
  }
  const data = await RegisterPartner(partnerData);
  return data;
};

export const partnerProfile = async(id) => {
  const profile = await findById(id);
  return profile;
}

export const AvailableOrderService = async() => {
      const available = await AvailableOrders();
      if(!available || available.length === 0){
        return {message: "No orders Available At this moment"}
      }
      return available;
}