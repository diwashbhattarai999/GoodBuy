"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import * as z from "zod";
import { LuX } from "react-icons/lu";
import { ScaleLoader } from "react-spinners";

import { khaltiCheckoutSuccess } from "@/actions/checkout";
import { order } from "@/actions/order";

import useOnClickOutside from "@/hooks/use-on-click-outside";

import { useCart } from "@/context/cart.context";

import Button from "@/components/ui/Button";
import Link from "next/link";

const CheckoutSuccess = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const SuccessRef = useRef<HTMLDivElement | null>(null);
  const ErrorRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const pidx = searchParams.get("pidx") as string;
  const paymentMethod = searchParams.get("paymentMethod");

  const { clearCart, cartItems } = useCart();

  useEffect(() => {
    const cartItemIds = sessionStorage.getItem("cartItemIds");
    if (cartItemIds) {
      const processPayment = async () => {
        try {
          setIsPending(true);
          if (paymentMethod !== "cashOnDelivery" && pidx) {
            // Process Khalti payment
            const data = await khaltiCheckoutSuccess(pidx);
            if (data?.data) {
              const cartItemIdsArray: string[] = JSON.parse(cartItemIds);

              const orderItems = cartItems.filter((cartItem) =>
                cartItemIds.includes(cartItem.id)
              );

              await order({
                orderItems,
                paymentMethod: "KHALTI",
                paymentData: data?.data,
              });

              cartItemIdsArray.forEach((cartItemId) => {
                clearCart(cartItemId);
              });

              setSuccess(
                "Thank You! Payment has been received. Also, your order has been placed."
              );
            } else {
              setError(
                "Oops! Some Problem Occurred and payment failed. Please try again."
              );
            }
          } else {
            // Process cash on delivery
            await handleCashOnDelivery();
          }
        } catch (error) {
          console.error("Error processing payment:", error);
          setError(
            "Oops! Some Problem Occurred and payment failed. Please Try again."
          );
        } finally {
          setIsPending(false);
        }
      };

      const handleCashOnDelivery = async () => {
        // Create order for cash on delivery
        await order({
          orderItems: cartItems,
          paymentMethod: "CASHONDELIVERY",
        });

        // Remove items from cart
        const cartItemIdsArray = JSON.parse(cartItemIds) as string[];
        cartItemIdsArray.forEach((cartItemId) => {
          clearCart(cartItemId);
        });

        setSuccess("Thank You! Your order has been placed.");
      };

      processPayment();
    }

    // Clear local storage
    sessionStorage.removeItem("cartItemIds");
  }, [pidx, paymentMethod, clearCart, cartItems]);

  useOnClickOutside(SuccessRef, () => {
    setSuccess("");
  });
  useOnClickOutside(ErrorRef, () => {
    setError("");
  });

  return (
    <div className=" flex items-center justify-center min-h-[50vh]">
      {isPending && (
        <div className="fixed top-0 left-0 bg-foreground/70 h-screen w-full z-50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-background border border-border shadow-md px-8 py-12 rounded-md min-w-full md:min-w-[400px] flex flex-col items-center justify-center gap-8">
            <p className="text-2xl font-semibold">
              {pidx ? "Processing payment..." : "Confirming Order"}
            </p>
            <ScaleLoader color="#178731" />
          </div>
        </div>
      )}
      {success && (
        <div
          ref={SuccessRef}
          className="fixed top-0 left-0 bg-foreground/70 h-screen w-full z-50 backdrop-blur-sm flex items-center justify-center"
        >
          <div className="bg-background border border-border shadow-md px-8 py-16 rounded-md min-w-full md:min-w-[450px] flex flex-col items-center justify-center gap-8 relative">
            <p className="text-2xl font-semibold">{success}</p>
            <Link href="/my-orders">
              <LuX
                className="absolute top-4 right-4 h-5 w-5 cursor-pointer"
                onClick={() => {
                  setSuccess("");
                }}
              />
            </Link>
            <Link href="/my-orders">
              <Button className="w-40">Check your orders</Button>
            </Link>
          </div>
        </div>
      )}
      {error && (
        <div
          ref={ErrorRef}
          className="fixed top-0 left-0 bg-foreground/70 h-screen w-full z-50 backdrop-blur-sm flex items-center justify-center"
        >
          <div className="bg-background border border-border shadow-md px-8 py-16 rounded-md min-w-full md:min-w-[450px] flex flex-col items-center justify-center gap-8 relative">
            <p className="text-2xl font-semibold">{error}</p>
            <Link href="/cart">
              <LuX
                className="absolute top-4 right-4 h-5 w-5 cursor-pointer"
                onClick={() => {
                  setError("");
                }}
              />
            </Link>
            <Link href="/cart">
              <Button className="w-40">Go to Cart</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutSuccess;
