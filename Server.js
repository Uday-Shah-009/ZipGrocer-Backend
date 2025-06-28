import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import DBconnect from "./src/configs/mongoDB.js";
import AuthRouter from "./src/routes/auth.route.js";
import productRouter from "./src/routes/product.route.js";
import categoryRouter from "./src/routes/category.route.js";
import cartRouter from "./src/routes/cart.route.js";
import orderRouter from "./src/routes/order.route.js";
import deliveryRouter from "./src/routes/Delivery.route.js";
import { Server } from "socket.io";
import http from "http";
import socketHandler from "./src/utils/socketHandler.js";

//server setup
const app = express();
const port = 3000;

//server configs
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Socket Setup
const server = http.createServer(app);

//attach socket to the server
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["POST", "GET", "PATCH"],
  },
});

//use sockethandler to socket events
socketHandler(io);

//export io object
export { io };

//db connection
DBconnect();

//auth api
app.use("/api/auth", AuthRouter);
//product api
app.use("/api/product", productRouter);
//categroy api
app.use("/api/category", categoryRouter);
//cart api
app.use("/api/cart", cartRouter);
//order api
app.use("/api/order", orderRouter);
//deliveryPartner
app.use("/api/delivery", deliveryRouter);

server.listen(port, () => {
  console.log("http://localhost:3000");
});
