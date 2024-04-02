import { db } from "@/lib/db";

export const getProductByName = async (name: string) => {
  try {
    const product = await db.product.findFirst({ where: { name } });

    return product;
  } catch (error) {
    return null;
  }
};

export const getProductById = async (id: string) => {
  try {
    const product = await db.product.findUnique({ where: { id } });

    return product;
  } catch (error) {
    return null;
  }
};

export const getProducts = async () => {
  try {
    const products = await db.product.findMany({
      include: {
        category: true,
        subCategories: true,
        details: true,
        questions: true,
        reviews: true,
        subProducts: {
          include: {
            images: true,
            description_images: true,
            sizes: true,
            color: true,
          },
        },
      },
    });

    return products;
  } catch (error) {
    return null;
  }
};

export const getProductsNameAndSubProducts = async () => {
  try {
    const products = await db.product.findMany({
      select: {
        id: true,
        name: true,
        subProducts: {
          include: {
            images: true,
            description_images: true,
          },
        },
      },
    });

    return products;
  } catch (error) {
    return null;
  }
};
