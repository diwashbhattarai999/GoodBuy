"use client";

import { useState, useTransition } from "react";

import * as z from "zod";
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
import {
  addCategory,
  deleteCategory,
  editCategory,
} from "@/actions/vendor/categories";
import { LuX } from "react-icons/lu";

interface CategoryFormProps {
  allCategories: Category[] | null;
}

const CategoryForm = ({ allCategories }: CategoryFormProps) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [editingCategory, setEditingCategory] = useState({ id: "", name: "" });
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();

  const defaultValues = {
    name: editingCategory.name || "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues,
  });

  const onSubmit = (values: z.infer<typeof CategorySchema>) => {
    startTransition(() => {
      editingCategory
        ? editCategory(editingCategory.id, values)
            .then((data) => {
              if (data.error) {
                setError(data.error);
                setSuccess("");
              }
              if (data.success) {
                update();
                setSuccess(data.success);
                setError("");
              }
            })
            .catch(() => setError("Something went wrong!"))
        : addCategory(values)
            .then((data) => {
              if (data.error) {
                setError(data.error);
                setSuccess("");
              }
              if (data.success) {
                update();
                setSuccess(data.success);
                setError("");
              }
            })
            .catch(() => setError("Something went wrong!"));
    });
  };

  const handleCategoryDelete = (id: string) => {
    startTransition(() => {
      deleteCategory(id)
        .then((data) => {
          if (data.error) {
            setError(data.error);
            setSuccess("");
          }
          if (data.success) {
            update();
            setSuccess(data.success);
            setError("");
          }
        })
        .catch(() => setError("Something went wrong!"));
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
            value={defaultValues.name}
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

        <ul className="flex flex-wrap gap-4 items-center justify-start">
          {allCategories?.map((category) => {
            return (
              <li
                key={category.id}
                className="bg-border p-4 w-fit rounded-md font-medium flex items-center justify-center gap-4 cursor-pointer"
                onClick={() => {
                  setEditingCategory({ id: category.id, name: category.name });
                  reset({ name: category.name });
                }}
              >
                <span>{category.name}</span>
                <LuX
                  className="mt-[3px] h-7 w-7 cursor-pointer bg-accent text-accent-foreground rounded-full p-1"
                  onClick={() => handleCategoryDelete(category.id)}
                />
              </li>
            );
          })}
        </ul>
      </CardWrapper>
    </MotionDiv>
  );
};

export default CategoryForm;
