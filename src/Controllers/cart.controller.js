import {
  addToCart,
  getCartDetails,
  removeFromCart,
} from "../services/cart.service.js";
import { tryCatchWrapper } from "../utils/tryCatchWrapper.js";

export const addToCartController = tryCatchWrapper(async (req, res) => {
  const { userId, productId, quantity } = req.body;
  const result = await addToCart(userId, productId, quantity);
  res.status(200).json({ result });
});

export const removeFromCartController = tryCatchWrapper(async (req, res) => {
  const { productId } = req.params;
  const { id } = req.user;
  const result = await removeFromCart(id, productId);
  res.status(200).json({ result });
});

export const getCartController = tryCatchWrapper(async (req, res) => {
  const { id } = req.user;
  const cart = await getCartDetails(id);
  res.status(200).json({ cart });
});
