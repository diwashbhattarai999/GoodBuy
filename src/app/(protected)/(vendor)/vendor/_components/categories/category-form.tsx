"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import * as z from "zod";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { MdOutlineCategory } from "react-icons/md";

import { Category } from "@prisma/client";

import { CategorySchema } from "@/schemas";

import Input from "@/components/ui/input";
import Button from "@/components/ui/Button";
import FormError from "@/components/ui/form-error";
import FormSuccess from "@/components/ui/form-success";
import CardWrapper from "@/components/ui/card-wrapper";
import MotionDiv from "@/components/animations/motion-div";

interface CategoryFormProps {
  categories: { name: string }[];
}

const CategoryForm = ({ categories }: CategoryFormProps) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();

  const defaultValues = {
    name: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues,
  });

  const onSubmit = (values: z.infer<typeof CategorySchema>) => {
    startTransition(() => {
      startTransition(() => {
        console.log(values);
        // home(values)
        //   .then((data) => {
        //     if (data.error) {
        //       setError(data.error);
        //       setSuccess("");
        //     }
        //     if (data.success) {
        //       update();
        //       setSuccess(data.success);
        //       setError("");
        //     }
        //   })
        //   .catch(() => setError("Something went wrong!"));
      });
    });
  };

  return (
    <MotionDiv delayOffset={0.1} className="w-full">
      <CardWrapper
        headerLabel="Categories"
        HeaderIcon={MdOutlineCategory}
        subHeaderLabel="Create / Update / Remove Categories"
        disabled={isPending}
        maxWidthFull
        className="my-20"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-start z-0 my-5"
        >
          {/* User Inputs -- Full name */}
          <Input
            label="Category Name"
            name="name"
            type="text"
            placeholder="Category Name"
            icon={MdOutlineCategory}
            error={errors.name?.message}
            disabled={isPending}
            register={register("name")}
          />

          {/* Sucess Message */}
          {success && <FormSuccess message={success} />}

          {/* Error Message */}
          {error && <FormError message={error} />}

          {/* Submit Button */}
          <Button disabled={isPending} type="submit" className="px-6 w-24">
            Save
          </Button>
        </form>
      </CardWrapper>
    </MotionDiv>
  );
};

export default CategoryForm;
