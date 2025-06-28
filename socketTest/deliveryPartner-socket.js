import { io } from "socket.io-client";

console.log("running test script");

const socket = io("http://127.0.0.1:3000");


socket.on("connect", () => {
  console.log("connected to backend with" + socket.id);

  const role = "delivery";
  const testUserId = "685cffdf4cdfa8b7c71177f1";
  socket.emit("joinRoom", { role: role, id: testUserId });
  console.log("joined Room for", testUserId);
});

socket.on("statusUpdate", (data) => {
  console.log("entered")
  console.log("updated status", data);
});
