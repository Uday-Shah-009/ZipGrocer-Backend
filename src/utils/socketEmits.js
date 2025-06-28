import { io } from "../../Server.js";

export const emitUpdate = ({ userId, deliveryId, id, status }) => {
  const payload = { userId, deliveryId, id, status };

  io.to(`user:${userId}`).emit("statusUpdate", payload);
  if (deliveryId) io.to(`delivery:${deliveryId}`).emit("statusUpdate",payload);
  io.to(`admin`).emit("statusUpdate",payload)
};
