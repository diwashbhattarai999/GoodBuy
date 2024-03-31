"use client";

import { useEffect, useState, useTransition } from "react";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaBoxOpen } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { CiPickerHalf } from "react-icons/ci";
import { MdOutlineCategory } from "react-icons/md";

import { Category, SubCategory, SubProduct } from "@prisma/client";

import { CreateProductSchema } from "@/schemas";

import MotionDiv from "@/components/animations/motion-div";
import CardWrapper from "@/components/ui/card-wrapper";
import FormSuccess from "@/components/ui/form-success";
import FormError from "@/components/ui/form-error";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/select";
import Input from "@/components/ui/input";
import MultiSelect from "@/components/ui/multi-select";
import AddProductImage from "@/app/(protected)/vendor/_components/add-product-image";
import Sizes from "@/app/(protected)/vendor/_components/sizes";
import Details from "@/app/(protected)/vendor/_components/details";
import Questions from "@/app/(protected)/vendor/_components/questions";

interface CreateProductFormProps {
  parentsData: { id: string; name: string; subProducts: SubProduct[] }[] | null;
  categories: Category[] | null;
}

export type DefaultValuesType = {
  name: string;
  description: string;
  brand: string;
  sku: string;
  discount: number;
  images: string[];
  productId: string;
  category: { id: string; name: string };
  subCategories: SubCategory[];
  color: { color: string; image: string };
  sizes: {
    size: string;
    qty: number;
    price: number;
  }[];
  details:
    | {
        name: string;
        value: string;
      }[]
    | [];
  questions:
    | {
        question: string;
        answer: string;
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
  },
  subCategories: [],
  color: { color: "", image: "" },
  sizes: [{ size: "", qty: 0, price: 0 }],
  details: [{ name: "", value: "" }],
  questions: [{ question: "", answer: "" }],
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
    color: product.color.color,
    style: product.color.image,
    sizes: product.sizes,
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
      // setProduct((prevProduct) => {
      //   return {
      //     ...prevProduct,
      //     name: values.name,
      //     description: values.description,
      //     brand: values.brand,
      //     sku: values.sku,
      //     discount: values.discount || 0,
      //     color: { color: values?.color || "", image: colorImage },
      //   };
      // });
      console.log(product);
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
          {/* User Inputs -- Product Images */}
          <AddProductImage
            images={images}
            setImages={setImages}
            setValue={setValue}
            setProduct={setProduct}
            setColorImage={setColorImage}
          />

          {/* User Inputs -- Colors */}
          <Input
            label="Pick a color. You can pick a color image by hovering over the product image above and click color picker at center."
            name="color"
            type="text"
            value={product.color.color}
            placeholder="Pick a color ( Hex value)"
            icon={CiPickerHalf}
            error={errors.color?.message}
            disabled={isPending}
            register={register("color")}
            onChange={(value) => {
              setProduct({
                ...product,
                color: {
                  color: typeof value === "string" ? value : "",
                  image: colorImage,
                },
              });
            }}
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
            disabled={isPending}
            options={categoryOptions}
            register={register("category")}
            onChange={(value) => {
              setProduct({
                ...product,
                category: {
                  ...product.category,
                  id: value,
                  name: selectCategory,
                },
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
              disabled={isPending || !!(subcategoryOptions.length <= 0)}
              options={subcategoryOptions}
              register={register("subCategories")}
              onChange={(selectedValues) => {
                const selectedSubCategories = selectedValues
                  .map((value) =>
                    subCategories.find(
                      (subCategory) => subCategory.id === value
                    )
                  )
                  .filter(
                    (subcategory) => subcategory !== undefined
                  ) as SubCategory[];
                setProduct({
                  ...product,
                  subCategories: selectedSubCategories,
                });
              }}
            />
          )}

          {/* --------- Basic Infos --------- */}
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
            onChange={(value) => {
              setProduct({
                ...product,
                name: value as string,
              });
            }}
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
            onChange={(value) => {
              setProduct({
                ...product,
                description: value as string,
              });
            }}
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
            onChange={(value) => {
              setProduct({
                ...product,
                brand: value as string,
              });
            }}
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
            onChange={(value) => {
              setProduct({
                ...product,
                sku: value as string,
              });
            }}
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
            onChange={(value) => {
              setProduct({
                ...product,
                discount: value as number,
              });
            }}
          />

          <Sizes
            sizes={product.sizes}
            product={product}
            setProduct={setProduct}
          />

          <Details
            details={product.details}
            product={product}
            setProduct={setProduct}
          />

          <Questions
            questions={product.questions}
            product={product}
            setProduct={setProduct}
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
