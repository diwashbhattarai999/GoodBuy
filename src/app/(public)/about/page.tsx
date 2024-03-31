import AnimationWrapper from "@/components/animations/page-animation";
import MaxWidthContainer from "@/components/max-width-container";
import BreadCrumbs from "@/components/product/bread-crumbs";
import Image from "next/image";
import { GiDoughRoller } from "react-icons/gi";
import { LuDollarSign, LuShoppingBag, LuStore } from "react-icons/lu";

const ABOUT_INFOS = [
  {
    icon: LuStore,
    number: "10.5K",
    desc: "Salers active in our site",
  },
  {
    icon: LuDollarSign,
    number: "33K",
    desc: "Monthly Product Sale",
  },
  {
    icon: LuShoppingBag,
    number: "45.5K",
    desc: "Customer active in our site",
  },
  {
    icon: GiDoughRoller,
    number: "25K",
    desc: "Annual gross sale in our site",
  },
];

const AboutPage = () => {
  return (
    <AnimationWrapper>
      <MaxWidthContainer className="mt-5">
        {/* BreadCrumbs */}
        {/* <BreadCrumbs /> */}
        {/* Hero section */}
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full basis-[55%]">
            <h1 className="mb-8 text-3xl font-bold text-foreground  w-full md:max-w-1/2">
              Our Story
            </h1>
            <p className="mb-3 text-sm font-medium text-secondary-foreground">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Similique, hic sapiente quaerat ut saepe doloribus itaque
              voluptatem, adipisci porro dolore libero, nulla culpa ratione
              inventore sunt omnis minus dignissimos sint explicabo possimus
              voluptatibus! Magnam saepe fugit autem laboriosam iusto quibusdam
              quis officiis unde illo. Maxime autem neque maiores rerum, officia
              quas, ipsum repellendus esse assumenda porro corrupti facilis.
            </p>
            <p className="mb-3 text-sm font-medium text-secondary-foreground">
              Facilis, molestias voluptatem animi laboriosam tenetur inventore
              facere corporis dolores qui, necessitatibus sint repellat.
              Accusantium dolore qui, velit voluptates, accusamus maiores culpa
              illo, eum molestias nihil facere aliquam unde. Sit quam debitis
              possimus quod repudiandae, id aspernatur, et ducimus hic
              reiciendis est.
            </p>
          </div>

          <div className="w-full basis-[45%] md:w-[36rem] h-[32rem]">
            <Image
              src="/images/no-image.png"
              alt="About"
              width={500}
              height={500}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        {/* Info */}

        <ul className="flex justify-between  flex-wrap gap-4 my-16">
          {ABOUT_INFOS.map((info, index) => {
            return (
              <li
                key={index}
                className="border border-border flex flex-col gap-3 p-4 items-center justify-center rounded-md group hover:bg-accent/80 hover:shadow-sm cursor-pointer duration-300"
              >
                <div className="ring-secondary-foreground/60 ring-8 bg-foreground text-primary rounded-full flex items-center justify-center p-2 group-hover:bg-background group-hover:ring-secondary-foreground/30 group-hover:text-primary-foreground">
                  <info.icon className="rounded-full size-7 p-1" />
                </div>
                <h2 className="text-xl font-semibold text-foreground group-hover:text-background">
                  {info.number}
                </h2>
                <p className="text-sm text-secondary-foreground group-hover:text-secondary">
                  {info.desc}
                </p>
              </li>
            );
          })}
        </ul>
        {/* Teams */}
        {/* Service */}
      </MaxWidthContainer>
    </AnimationWrapper>
  );
};

export default AboutPage;
