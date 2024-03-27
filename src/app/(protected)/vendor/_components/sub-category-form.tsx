"use client";

import { useState, useTransition } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { MdOutlineCategory } from "react-icons/md";
import { LuX } from "react-icons/lu";

import { Category, SubCategory } from "@prisma/client";

import {
  deleteSubCategory,
  subcategories,
} from "@/actions/vendor/sub-categories";

import { SubCategorySchema } from "@/schemas";

import Input from "@/components/ui/input";
import Button from "@/components/ui/Button";
import FormError from "@/components/ui/form-error";
import FormSuccess from "@/components/ui/form-success";
import CardWrapper from "@/components/ui/card-wrapper";
import MotionDiv from "@/components/animations/motion-div";
import Select from "@/components/ui/select";

interface CategoryFormProps {
  allCategories: Category[] | null;
  allSubCategories: SubCategory[] | null;
}

const SubCategoryForm = ({
  allCategories,
  allSubCategories,
}: CategoryFormProps) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [selectCategory, setSelectCategory] = useState("Select a category");
  const [editingSubCategory, setEditingSubCategory] = useState({
    id: "",
    category: "",
    name: "",
  });
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();

  const categoryOptions = allCategories
    ? allCategories.map((category) => ({
        label: category.name,
        value: category.id,
      }))
    : [];

  const defaultValues = {
    name: editingSubCategory.name || "",
    category: editingSubCategory.id || "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof SubCategorySchema>>({
    resolver: zodResolver(SubCategorySchema),
    defaultValues,
  });

  const onSubmit = (values: z.infer<typeof SubCategorySchema>) => {
    console.log(values);
    startTransition(() => {
      subcategories(editingSubCategory.id, values)
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
      deleteSubCategory(id)
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

  const handleEditCategory = (subcategory: SubCategory) => {
    setEditingSubCategory({
      id: subcategory.id,
      name: subcategory.name,
      category: subcategory.categoryId,
    });
    reset({
      name: subcategory.name,
      category: subcategory.categoryId,
    });
  };

  return (
    <MotionDiv delayOffset={0.1} className="w-full">
      <CardWrapper
        headerLabel="Sub Categories"
        HeaderIcon={MdOutlineCategory}
        subHeaderLabel="Create / Update / Remove Subcategories"
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
            label="Subcategory Name"
            name="name"
            type="text"
            value={defaultValues.name}
            placeholder="Subcategory Name"
            icon={MdOutlineCategory}
            error={errors.name?.message}
            disabled={isPending}
            register={register("name")}
          />

          <Select
            selectLabel="Category"
            name="category"
            value={selectCategory}
            setSelectValue={setSelectCategory}
            Icon={MdOutlineCategory}
            error={errors.category?.message}
            disabled={isPending}
            options={categoryOptions}
            register={register("category")}
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
          {allSubCategories?.map((subcategory) => {
            return (
              <li
                key={subcategory.id}
                className="bg-border p-4 w-fit rounded-md font-medium flex items-center justify-center gap-4 cursor-pointer"
                onClick={() => handleEditCategory(subcategory)}
              >
                <span>{subcategory.name}</span>
                {/* //TODO: Show the category and options to delete that category */}
                <LuX
                  className="mt-[3px] h-7 w-7 cursor-pointer bg-accent text-accent-foreground rounded-full p-1"
                  onClick={() => handleCategoryDelete(subcategory.id)}
                />
              </li>
            );
          })}
        </ul>
      </CardWrapper>
    </MotionDiv>
  );
};

export default SubCategoryForm;
