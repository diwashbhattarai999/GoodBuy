import { Category, SubCategory } from "@prisma/client";

import HeroSection from "./heroSection";
import Todays from "./todays";
import Categories from "./categories";
import Image from "next/image";
import OurProducts from "./our-products";
import Featured from "./featured";
import { FaTruckFast } from "react-icons/fa6";
import { FaHeadphones } from "react-icons/fa";
import { SiAdguard } from "react-icons/si";

interface HomeProps {
  categories:
    | (Category & { subCategories: SubCategory[] | null })[]
    | undefined;
}

const ABOUT_SERVICES = [
  {
    icon: FaTruckFast,
    title: "Free and Fast Delivery",
    subtitle: "Free delivery for all orders over Rs. 999",
  },
  {
    icon: FaHeadphones,
    title: "24/7 Customer Service",
    subtitle: "Freindly 24/7 customer support",
  },
  {
    icon: SiAdguard,
    title: "Money back guarentee",
    subtitle: "We return money within 30 days",
  },
];

const Home = ({ categories }: HomeProps) => {
  return (
    <>
      <HeroSection categories={categories} />
      <Todays />
      <Categories />
      {/* BEST SELLING PRODUCT */}
      {/* BUY NOW BANNER WITH TIMER */}
      <Image
        src="/images/banner.png"
        alt="Hero-banner"
        width={1000}
        height={1000}
        priority
        className="w-full h-full mb-8"
      />
      {/* EXPLORE OUR PRODUCT */}
      <OurProducts />
      {/* NEW ARRIVAL */}
      <Featured />
      {/* SERVICES */}
      {/* Service */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-24 my-16 text-center">
        {ABOUT_SERVICES.map((info, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 p-4 items-center justify-center rounded-md"
          >
            <div className="ring-secondary-foreground/60 ring-8 bg-foreground text-primary rounded-full flex items-center justify-center p-2 mt-2">
              <info.icon className="rounded-full size-7 p-1" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              {info.title}
            </h2>
            <p className="text-sm text-secondary-foreground">{info.subtitle}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
