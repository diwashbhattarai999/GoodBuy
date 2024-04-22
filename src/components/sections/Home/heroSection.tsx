"use client";

import { Category, SubCategory } from "@prisma/client";
import Image from "next/image";
import { LuChevronRight } from "react-icons/lu";
import HeroSwiper from "./hero-swiper";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface IHeroSectionProps {
  categories:
    | (Category & { subCategories: SubCategory[] | null })[]
    | undefined;
}

const BANNER_IMAGES = [
  {
    url: "/images/banner-1.webp",
  },
  {
    url: "/images/banner1.webp",
  },
  {
    url: "/images/banner2.webp",
  },
  {
    url: "/images/banner3.webp",
  },
  {
    url: "/images/banner4.webp",
  },
];

const HeroSection = ({ categories }: IHeroSectionProps) => {
  const [hoveredCategory, setHoveredCategory] = useState("");

  return (
    <>
      {/* Categories Section */}
      <div className="flex items-start justify-between gap-8 h-[24rem]">
        <ul className="max-lg:hidden lg:flex flex-col items-center justify-start gap-4 h-full lg:w-[20%]">
          {categories?.map((category, index) => {
            return (
              <li
                key={index}
                className="w-full relative"
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory("")}
              >
                <Link
                  href={`/category/${category.slug}`}
                  className="w-full flex gap-4 items-center justify-between cursor-pointer font-medium hover:text-muted-foreground"
                >
                  <p>{category.name}</p>
                  {category.subCategories &&
                    category.subCategories.length > 0 && (
                      <LuChevronRight className="h-4 w-4 mt-1" />
                    )}
                </Link>

                {/* Subcategories */}
                {category.subCategories &&
                  category.subCategories.length > 0 && (
                    <div
                      className={cn(
                        "bg-white border border-border rounded-md p-4 absolute left-0 md:left-[10rem] md:min-h-[3rem] flex items-start justify-center flex-col top-0 z-40 duration-300",
                        hoveredCategory === category.id
                          ? "pointer-events-auto opacity-100 min-w-[15rem] w-full"
                          : "pointer-events-none opacity-0 max-w-0 w-0 min-w-0"
                      )}
                    >
                      {category.subCategories?.map((subCategory) => (
                        <Link
                          href={`/category/${category.slug}/${subCategory.slug}`}
                          key={subCategory.id}
                          className="flex items-start gap-2 p-2"
                        >
                          <div>{subCategory.name}</div>
                        </Link>
                      ))}
                    </div>
                  )}
              </li>
            );
          })}
        </ul>

        {/* Seperator */}
        <div className="max-lg:hidden h-full w-[1px] bg-border mr-8" />

        {/* Hero Banner */}
        <HeroSwiper className="lg:mr-0 w-full">
          {BANNER_IMAGES.map((img, index) => (
            <Image
              key={index}
              src={img.url}
              alt="Hero-banner"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw"
              loading="eager"
              aria-hidden="true"
            />
          ))}
        </HeroSwiper>
      </div>

      {/* Slider Hero Banner */}
    </>
  );
};

export default HeroSection;
