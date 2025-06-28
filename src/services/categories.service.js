import {
  createCategory,
  getCategories,
  findByName,
  DeleteByID,
  updateById,
} from "../DOA/categories.doa.js";

export const addCategory = async (category) => {
  const exists = await findByName(category.name);
  if (exists) {
    throw new Error("category already exists");
  }
  const createdCategory = await createCategory(category);
  return createdCategory;
};

export const getAllCategories = async () => {
  const categories = await getCategories();
  
  return categories;
};

export const DeleteCategoryService = async(id,updated) => {
    const deletedCategory = await DeleteByID(id,updated);
    return deletedCategory
}
export const UpdateCategoryService = async(id,updateData) => {
    const updated = await updateById(id,updateData);
    return updated;
}
