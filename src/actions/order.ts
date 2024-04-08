"use server";

import { revalidatePath } from "next/cache";

import { PaymentMethod, Status } from "@prisma/client";

import { ICartItem } from "@/../product";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

import { getUserById } from "@/data/user";
import { getShippingAddressByUserId } from "@/data/user/shippingAddress";

interface IOrder {
  orderItems: ICartItem[];
  paymentMethod: PaymentMethod;
  paymentData?: {
    pidx: string;
    total_amount: number;
    status:
      | "Completed"
      | "Pending"
      | "Initiated"
      | "Refunded"
      | "Expired"
      | "User canceled";
    transaction_id: string;
    fee: number;
    refunded: boolean;
  };
}

// Define a mapping function to convert Khalti status to Prisma Status enum
const mapStatus = (status: string): Status => {
  switch (status.toLowerCase()) {
    case "completed":
      return Status.Completed;
    case "pending":
      return Status.Pending;
    case "initiated":
      return Status.Initiated;
    case "refunded":
      return Status.Refunded;
    case "expired":
      return Status.Expired;
    case "user canceled":
      return Status.UserCanceled;
    default:
      return Status.Pending; // Default to pending status if status is unrecognized
  }
};
export const order = async ({
  orderItems,
  paymentMethod,
  paymentData,
}: IOrder) => {
  const user = await currentUser();
  if (!user) return { error: "Unauthorized!" };

  const dbUser = await getUserById(user.id as string);
  if (!dbUser) return { error: "Unauthorized!" };

  // Calculate total price and shipping price
  let total = 0;
  orderItems.forEach((item) => {
    total +=
      item.quantity *
      (item.subProduct.sizes[0].price +
        (item.subProduct.product.shipping || 0));
  });

  // Get shipping address
  const shippingAddress = await getShippingAddressByUserId(user.id as string);

  if (!shippingAddress) return { error: "No shipping address found" };

  const OrdersData = Array.from(orderItems).map((orderItem) => ({
    userId: user.id,
    subProductId: orderItem.subProductId,
    shippingAddressId: shippingAddress.id,
    paymentMethod,
    status: paymentData?.status
      ? mapStatus(paymentData?.status as string)
      : "Pending",
    total,
    quantity: orderItem.quantity,
    shippingPrice: orderItems.reduce(
      (acc, curr) => acc + (curr.subProduct.product.shipping || 0),
      0
    ),
    transactionId: paymentData?.transaction_id,
    paidAt: paymentData ? new Date() : null,
    taxPrice: 0,
  }));

  const newOrders = await Promise.all(
    OrdersData.map(async (orderItem) => {
      await db.order.create({ data: orderItem });
    })
  );

  revalidatePath("/my-orders");

  return newOrders;
};
