import {
  loginUser,
  registerUser,
  userProfile,
} from "../Controllers/auth.controller.js";
import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { userRoleAuth } from "../middlewares/roleAuth.middleware.js";

//router setup
 const AuthRouter = express.Router();

//routes
AuthRouter.post("/register", registerUser);
AuthRouter.post("/login", loginUser);
AuthRouter.get("/user", authMiddleware, userRoleAuth(['user','admin']), userProfile);

export default AuthRouter