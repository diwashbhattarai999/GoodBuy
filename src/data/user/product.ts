import { Prisma } from "@prisma/client";

import { db } from "@/lib/db";

const subProductInclude = Prisma.validator<Prisma.SubProductInclude>()({
  sizes: true,
  images: true,
  color: true,
  description_images: true,
});

const productInclude = Prisma.validator<Prisma.ProductInclude>()({
  category: true,
  subCategories: true,
  reviews: true,
  details: true,
  questions: true,
  subProducts: {
    include: subProductInclude
  },
});



export type TGetProductBySlugSubProduct = Prisma.SubProductGetPayload<{
  include: typeof subProductInclude
}>;

// Type for Get Product By Slug && Get All Products
export type TGetProduct = Prisma.ProductGetPayload<{
  include: typeof productInclude;
}>;

// Type for Get Product By Category Slug
export type TGetProductByCategorySlug = Prisma.CategoryGetPayload<{
  include: {
    Product: {
      include: typeof productInclude;
    };
  };
}>;

// Type for Get Product By SubCategory Slug
export type TGetProductBySubcategorySlug = Prisma.SubCategoryGetPayload<{
  include: {
    Product: {
      include: typeof productInclude;
    };
  };
}>;

// Get Product By Slug
export const getProductBySlug = async (slug: string) => {
  try {
    const product: TGetProduct | null = await db.product.findUnique({
      where: { slug },
      include: productInclude,
    });

    return product;
  } catch (error) {
    return null;
  }
};

// Get Product By Category Slug
export const getProductByCategorySlug = async (slug: string) => {
  try {
    const categoriesWithProducts: TGetProductByCategorySlug[] =
      await db.category.findMany({
        where: { slug },
        include: {
          Product: {
            include: productInclude,
          },
        },
      });

    if (!categoriesWithProducts) return null;

    // Map each category's Product array to extract just the Product part
    const products: TGetProduct[] = categoriesWithProducts.flatMap(
      (category) => category.Product
    );

    return products;
  } catch (error) {
    return null;
  }
};

// Get Product By SubCategory Slug
export const getProductBySubcategorySlug = async (slug: string) => {
  try {
    const subCategoriesWithProducts: TGetProductBySubcategorySlug[] =
      await db.subCategory.findMany({
        where: { slug },
        include: {
          Product: {
            include: productInclude,
          },
        },
      });

    if (!subCategoriesWithProducts) return null;

    // Map each category's Product array to extract just the Product part
    const products: (TGetProduct | null)[] = subCategoriesWithProducts.flatMap(
      (category) => category.Product
    );

    return products;
  } catch (error) {
    return null;
  }
};

// Get All Products
export const getAllProducts = async () => {
  try {
    const products: TGetProduct[] = await db.product.findMany({
      include: productInclude,
    });

    return products;
  } catch (error) {
    return null;
  }
};
