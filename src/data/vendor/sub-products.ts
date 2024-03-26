import { db } from "@/lib/db";

export const getSubProductsByProductId = async (productId: string) => {
  try {
    const subProducts = await db.subProduct.findMany({
      where: { productId },
      include: {
        images: true, // Include the related images
        description_images: true, // Include the related description images
      },
    });

    return subProducts;
  } catch (error) {
    return null;
  }
};
