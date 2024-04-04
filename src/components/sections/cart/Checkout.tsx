"use client";

import { useState, useTransition } from "react";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuMail, LuMap, LuPhone, LuUserCircle } from "react-icons/lu";
import { FaCity, FaStreetView } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import { CheckoutSchema } from "@/schemas";

import { cn } from "@/lib/utils";

import Input from "@/components/ui/input";
import Button from "@/components/ui/Button";
import FormError from "@/components/ui/form-error";
import FormSuccess from "@/components/ui/form-success";
import { useCart } from "@/context/cart.context";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Loader from "@/components/loader";

const Checkout = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [defaultValues, setDefaultValues] = useState<
    z.infer<typeof CheckoutSchema>
  >({
    name: "",
    email: "",
    address: "",
    city: "",
    phone: "",
    state: "",
    street: "",
    saveInfo: false,
    paymentMethod: "online",
  });

  const { cartItems, loading } = useCart();
  const searchParams = useSearchParams();

  const productId = searchParams.get("checkoutItems");
  const productIds = productId?.split(",") || [];

  const checkoutItems = cartItems.filter((cartItem) =>
    productIds.includes(cartItem.productId)
  );

  const total = searchParams.get("total");
  const subtotal = searchParams.get("subtotal");
  const shipping = searchParams.get("shipping");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof CheckoutSchema>>({
    resolver: zodResolver(CheckoutSchema),
    defaultValues,
  });

  const onSubmit = (values: z.infer<typeof CheckoutSchema>) => {
    setError("");
    setSuccess("");
    console.log(values);

    startTransition(() => {
      console.log(values);
    });
  };

  const handlePaymentMethodChange = (method: "cashOnDelivery" | "online") => {
    setDefaultValues({ ...defaultValues, paymentMethod: method });
  };

  if (loading) {
    return <Loader />;
  }

  return (
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
            autocomplete="off"
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
            autocomplete="off"
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
            autocomplete="off"
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
            autocomplete="off"
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
            autocomplete="off"
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
            autocomplete="off"
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
            autocomplete="off"
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
                error && "text-destructive opacity-80",
                isPending && "cursor-not-allowed opacity-50"
              )}
            >
              Save this information for faster checkout next time
            </label>
          </div>
        </div>

        <div className="w-full md:basis-[45%] border border-border rounded-sm p-4">
          <ul className="flex flex-col gap-8">
            {checkoutItems.map((checkoutItem, i) => {
              return (
                <li
                  key={checkoutItem.id}
                  className="flex items-center justify-between gap-4 pb-3 border-b border-border"
                >
                  <div className="flex gap-4 items-center max-w-[75%]">
                    <Image
                      src={checkoutItem.product.subProducts[0].images[0].url}
                      alt={checkoutItem.product.name}
                      width={40}
                      height={40}
                    />

                    <p>{checkoutItem.product.name}</p>
                  </div>
                  <p className="w-fit">
                    Rs. {checkoutItem.product.subProducts[0].sizes[0].price}
                  </p>
                </li>
              );
            })}
          </ul>

          <div className="mt-6">
            <div className="flex items-center justify-between gap-4 border-b border-foreground py-4">
              <p className="text-lg  text-muted-foreground">Subtotal</p>
              <p className="text-lg  text-muted-foreground">Rs. {subtotal}</p>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-foreground py-4">
              <p className="text-lg  text-muted-foreground">Shipping</p>
              <p className="text-lg  text-muted-foreground">Rs. {shipping}</p>
            </div>
            <div className="flex items-center justify-between gap-4 py-4">
              <p className="text-lg  text-muted-foreground">Total</p>
              <p className="text-lg  text-muted-foreground">Rs. {total}</p>
            </div>
          </div>

          <div className="mt-6">
            {/* Payment Method - Online Payment */}
            <div className="flex items-center justify-start gap-4 mt-4">
              <input
                type="radio"
                id="online"
                value="online"
                checked={defaultValues.paymentMethod === "online"}
                onChange={() => handlePaymentMethodChange("online")}
                className="w-4 h-4 disabled:cursor-not-allowed disabled:opacity-50 accent-accent"
              />
              <label
                htmlFor="online"
                className={cn(
                  "text-primary-foreground cursor-pointer",
                  error && "text-destructive opacity-80",
                  isPending && "cursor-not-allowed opacity-50"
                )}
              >
                Online Payment
              </label>
            </div>

            {/* Payment Method - Cash on Delivery */}
            <div className="flex items-center justify-start gap-4 mt-4">
              <input
                type="radio"
                id="cashOnDelivery"
                value="cashOnDelivery"
                checked={defaultValues.paymentMethod === "cashOnDelivery"}
                onChange={() => handlePaymentMethodChange("cashOnDelivery")}
                className="w-4 h-4 disabled:cursor-not-allowed disabled:opacity-50 accent-accent"
              />
              <label
                htmlFor="cashOnDelivery"
                className={cn(
                  "text-primary-foreground cursor-pointer",
                  error && "text-destructive opacity-80",
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
          <Button disabled={isPending} full className="mt-4">
            Place Order
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
