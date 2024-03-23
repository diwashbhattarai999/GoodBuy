"use server";

import * as z from "zod";
import slugify from "slugify";

import { CategorySchema } from "@/schemas";
import { getCategoryById } from "@/data/vendor/category";
import { db } from "@/lib/db";

export const addCategory = async (values: z.infer<typeof CategorySchema>) => {
  const validatedFields = CategorySchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name } = validatedFields.data;

  await db.category.create({
    data: {
      name: name,
      slug: slugify(name),
    },
  });

  return { success: "New Category Created!" };
};

export const editCategory = async (
  id: string,
  values: z.infer<typeof CategorySchema>
) => {
  const validatedFields = CategorySchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name } = validatedFields.data;

  await db.category.update({
    where: { id },
    data: {
      name,
      slug: slugify(name),
    },
  });

  return { success: "Category Edited!" };
};

export const deleteCategory = async (id: string) => {
  const existingCategory = await getCategoryById(id);

  if (!existingCategory) {
    return { error: "Category does not exist" };
  } else {
    await db.category.delete({
      where: { id },
    });

    return { success: "Category Deleted!" };
  }
};
