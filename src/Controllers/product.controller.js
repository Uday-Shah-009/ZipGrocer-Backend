import { findByName } from "../DOA/categories.doa.js";
import { allProducts } from "../DOA/product.doa.js";
import {
  addProductService,
  DeleteProductService,
  UpdateProductService,
} from "../services/Product.service.js";
import { tryCatchWrapper } from "../utils/tryCatchWrapper.js";

export const addProduct = tryCatchWrapper(async (req, res) => {
  const product = req.body;
  const findCategory = await findByName(product.category);

  // Check if the category exists and if the subcategory is valid
  if (!findCategory) {
    return res
      .status(400)
      .json({ message: `${product.category} category does not exists 😒 ` });
  }
  if (!findCategory.subcategory.includes(product.subcategory)) {
    return res.status(400).json({
      message: `${product.subcategory} subCategory does not exists 😒 `,
    });
  }

  // Check if the product image is provided
  if (req.file && req.file.path) {
    product.image = req.file.path;
  }

  product.price = Number(product.price);
  product.quantity = Number(product.quantity);
  const addedProduct = await addProductService(product);
  res.status(201).json({ product: addedProduct, message: "product added 😎" });
});

export const getAllproducts = tryCatchWrapper(async (req, res) => {
  const products = await allProducts();
  res.status(201).json({ products, message: "product available" });
});

export const deleteProduct = tryCatchWrapper(async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await DeleteProductService(id);
  if (!deletedProduct) {
    return res.status(404).json({ message: "Product not found 😢" });
  }
  res.status(200).json({ message: "Product deleted successfully 😎" });
});

export const updateProduct = tryCatchWrapper(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  // Check if the product image is provided
  if (req.file && req.file.path) {
    updateData.image = req.file.path;
  }

  // Ensure price and quantity are numbers
  if (updateData.price) {
    updateData.price = Number(updateData.price);
  }
  if (updateData.quantity) {
    updateData.quantity = Number(updateData.quantity);
  }

  const updatedProduct = await UpdateProductService(id, updateData);

  if (!updatedProduct) {
    return res.status(404).json({ message: "Product not found 😢" });
  }

  res
    .status(200)
    .json({
      message: "Product updated successfully 😎",
    });
});
