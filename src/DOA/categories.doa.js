import { Category } from "../Models/categories.model.js";

export const createCategory = async (category) => {
  const createdCategory = await Category.create(category);
  return createdCategory;
};

export const findByName = async (name) => {
  const category = await Category.findOne({ name });
  return category;
};

export const findByid = async (id) => {
  const category = await Category.findOne({ id });
  return category;
};

export const DeleteByID = async (id, isDeleted) => {
  const deleted = await Category.findByIdAndUpdate(id, isDeleted);
  return deleted;
};

export const updateById = async (id, updateData) => {
  return await Category.findByIdAndUpdate(id, updateData);
};


export const getCategories = async () => {
  const categories = await Category.find({ isDeleted: false });
  return { categories };
};
