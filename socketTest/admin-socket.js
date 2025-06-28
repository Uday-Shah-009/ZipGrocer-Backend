import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("✅ Admin connected:", socket.id);
  socket.emit("joinRoom", { role: "admin", id: "6858f004eaf549f253051a08" });
});

socket.on("statusUpdate", (data) => {
  console.log("📦 Admin RECEIVED status update:", data);
});
