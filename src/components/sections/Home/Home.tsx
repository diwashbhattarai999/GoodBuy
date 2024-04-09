import { Category, SubCategory } from "@prisma/client";

import HeroSection from "./heroSection";
import Todays from "./todays";
import Categories from "./categories";
import Image from "next/image";
import OurProducts from "./our-products";
import Featured from "./featured";
import { CustomProduct } from "@/../product";
import Services from "@/components/sections/Services";

interface HomeProps {
  categories:
    | (Category & { subCategories: SubCategory[] | null })[]
    | undefined;
  products: CustomProduct[] | null;
}

const Home = ({ categories, products }: HomeProps) => {
  return (
    <>
      <HeroSection categories={categories} />
      <Todays products={products} />
      <Categories categories={categories} />

      {/* BEST SELLING PRODUCT */}

      {/* BUY NOW BANNER WITH TIMER */}
      <div className="h-[32rem] w-full relative">
        <Image
          src="/images/banner.png"
          alt="Hero-banner"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
          className="bg-cover"
          loading="eager"
          aria-hidden="true"
        />
      </div>
      {/* EXPLORE OUR PRODUCT */}
      <OurProducts products={products} />

      {/* NEW ARRIVAL */}
      <Featured />
      {/* SERVICES */}

      {/* Service */}
      <Services />
    </>
  );
};

export default Home;
