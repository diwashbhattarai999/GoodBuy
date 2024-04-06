"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { khaltiCheckoutSuccess } from "@/actions/checkout";

import { useCart } from "@/context/cart.context";

const CheckoutSuccess = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const searchParams = useSearchParams();
  const pidx = searchParams.get("pidx") as string;
  const paymentMethod = searchParams.get("paymentMethod");

  const { clearCart } = useCart();

  useEffect(() => {
    const cartItemIds = sessionStorage.getItem("cartItemIds");
    if (cartItemIds) {
      setIsPending(true);
      if (paymentMethod !== "cashOnDelivery" && pidx) {
        khaltiCheckoutSuccess(pidx)
          .then((data) => {
            if (data?.data) {
              const cartItemIdsArray: string[] = JSON.parse(cartItemIds);
              cartItemIdsArray.forEach((cartItemId) => {
                clearCart(cartItemId);
              });
              setSuccess("Thank You! Payment has been received.");
            } else {
              setError(
                "Oops! Some Problem Occured and payment failed. Please Try again."
              );
            }
          })
          .catch((error) => {
            console.error("Error processing Khalti payment:", error);
            setError(
              "Oops! Some Problem Occured and payment failed. Please Try again."
            );
          })
          .finally(() => {
            setIsPending(false);
          });
      } else {
        // Payment method is cash on delivery
        // Remove items from cart
        const cartItemIds = sessionStorage.getItem("cartItemIds");
        if (cartItemIds) {
          const cartItemIdsArray = JSON.parse(cartItemIds) as string[];
          cartItemIdsArray.forEach((cartItemId) => {
            clearCart(cartItemId);
          });
        }
        setSuccess("Thank You! Your order has been placed.");
        setIsPending(false);
      }
    }

    // Clear local storage
    sessionStorage.removeItem("cartItemIds");
  }, [pidx, paymentMethod, clearCart]);

  return (
    <div className=" flex items-center justify-center min-h-[50vh]">
      <div className="text-4xl">
        {isPending && <p>Processing payment...</p>}
        {success && <p>{success}</p>}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default CheckoutSuccess;
