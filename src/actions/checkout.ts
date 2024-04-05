"use server";

import * as z from "zod";
import axios from "axios";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

import { getUserById } from "@/data/user";
import { getShippingAddressByUserId } from "@/data/user/shippingAddress";

import { CheckoutSchema } from "@/schemas";
import { IPayload } from "@/types/payload";

export const checkout = async (values: z.infer<typeof CheckoutSchema>) => {
  const user = await currentUser();
  if (!user) return { error: "Unauthorized!" };

  const dbUser = await getUserById(user.id as string);
  if (!dbUser) return { error: "Unauthorized!" };

  const validatedFields = CheckoutSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { address, city, email, name, phone, state, street, saveInfo } =
    validatedFields.data;

  const existingShippingAddress = await getShippingAddressByUserId(
    user.id as string
  );

  if (existingShippingAddress) {
    await db.shippingAdress.update({
      where: { id: existingShippingAddress.id },
      data: {
        address,
        city,
        email,
        name,
        phone,
        state,
        street,
      },
    });

    return { success: "Shipping Address updated successfully" };
  }

  if (saveInfo) {
    await db.shippingAdress.create({
      data: {
        userId: user.id,
        address,
        city,
        email,
        name,
        phone,
        state,
        street,
      },
    });

    return { success: "Shipping Address saved successfully" };
  }
};

export const khaltiPay = async (payload: IPayload) => {
  const user = await currentUser();
  if (!user) return { error: "Unauthorized!" };

  const dbUser = await getUserById(user.id as string);
  if (!dbUser) return { error: "Unauthorized!" };

  try {
    const khaltiResponse = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      payload,
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
        },
      }
    );

    return {
      data: khaltiResponse.data as {
        pidx: string;
        payment_url: string;
        expires_at: string;
        expires_in: number;
      },
    };
  } catch (err: any) {
    return { error: err.data?.detail };
  }
};
