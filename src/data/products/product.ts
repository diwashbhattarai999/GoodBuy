import { db } from "@/lib/db";
import {
  Category,
  Image,
  Product,
  ProductDetail,
  Question,
  Review,
  Size,
  Style,
  SubCategory,
  SubProduct,
} from "@prisma/client";

export interface GetProductBySlugSubProductType extends SubProduct {
  sizes: Size[];
  images: Image[];
  color: Style;
  description_images: Image[];
}

export interface GetProductBySlugType extends Product {
  category: Category;
  subCategories: SubCategory[];
  reviews: Review[];
  subProducts: GetProductBySlugSubProductType[];
  details: ProductDetail[];
  questions: Question[];
}

export const getProductBySlug = async (slug: string) => {
  try {
    const product: GetProductBySlugType | null = await db.product.findUnique({
      where: { slug },
      include: {
        category: true,
        subCategories: true,
        reviews: true,
        details: true,
        questions: true,
        subProducts: {
          include: {
            sizes: true,
            images: true,
            color: true,
            description_images: true,
          },
        },
      },
    });

    return product;
  } catch (error) {
    return null;
  }
};
