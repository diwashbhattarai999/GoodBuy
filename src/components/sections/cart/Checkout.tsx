"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import * as z from "zod";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuMail, LuMap, LuPhone, LuUserCircle } from "react-icons/lu";
import { FaCity, FaStreetView } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import { ShippingAdress } from "@prisma/client";

import { checkout, khaltiPay } from "@/actions/checkout";

import { CheckoutSchema } from "@/schemas";

import { cn } from "@/lib/utils";

import { useCart } from "@/context/cart.context";

import Input from "@/components/ui/input";
import Button from "@/components/ui/Button";
import FormError from "@/components/ui/form-error";
import FormSuccess from "@/components/ui/form-success";
import Loader from "@/components/loader";

interface ICheckoutProps {
  shippingAddress?: ShippingAdress | null;
}

const Checkout = ({ shippingAddress }: ICheckoutProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const [defaultValues, setDefaultValues] = useState<
    z.infer<typeof CheckoutSchema>
  >({
    name: shippingAddress?.name || "",
    email: shippingAddress?.email || "",
    address: shippingAddress?.address || "",
    city: shippingAddress?.city || "",
    phone: shippingAddress?.phone || "",
    state: shippingAddress?.state || "",
    street: shippingAddress?.street || "",
    saveInfo: shippingAddress ? true : false,
    paymentMethod: undefined,
  });

  const { cartItems, loading } = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();

  const subProductId = searchParams.get("checkoutItems");
  const subProductIds = subProductId?.split(",") || [];

  const checkoutItems = cartItems.filter((cartItem) =>
    subProductIds.includes(cartItem.subProductId)
  );

  const total = searchParams.get("total") as string;
  const subtotal = searchParams.get("subtotal") as string;
  const shipping = searchParams.get("shipping") as string;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof CheckoutSchema>>({
    resolver: zodResolver(CheckoutSchema),
    defaultValues,
  });

  const onSubmit = (values: z.infer<typeof CheckoutSchema>) => {
    setError("");
    setSuccess("");

    // TODO: Remove math.min in production when using actual khalti not testing sandbox khalti
    const payload = {
      return_url: `${process.env.NEXT_PUBLIC_KHALTI_RETURN_URL}`,
      website_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
      amount: Math.min(parseInt(total), 100000),
      purchase_order_id: uuidv4(),
      purchase_order_name: "test",
      customer_info: {
        name: values.name,
        email: values.email,
        phone: values.phone,
      },
      amount_breakdown: [
        {
          label: "Mark Price",
          amount: Math.min(parseInt(subtotal), 100000),
        },
        {
          label: "Shipping Price",
          amount: Math.min(parseInt(shipping), 100000),
        },
      ],
      product_details: checkoutItems.map((checkoutItem) => {
        return {
          identity: checkoutItem.id,
          name: checkoutItem.subProduct.product.name,
          total_price: Math.min(
            Math.floor(
              (checkoutItem.subProduct.sizes[0].price +
                checkoutItem.subProduct.product.shipping) *
                checkoutItem.quantity
            ),
            100000
          ),
          quantity: checkoutItem.quantity,
          unit_price: Math.min(
            Math.floor(checkoutItem.subProduct.sizes[0].price),
            100000
          ),
        };
      }),
      merchant_username: "Diwash Bhattarai",
      merchant_extra: "diwashb999@gmail.com",
    };
    console.log(payload);

    startTransition(() => {
      if (values.saveInfo) {
        checkout(values)
          .then((data) => {
            if (data?.error) {
              setError(data?.error);
            }
            if (data?.success) {
              reset();
              setSuccess(data?.success);
            }
          })
          .catch(() => setError("Something went wrong"));
      }

      sessionStorage.setItem(
        "cartItemIds",
        JSON.stringify(checkoutItems.map((checkoutItem) => checkoutItem.id))
      );

      if (values.paymentMethod === "online") {
        khaltiPay(payload)
          .then((data) => {
            if (data?.error) {
              setError(data?.error);
            }
            if (data?.data) {
              router.push(data?.data.payment_url);
            }
          })
          .catch(() => setError("Something went wrong"));
      }

      if (values.paymentMethod === "cashOnDelivery") {
        router.replace(`checkout/success?paymentMethod=cashOnDelivery`);
      }
    });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="mt-10">
          <h1 className="text-xl font-medium mb-10">Billing Details</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col md:flex-row items-start gap-5 lg:gap-20"
          >
            <div className="w-full md:basis-[55%]">
              {/* User Inputs -- Full name */}
              <Input
                label="Full Name"
                name="name"
                type="text"
                value={defaultValues.name}
                placeholder="Full Name"
                icon={LuUserCircle}
                error={errors.name?.message}
                disabled={isPending}
                register={register("name")}
              />

              {/* User Inputs -- Email */}
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="Email"
                value={defaultValues.email}
                icon={LuMail}
                error={errors.email?.message}
                disabled={isPending}
                register={register("email")}
              />

              {/* User Inputs -- Phone Number */}
              <Input
                label="Phone Number"
                name="phone"
                type="text"
                value={defaultValues.phone}
                placeholder="Phone Number"
                icon={LuPhone}
                error={errors.phone?.message}
                disabled={isPending}
                register={register("phone")}
              />

              {/* User Inputs -- State */}
              <Input
                label="State/Province"
                name="state"
                type="text"
                value={defaultValues.state}
                placeholder="State/Province"
                icon={LuMap}
                error={errors.state?.message}
                disabled={isPending}
                register={register("state")}
              />

              {/* User Inputs -- City */}
              <Input
                label="City/Town"
                name="city"
                type="text"
                value={defaultValues.city}
                placeholder="City/Town"
                icon={FaCity}
                error={errors.city?.message}
                disabled={isPending}
                register={register("city")}
              />

              {/* User Inputs -- Address */}
              <Input
                label="Address"
                name="address"
                type="text"
                value={defaultValues.address}
                placeholder="Address"
                icon={FaLocationDot}
                error={errors.address?.message}
                disabled={isPending}
                register={register("address")}
              />

              {/* User Inputs -- Street */}
              <Input
                label="Street"
                name="street"
                type="text"
                value={defaultValues.street}
                placeholder="Street"
                icon={FaStreetView}
                error={errors.street?.message}
                disabled={isPending}
                register={register("street")}
              />

              {/* User Inputs -- SaveInfo */}
              <div className="flex items-center justify-start gap-4 mt-10">
                <input
                  {...register("saveInfo")}
                  type="checkbox"
                  id="saveInfo"
                  disabled={isPending}
                  className="w-4 h-4 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultChecked={defaultValues.saveInfo}
                />
                <label
                  htmlFor="saveInfo"
                  className={cn(
                    "text-primary-foreground cursor-pointer",
                    errors.saveInfo && "text-destructive opacity-80",
                    isPending && "cursor-not-allowed opacity-50"
                  )}
                >
                  Save this information for faster checkout next time
                </label>
              </div>
            </div>

            <div className="w-full md:basis-[45%] border border-border rounded-sm p-4">
              <ul className="flex flex-col gap-8">
                {checkoutItems.map((checkoutItem) => {
                  return (
                    <li
                      key={checkoutItem.id}
                      className="flex items-center justify-between gap-4 pb-3 border-b border-border"
                    >
                      <div className="flex gap-4 items-center max-w-[75%]">
                        <Image
                          src={checkoutItem.subProduct.images[0].url}
                          alt={checkoutItem.subProduct.product.name}
                          width={40}
                          height={40}
                        />

                        <p>{checkoutItem.subProduct.product.name}</p>
                      </div>
                      <p className="w-fit">
                        Rs. {checkoutItem.subProduct.sizes[0].price}
                      </p>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6">
                <div className="flex items-center justify-between gap-4 border-b border-foreground py-4">
                  <p className="text-lg  text-muted-foreground">Subtotal</p>
                  <p className="text-lg  text-muted-foreground">
                    Rs. {parseInt(subtotal)}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-foreground py-4">
                  <p className="text-lg  text-muted-foreground">Shipping</p>
                  <p className="text-lg  text-muted-foreground">
                    Rs. {parseInt(shipping)}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4 py-4">
                  <p className="text-lg  text-muted-foreground">Total</p>
                  <p className="text-lg  text-muted-foreground">
                    Rs. {parseInt(total)}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                {/* Payment Method - Online Payment */}
                <div className="flex items-center justify-start gap-4 mt-4">
                  <input
                    type="radio"
                    id="online"
                    value="online"
                    defaultValue={defaultValues.paymentMethod}
                    {...register("paymentMethod")}
                    className="w-4 h-4 disabled:cursor-not-allowed disabled:opacity-50 accent-accent"
                  />
                  <label
                    htmlFor="online"
                    className={cn(
                      "text-primary-foreground cursor-pointer",
                      errors.paymentMethod && "text-destructive opacity-80",
                      isPending && "cursor-not-allowed opacity-50"
                    )}
                  >
                    Pay with Khalti
                  </label>
                </div>

                {/* Payment Method - Cash on Delivery */}
                <div className="flex items-center justify-start gap-4 mt-4">
                  <input
                    type="radio"
                    id="cashOnDelivery"
                    value="cashOnDelivery"
                    defaultValue={defaultValues.paymentMethod}
                    {...register("paymentMethod")}
                    className="w-4 h-4 disabled:cursor-not-allowed disabled:opacity-50 accent-accent"
                  />
                  <label
                    htmlFor="cashOnDelivery"
                    className={cn(
                      "text-primary-foreground cursor-pointer",
                      errors.paymentMethod && "text-destructive opacity-80",
                      isPending && "cursor-not-allowed opacity-50"
                    )}
                  >
                    Cash On Delivery
                  </label>
                </div>
              </div>

              <div className="flex gap-4 w-full justify-between mt-6">
                <input
                  placeholder="Coupen Code"
                  className="h-full w-full py-3 px-2 bg-transparent border rounded-md text-primary-foreground placeholder:text-secondary-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button className="w-56">Apply Coupen</Button>
              </div>

              {/* Sucess Message */}
              {success && <FormSuccess message={success} />}

              {/* Error Message */}
              {error && <FormError message={error} />}

              {/* Submit Button */}
              <Button
                disabled={isPending}
                loader={isPending}
                full
                className="mt-4"
              >
                Place Order
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Checkout;
