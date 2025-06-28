import {
  createProduct,
  DeleteByID,
  findProductByName,
  updateById,
} from "../DOA/product.doa.js";

export const addProductService = async (product) => {
  const existing = await findProductByName(product.name.trim());
  if (existing) {
    throw new Error("Product Already Exists 😅");
  }
  const newProduct = await createProduct(product);
  return newProduct;
};

export const DeleteProductService = async (id) => {
  const deletedProduct = await DeleteByID(id);
  return deletedProduct;
};

export const UpdateProductService = async (id, updateData) => {
  const updated = await updateById(id, updateData);
  return updated;
};
