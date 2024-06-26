"use server";

import * as z from "zod";
import slugify from "slugify";

import { SubCategorySchema } from "@/schemas";
import { db } from "@/lib/db";
import {
  getSubcategoryById,
  getSubcategoryByName,
} from "@/data/vendor/subCategory";
import { revalidatePath } from "next/cache";

export const subcategories = async (
  id: string,
  values: z.infer<typeof SubCategorySchema>
) => {
  const validatedFields = SubCategorySchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, category } = validatedFields.data;

  const existingSubcategory = await getSubcategoryByName(name);

  if (existingSubcategory) {
    if (!id) {
      return {
        error: "Subcategory already exists! You can edit the subcategory",
      };
    }

    await db.subCategory.update({
      where: { id },
      data: {
        name,
        slug: slugify(name),
        categoryId: category,
      },
    });
    return { success: "Category Edited!" };
  }

  await db.subCategory.create({
    data: {
      name: name,
      slug: slugify(name),
      categoryId: category,
    },
  });

  revalidatePath("/vendor/sub-categories");

  return { success: "New Category Created!" };
};

export const deleteSubCategory = async (id: string) => {
  const existingSubCategory = await getSubcategoryById(id);

  if (!existingSubCategory) {
    return { error: "Category does not exist" };
  } else {
    await db.subCategory.delete({
      where: { id },
    });

    revalidatePath("/vendor/sub-categories");

    return { success: "Category Deleted!" };
  }
};
