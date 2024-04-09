import { Category, SubCategory } from "@prisma/client";
import Image from "next/image";
import { LuChevronRight } from "react-icons/lu";
import HeroSwiper from "./hero-swiper";

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
    url: "/images/banner-2.webp",
  },
  {
    url: "/images/banner-3.webp",
  },
  {
    url: "/images/banner-4.webp",
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
  return (
    <>
      {/* Categories Section */}
      <div className="flex items-start justify-between gap-8 h-[19rem]">
        <ul className="max-lg:hidden lg:flex flex-col items-center justify-between h-full lg:w-[20%]">
          {categories?.map((category, index) => {
            return (
              <li
                key={index}
                className="w-full flex gap-4 items-center justify-between cursor-pointer font-medium hover:text-muted-foreground"
              >
                <p>{category.name}</p>
                {category.subCategories &&
                  category.subCategories.length > 0 && (
                    <LuChevronRight className="h-4 w-4 mt-1" />
                  )}
              </li>
            );
          })}
        </ul>

        <div className="max-lg:hidden h-full w-[1px] bg-border mr-8" />

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
