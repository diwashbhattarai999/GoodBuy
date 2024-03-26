import { Image, Size, Style, SubProduct } from "@prisma/client";

import { db } from "@/lib/db";

import {
  GetProductBySlugSubProductType,
  GetProductBySlugType,
  getProductBySlug,
} from "@/data/products/product";

import { CustomProduct } from "@/../product";

import AnimationWrapper from "@/components/animations/page-animation";
import MaxWidthContainer from "@/components/max-width-container";
import BreadCrumbs from "@/components/product/bread-crumbs";
import MainSwiper from "@/components/product/main-swiper";
import ProductInfos from "@/components/product/product-info";
import Loader from "@/components/loader";

export interface CustomProductType extends CustomProduct {
  images: Image[];
  sizes: Size[];
  discount: number;
  sku: string;
  colors: Style[];
  priceRange: string;
  price: string | number;
  priceBefore: number;
  quantity: number;
  ratings: {
    percentage: number;
  }[];
  allSizes: Size[];
}

interface PageParams {
  params: {
    productId: string;
  };
  searchParams: {
    style: number;
    size: number;
  };
}

export default async function ProductPage({
  params,
  searchParams,
}: PageParams) {
  const slug = params.productId;
  const style = searchParams.style || 0;
  const size = searchParams?.size || 0;

  let product: GetProductBySlugType | null;
  let subProduct: GetProductBySlugSubProductType | undefined;
  let prices: number[] | undefined;
  let newProduct: CustomProductType | undefined = undefined;

  try {
    //get the product and subproduct
    product = await getProductBySlug(slug);

    subProduct = product?.subProducts[style];

    //check if product and subproduct exists
    if (!product || subProduct === undefined) {
      return <div>Product not found</div>;
    }

    //get the all prices array
    prices = subProduct?.sizes.map((s) => s.price).sort((a, b) => a - b);

    //define the new custom product
    newProduct = {
      ...product,
      images: subProduct?.images,
      sizes: subProduct?.sizes,
      discount: subProduct?.discount,
      sku: subProduct?.sku,
      colors: product?.subProducts?.map((p) => p.color),
      priceRange: subProduct?.discount
        ? `From ${(prices[0] - prices[0] / subProduct?.discount).toFixed(2)} 
           to ${(
             prices[prices?.length - 1] -
             prices[prices?.length - 1] / subProduct?.discount
           ).toFixed(2)}$`
        : `From ${prices[0]} to ${prices[prices?.length - 1]}$`,
      price:
        subProduct?.discount > 0
          ? (
              subProduct?.sizes[size]?.price -
              subProduct?.sizes[size]?.price / subProduct?.discount
            ).toFixed(2)
          : subProduct?.sizes[size]?.price,
      priceBefore: subProduct?.sizes[size]?.price,
      quantity: subProduct?.sizes[size]?.qty,
      ratings: [
        {
          percentage: 78,
        },
        {
          percentage: 52,
        },
        {
          percentage: 29,
        },
        {
          percentage: 15,
        },
        {
          percentage: 6,
        },
      ],
      allSizes: product.subProducts
        .map((p) => {
          return p.sizes;
        })
        .flat()
        .sort((a, b) => {
          return parseInt(a.size) - parseInt(b.size);
        })
        .filter(
          (elem, index, arr) =>
            arr.findIndex((elem2) => elem2.size === elem.size) === index
        ),
      details: product.details,
      questions: product.questions,
    };

    newProduct = JSON.parse(JSON.stringify(newProduct));
  } catch (error) {
    console.log("Error", error);
  }

  if (!newProduct) {
    return <Loader />;
  }

  return (
    <AnimationWrapper>
      <MaxWidthContainer>
        <BreadCrumbs product={newProduct} />
        <div className="bg-white p-2 mb-2 relative">
          <div className="flex max-md:flex-col gap-6">
            <MainSwiper images={newProduct.images} />
            <ProductInfos product={newProduct} />
          </div>
        </div>
      </MaxWidthContainer>
    </AnimationWrapper>
  );
}
