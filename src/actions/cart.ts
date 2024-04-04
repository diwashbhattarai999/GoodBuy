"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/user";
import { getCartItemByUserIdAndProductId } from "@/data/user/cart";

// Add CartItem function
export const addCartItem = async (productId: string) => {
  const user = await currentUser();
  if (!user) return { error: "Unauthorized!" };

  const dbUser = await getUserById(user.id as string);
  if (!dbUser) return { error: "Unauthorized!" };

  const existingCartItem = await getCartItemByUserIdAndProductId(
    user.id as string,
    productId
  );

  if (existingCartItem) {
    const updatedCartItem = await db.cartItem.update({
      where: { id: existingCartItem.id, userId: user.id, productId: productId },
      data: {
        quantity: existingCartItem.quantity + 1,
      },
      include: { product: true },
    });
    return { success: "CartItem Updated!", updatedCartItem };
  } else {
    const newCartItem = await db.cartItem.create({
      data: {
        userId: user.id,
        productId: productId,
        quantity: 1,
      },
      include: { product: true },
    });
    return { success: "CartItem Added!", newCartItem };
  }
};

// Decrease CartItem quantity function
export const deleteCartItem = async (id: string) => {
  const existingCartItem = await db.cartItem.findUnique({
    where: { id },
  });

  if (!existingCartItem) {
    return { error: "CartItem not found!" };
  }

  if (existingCartItem.quantity === 1) {
    // If quantity is already 1, delete the cart item
    const deletedCartItem = await db.cartItem.delete({
      where: { id },
    });
    return { success: "CartItem Deleted!", cartItem: deletedCartItem };
  } else {
    // If quantity is greater than 1, decrease the quantity by 1
    const updatedCartItem = await db.cartItem.update({
      where: { id },
      data: {
        quantity: existingCartItem.quantity - 1,
      },
      include: { product: true },
    });
    return { success: "CartItem Quantity Decreased!", updatedCartItem };
  }
};

export const clearCartItem = async (id: string) => {
  const user = await currentUser();
  if (!user) return { error: "Unauthorized!" };

  const dbUser = await getUserById(user.id as string);
  if (!dbUser) return { error: "Unauthorized!" };

  try {
    await db.cartItem.delete({
      where: { id },
    });

    return { success: "CartItems Deleted!" };
  } catch (error) {
    return { error: "Failed to clear cart items!" };
  }
};

export const getAllCartItems = async () => {
  const user = await currentUser();
  if (!user) return null;

  const dbUser = await getUserById(user.id as string);
  if (!dbUser) return null;

  try {
    const cartItems = await db.cartItem.findMany({
      where: { userId: user.id },
      include: {
        product: {
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
        },
      },
    });

    return cartItems;
  } catch (error) {
    return null;
  }
};
