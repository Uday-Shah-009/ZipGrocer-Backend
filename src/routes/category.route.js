import express from "express";
import {
  AddToCategory,
  DeleteCategory,
  getCategories,
  UpdateCategory,
} from "../Controllers/categories.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { userRoleAuth } from "../middlewares/roleAuth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const categoryRouter = express.Router(); //router setup

//add new category endpoint
categoryRouter.post(
  "/add",
  authMiddleware,
  upload,
  userRoleAuth(["admin"]),
  AddToCategory
);

//get all categories endpoint
categoryRouter.get(
  "/getAll",
  authMiddleware,
  userRoleAuth(["admin", "user"]),
  getCategories
);

//update by id
categoryRouter.put(
  "/update/:id",
  authMiddleware,
  userRoleAuth(["admin"]),
  UpdateCategory
);

// delete by id
categoryRouter.put(
  "/delete/:id",
  authMiddleware,
  userRoleAuth(["admin"]),
  DeleteCategory
);

export default categoryRouter;
