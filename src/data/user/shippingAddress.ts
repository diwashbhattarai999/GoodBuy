import { db } from "@/lib/db";

export const getShippingAddressByUserId = async (userId: string) => {
  try {
    const shippingAdress = await db.shippingAdress.findUnique({
      where: { userId },
    });

    return shippingAdress;
  } catch (error) {
    return null;
  }
};
