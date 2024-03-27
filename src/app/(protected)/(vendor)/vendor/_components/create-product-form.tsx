"use client";

import { useEffect, useState, useTransition } from "react";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaBoxOpen } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";

import {
  Category,
  Image,
  Size,
  Style,
  SubCategory,
  SubProduct,
} from "@prisma/client";

import { CreateProductSchema } from "@/schemas";

import MotionDiv from "@/components/animations/motion-div";
import CardWrapper from "@/components/ui/card-wrapper";
import FormSuccess from "@/components/ui/form-success";
import FormError from "@/components/ui/form-error";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/select";
import { MdOutlineCategory } from "react-icons/md";
import Input from "@/components/ui/input";
import MultiSelect from "@/components/ui/multi-select";
import AddProductImage from "@/app/(protected)/(vendor)/vendor/_components/add-product-image";

interface CreateProductFormProps {
  parentsData: { id: string; name: string; subProducts: SubProduct[] }[] | null;
  categories: Category[] | null;
}

type DefaultValuesType = {
  name: string;
  description: string;
  brand: string;
  sku: string;
  discount: number;
  images: Image[];
  productId: string;
  category: Category;
  subCategories: SubCategory[];
  color: Style;
  sizes: Size[];
  details:
    | {
        name: string;
        value: string;
      }[]
    | [];
  questions:
    | {
        name: string;
        value: string;
      }[]
    | [];
  shippingFee: string;
};

const initialProduct: DefaultValuesType = {
  name: "",
  description: "",
  brand: "",
  sku: "",
  discount: 0,
  images: [],
  productId: "",
  category: {
    id: "",
    name: "",
    slug: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  subCategories: [],
  color: { id: "", color: "", image: "" },
  sizes: [{ id: "", size: "", qty: 0, price: 0, subProductId: null }],
  details: [{ name: "", value: "" }],
  questions: [{ name: "", value: "" }],
  shippingFee: "",
};

const CreateProductForm = ({
  parentsData,
  categories,
}: CreateProductFormProps) => {
  const [product, setProduct] = useState(initialProduct);
  const [subCategories, setSubCategories] = useState<
    {
      name: string;
      id: string;
    }[]
  >([]);
  const [colorImage, setColorImage] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [descriptionImages, setDescriptionImages] = useState([]);
  const [selectProduct, setSelectProduct] = useState("Select a product");
  const [selectCategory, setSelectCategory] = useState("Select a category");
  const [selectSubCategories, setSelectSubCategories] = useState<string[]>([]);

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const defaultValues = {
    name: product.name,
    brand: product.brand,
    description: product.description,
    category: product.category.id,
    productId: product.productId,
    subCategories: product.subCategories.map((subcategory) => subcategory.id),
    sku: product.sku,
    discount: product.discount,
    image: images,
    // color: product.color.color,
    // style: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<z.infer<typeof CreateProductSchema>>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues,
  });

  useEffect(() => {
    const getParentData = async () => {
      await axios
        .get(`/api/product/${product.productId}`)
        .then((res) => res.data)
        .then((data) => {
          setProduct((product) => {
            return {
              ...product,
              name: data.name,
              description: data.description,
              brand: data.brand,
              category: data.category,
              subCategories: data.subCategories,
              questions: [],
              details: [],
            };
          });

          reset({
            ...defaultValues,
            name: data.name,
            description: data.description,
            brand: data.brand,
            category: data.category,
            subCategories: data.subCategories,
          });
        })
        .catch((err) => console.log(err));
    };

    if (product.productId.length > 0) {
      getParentData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.productId]);

  useEffect(() => {
    const getSubCategories = async () => {
      await axios
        .get(`/api/vendor/sub-categories/${product.category.id}`)
        .then((res) => res.data)
        .then((data) => setSubCategories(data))
        .catch((err) => console.log(err));
    };

    if (product.category.id.length > 0) {
      getSubCategories();
    }
  }, [product.category.id, product.productId]);

  const onSubmit = (values: z.infer<typeof CreateProductSchema>) => {
    startTransition(() => {
      console.log(values);
    });
  };

  const parentOptions = parentsData
    ? parentsData.map((parent) => ({
        label: parent.name,
        value: parent.id,
      }))
    : [];

  const categoryOptions = categories
    ? categories.map((category) => ({
        label: category.name,
        value: category.id,
      }))
    : [];

  const subcategoryOptions = subCategories
    ? subCategories.map((subcategory) => ({
        label: subcategory.name,
        value: subcategory.id,
      }))
    : [];

  return (
    <MotionDiv delayOffset={0.1} className="w-full">
      <CardWrapper
        headerLabel="Create product"
        HeaderIcon={FaBoxOpen}
        subHeaderLabel="Create/add new products"
        disabled={isPending}
        maxWidthFull
        className="my-20"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-start z-0 my-5"
        >
          <AddProductImage
            images={images}
            setImages={setImages}
            value={defaultValues.image}
            setValue={setValue}
          />
          {/* User Inputs -- Parent Product Id */}
          <Select
            selectLabel="Add to an existing Product"
            name="productId"
            value={selectProduct}
            setSelectValue={setSelectProduct}
            Icon={FaBoxOpen}
            error={errors.productId?.message}
            disabled={isPending}
            options={parentOptions}
            register={register("productId")}
            onChange={(value) => {
              setProduct({ ...product, productId: value });
            }}
          />

          {/* User Inputs -- Category */}
          <Select
            selectLabel="Category"
            name="category"
            value={selectCategory}
            setSelectValue={setSelectCategory}
            Icon={MdOutlineCategory}
            error={errors.category?.message}
            disabled={isPending || !!(product.productId.length <= 0)}
            options={categoryOptions}
            register={register("category")}
            onChange={(value) => {
              setProduct({
                ...product,
                category: { ...product.category, id: value },
              });
            }}
          />

          {/* User Inputs -- SubCategories */}

          {product.category && (
            <MultiSelect
              selectLabel="Subcategories"
              name="subCategories"
              value={selectSubCategories}
              setSelectValue={setSelectSubCategories}
              Icon={MdOutlineCategory}
              error={errors.subCategories?.message}
              disabled={isPending || !!(product.productId.length <= 0)}
              options={subcategoryOptions}
              register={register("subCategories")}
              onChange={(selectedValues) => {
                const selectedSubCategories = selectedValues
                  .map((value) =>
                    subCategories.find(
                      (subCategory) => subCategory.id === value
                    )
                  )
                  .filter((subcategory) => subcategory !== undefined) as {
                  id: string;
                  name: string;
                  slug: string;
                  categoryId: string;
                  createdAt: Date;
                  updatedAt: Date;
                  productId: string | null;
                }[];
                setProduct({
                  ...product,
                  subCategories: selectedSubCategories,
                });
              }}
            />
          )}

          <h2 className="text-lg text-muted-foreground mt-2 pb-1 border-b border-border w-full">
            Basic Infos
          </h2>
          {/* User Inputs -- Name */}
          <Input
            label="Name"
            name="name"
            type="text"
            value={product.name}
            placeholder="Product Name"
            icon={MdDriveFileRenameOutline}
            error={errors.name?.message}
            disabled={isPending}
            register={register("name")}
          />

          {/* User Inputs -- Description */}
          <Input
            label="Description"
            name="description"
            type="text"
            value={product.description}
            placeholder="Product Description"
            icon={MdDriveFileRenameOutline}
            error={errors.description?.message}
            disabled={isPending}
            register={register("description")}
          />

          {/* User Inputs -- Brand */}
          <Input
            label="Brand"
            name="brand"
            type="text"
            value={product.brand}
            placeholder="Product Brand"
            icon={MdDriveFileRenameOutline}
            error={errors.brand?.message}
            disabled={isPending}
            register={register("brand")}
          />

          {/* User Inputs -- SKU */}
          <Input
            label="SKU"
            name="sku"
            type="text"
            value={product.sku}
            placeholder="Product SKU"
            icon={MdDriveFileRenameOutline}
            error={errors.sku?.message}
            disabled={isPending}
            register={register("sku")}
          />

          {/* User Inputs -- Discount */}
          <Input
            label="Discount"
            name="discount"
            type="number"
            value={product.discount}
            placeholder="Product Discount"
            icon={MdDriveFileRenameOutline}
            error={errors.discount?.message}
            disabled={isPending}
            register={register("discount", { valueAsNumber: true })}
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

export default CreateProductForm;
