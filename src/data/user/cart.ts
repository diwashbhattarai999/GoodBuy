import { db } from "@/lib/db";

export const getCartItemByUserIdAndProductId = async (
  userId: string,
  productId: string
) => {
  try {
    const cartItem = await db.cartItem.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    return cartItem;
  } catch (error) {
    return null;
  }
};
