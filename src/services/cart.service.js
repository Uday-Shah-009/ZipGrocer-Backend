import { updateCart, getUserAndCart } from "../DOA/user.doa.js";
import { findProductById } from "../DOA/product.doa.js";


export const getCartandUser = async (id) => {
  const { user, cart } = await getUserAndCart(id);
  if (!user) {
    throw new Error("User not found");
  }
  return { user, cart };
};

export const getCartDetails = async (userId) => {
  const { cart } = await getCartandUser(userId);
  if (!cart || Object.keys(cart).length === 0) {
    return { message: "Cart is empty" };
  }
  const productIds = Object.keys(cart);

  const products = await findProductById({ _id: { $in: productIds } });
  const cartItems = [];
  let Total = 0;
  for (const product of products) {
    const quantity = cart[product._id];
    const itemTotal = quantity * product.price;
    Total += itemTotal;

    cartItems.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: cart[product._id],
      total: itemTotal,
    });
  }
  return { cartItems, Total };
};

export const addToCart = async (userId, itemId, quantity = 1) => {
  const { user, cart } = await getCartandUser(userId);
  if (!cart[itemId]) {
    cart[itemId] = quantity;
  } else {
    cart[itemId] += quantity;
  }

  const updatedCart = await updateCart(userId, cart);
  return { message: "Item added to cart successfully", cart: updatedCart };
};

export const removeFromCart = async (userId, itemId) => {
  const {  cart } = await getCartandUser(userId);

  if (cart[itemId] > 0) {
    cart[itemId] -= 1;
  }

  if (cart[itemId] <= 0) {
    delete cart[itemId];
  }

  const updatedCart = await updateCart(userId, cart);
  return { message: "Item removed from cart successfully", cart: updatedCart };
};
