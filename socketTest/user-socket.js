import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

// Use a random or unrelated userId here
const userId = "685c338e0c9112393854ff3a"

socket.on("connect", () => {
  console.log(" user connected:", socket.id);
  socket.emit("joinRoom", { role: "user", id: userId });
});

socket.on("statusUpdate", (data) => {
  console.log("🚨 Received update (should NOT happen):", data);
});
