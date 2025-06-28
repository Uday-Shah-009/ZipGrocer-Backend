export default function socketHandler(io) {
  io.on("connection", (socket) => {
    console.log("new user connected", socket.id);

    socket.on("joinRoom", ({ role, id }) => {
      if (role === "user") {
        socket.join(`user:${id}`);
        console.log("joined room by user");
      } else if (role === "delivery") {
        socket.join(`delivery:${id}`);
        console.log("joined room by delivery" , id);
      } else if (role === "admin") {
        let room = "admin"
        socket.join(room);
        console.log("joined room by admin");
      }
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
}
