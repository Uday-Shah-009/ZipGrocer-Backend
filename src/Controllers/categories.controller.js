import {
  addCategory,
  DeleteCategoryService,
  getAllCategories,
  UpdateCategoryService,
} from "../services/categories.service.js";
import { tryCatchWrapper } from "../utils/tryCatchWrapper.js";

//add new category
export const AddToCategory = tryCatchWrapper(async (req, res) => {
  const category = req.body;
  if (req.file && req.file.path) {
    category.image = req.file.path;
  }
  const addedCategory = await addCategory(category);
  res
    .status(201)
    .json({ category: addedCategory, message: "added category!😎" });
});

//update category data
export const UpdateCategory = tryCatchWrapper(async (req, res) => {
  const { id } = req.params;// get id from parameter in api
  const updateData = req.body;
  console.log("updateData", updateData);
  const updatedCategory = await UpdateCategoryService(id, updateData);
  if (!updatedCategory) {
    return res.status(401).json({ message: "category not updated ❌" });
  }
  res.status(201).json({ message: "categroy updated 🔼" });
});

//delete category
export const DeleteCategory = tryCatchWrapper(async (req, res) => {
  const { id } = req.params;
  const updateDelete = req.body; // get id from parameter in api
  const deleted = await DeleteCategoryService(id,updateDelete);
  if (!deleted) {
    return res.status(400).json({ message: "category not available ❌" });
  }
  res.status(201).json({ message: "Category Deleted 🗑️" });
});

// get All the categories available
export const getCategories = tryCatchWrapper(async (req, res) => {
  const categories = await getAllCategories();
  res
    .status(201)
    .json({ categories: categories, message: "categories Available" });
});
