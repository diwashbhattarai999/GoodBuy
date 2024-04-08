import { db } from "@/lib/db";

export const getOrdersByUserId = async (userId: string) => {
  try {
    const orders = await db.order.findMany({
      where: { userId },
      include: {
        shippingAddress: true,
        subProduct: {
          include: {
            images: true,
            color: true,
            description_images: true,
            sizes: true,
            product: {
              include: {
                category: true,
                subCategories: true,
                details: true,
                questions: true,
                reviews: true,
              },
            },
          },
        },
      },
    });

    return orders;
  } catch (error) {
    return null;
  }
};
