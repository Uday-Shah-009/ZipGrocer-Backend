import { Product } from "../Models/product.model.js";

export const createProduct = async (product) => {
  const newProduct = await Product.create({
    image: product.image,
    name: product.name,
    description: product.desc,
    brand: product.brand,
    quantity: product.quantity,
    price: product.price,
    category: product.category,
    subcategory: product.subcategory,
  });
  return newProduct;
};

export const findProductByName = async(name) => {
    const product = Product.findOne({name})
    return product;
}

export const findProductById = async(id) => {
  const product = await Product.find(id).select("name price category description image");
  return product;
}

export const DeleteByID = async(id) => {
   const deleted = await Product.findByIdAndDelete(id);
   return deleted
}

export const updateById = async(id,updateData) => {
  return await Product.findByIdAndUpdate(id,updateData);
}

export const allProducts = async() => {
  const products = await Product.find().select("name price category description");
  return products
}