import { userModel } from "../Models/user.model.js";

export const addUser = async (user) => {
  const newUser = await userModel.create({
    name: user.name,
    email: user.email,
    password: user.password,
    role: user.role,
  });
  return newUser;
};

export const findUserByEmail = async (email) => {
  const user = await userModel.findOne({ email });
  return user;
};

export const findByID = async (id) => {
  const user = await userModel.findById(id);
  return user;
};

export const findByRole = async () => {
  return await userModel.find({ role: "delivery" });
};

export const getAllUsers = async () => {
  const users = await userModel.find({ role: "user" });
  return users;
};
