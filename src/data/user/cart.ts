import { db } from "@/lib/db";

export const getCartItemByUserIdAndSubProductId = async (
  userId: string,
  subProductId: string
) => {
  try {
    const cartItem = await db.cartItem.findUnique({
      where: { userId_subProductId: { userId, subProductId } },
    });

    return cartItem;
  } catch (error) {
    return null;
  }
};
