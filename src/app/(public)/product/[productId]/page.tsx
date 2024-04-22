import { Image, Size, Style } from "@prisma/client";

import {
  TGetProduct,
  TGetProductBySlugSubProduct,
  getProductBySlug,
} from "@/data/user/product";

import { CustomProduct } from "@/../product";

import AnimationWrapper from "@/components/animations/page-animation";
import MaxWidthContainer from "@/components/max-width-container";
import BreadCrumbs from "@/components/product/bread-crumbs";
import MainSwiper from "@/components/product/main-swiper";
import ProductInfos from "@/components/product/product-info";
import Loader from "@/components/loader";
import SectionHeader from "@/components/sections/Home/section-header";
import { getProducts } from "@/data/vendor/products";
import ProductCard from "@/components/product/product-card/product-card";
import Services from "@/components/sections/Services";

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

  let product: TGetProduct | null;
  let subProduct: TGetProductBySlugSubProduct | undefined;
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

  const products = await getProducts();

  return (
    <AnimationWrapper>
      <MaxWidthContainer>
        <BreadCrumbs
          activeClasses="text-accent"
          containerClasses="flex py-5"
          listClasses="hover:underline font-bold"
          capitalizeLinks
        />
        <div className="bg-white p-2 mb-2 relative">
          <div className="flex max-md:flex-col gap-6">
            <MainSwiper
              images={newProduct.images}
              subProducts={newProduct.subProducts}
            />
            <ProductInfos product={newProduct} />
          </div>
        </div>

        <div className="my-16">
          <SectionHeader
            label="Find More"
            subLabel="Similar Products"
            showArrows
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 -mx-[10px] my-6 gap-6">
            {products?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                imgHeight="h-[280px]"
              />
            ))}
          </div>
        </div>

        <Services />
      </MaxWidthContainer>
    </AnimationWrapper>
  );
}
