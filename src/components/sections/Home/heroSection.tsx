import Image from "next/image";
import { LuChevronRight } from "react-icons/lu";

type CategoriesType = {
  label: string;
  SUB_CATEGORIES?: {};
}[];

const CATEGORIES: CategoriesType = [
  {
    label: "Women's Fashion",
    SUB_CATEGORIES: {},
  },
  {
    label: "Men's Fashion",
    SUB_CATEGORIES: {},
  },
  {
    label: "Electronics",
  },
  {
    label: "Home & Lifestyle",
  },
  {
    label: "Medicine",
  },
  {
    label: "Sports & Outdoor",
  },
  {
    label: "Baby's & Toys",
  },
  {
    label: "Groceries & Pets",
  },
  {
    label: "Health & Beauty",
  },
];

const HeroSection = () => {
  return (
    <>
      {/* Categories Section */}
      <div className="flex items-start justify-between gap-8 lg:h-[18rem]">
        <ul className="hidden lg:flex flex-col justify-between h-full">
          {CATEGORIES.map((category, index) => {
            return (
              <li
                key={index}
                className="w-full flex gap-4 items-center justify-between cursor-pointer font-medium hover:text-muted-foreground"
              >
                <p>{category.label}</p>
                {category.SUB_CATEGORIES && (
                  <LuChevronRight className="h-4 w-4 mt-1" />
                )}
              </li>
            );
          })}
        </ul>

        <div className="max-lg:hidden h-full w-[1px] bg-border" />

        <Image
          src="/images/hero-banner.png"
          alt="Hero-banner"
          width={1000}
          height={1000}
          priority
          className="w-full lg:w-[70%] h-full"
        />
      </div>

      {/* Slider Hero Banner */}
    </>
  );
};

export default HeroSection;
