import { db } from "@/lib/db";

export const getSubcategoryByName = async (name: string) => {
  try {
    const subcategory = await db.subCategory.findFirst({ where: { name } });

    return subcategory;
  } catch (error) {
    return null;
  }
};

export const getSubcategoryById = async (id: string) => {
  try {
    const subcategory = await db.subCategory.findUnique({ where: { id } });

    return subcategory;
  } catch (error) {
    return null;
  }
};

export const getSubcategories = async () => {
  try {
    const subcategories = await db.subCategory.findMany();

    return subcategories;
  } catch (error) {
    return null;
  }
};

export const getSubCategoriesByCategoryId = async (categoryId: string) => {
  try {
    const subcategories = await db.subCategory.findMany({
      where: {
        categoryId,
      },
    });

    return subcategories;
  } catch (error) {
    return null;
  }
};
