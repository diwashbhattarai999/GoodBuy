"use client";

import { useCart } from "@/context/cart.context";
import { useSearchParams } from "next/navigation";

const CheckoutSuccess = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("checkoutItems");

  const { removeFromCart } = useCart();

  return (
    <div className=" flex items-center justify-center min-h-[50vh]">
      <h1 className="text-4xl">
        Thank you your payment has been completed sucessfully.
      </h1>
    </div>
  );
};

export default CheckoutSuccess;
