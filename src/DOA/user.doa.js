import { userModel } from "../Models/user.model.js";

export const getUserAndCart = async (Id) => {
  const user = await userModel.findById(Id);
  const cart = user.cartData;
  return { user, cart };
};

export const clearCart = async (Id) => {
  const clear = await userModel.findByIdAndUpdate(Id, { cartData: {} });
  return { clear };
};

export const updateCart = async (Id, newCart) => {
  const updatedCart = await userModel.findByIdAndUpdate(
    Id,
    {
      cartData: newCart,
    },
    { new: true }
  );
  return { updatedCart };
};
