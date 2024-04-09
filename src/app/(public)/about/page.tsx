import Image from "next/image";
import { GiDoughRoller } from "react-icons/gi";
import { LuDollarSign, LuShoppingBag, LuStore } from "react-icons/lu";

import { cn } from "@/lib/utils";

import AnimationWrapper from "@/components/animations/page-animation";
import MaxWidthContainer from "@/components/max-width-container";
import Carousel from "@/components/swiper";
import Services from "@/components/sections/Services";

const ABOUT_INFOS = [
  {
    icon: LuStore,
    number: "10.5K",
    desc: "Sellers active on our platform",
  },
  {
    icon: LuDollarSign,
    number: "33K",
    desc: "Monthly Product Sales",
  },
  {
    icon: LuShoppingBag,
    number: "45.5K",
    desc: "Active Customers on our platform",
  },
  {
    icon: GiDoughRoller,
    number: "25K",
    desc: "Annual Gross Sales on our platform",
  },
];

const ABOUT_TEAMS = [
  {
    image: "/images/team1.webp",
    name: "Alice Johnson",
    position: " Senior Software Engineer",
  },
  {
    image: "/images/team2.webp",
    name: "David Smith",
    position: "Data Scientist",
  },
  {
    image: "/images/team3.webp",
    name: "Sarah Patel",
    position: "Product Manager",
  },
  {
    image: "/images/team1.webp",
    name: "Alice Johnson",
    position: " Senior Software Engineer",
  },
  {
    image: "/images/team2.webp",
    name: "David Smith",
    position: "Data Scientist",
  },
  {
    image: "/images/team3.webp",
    name: "Sarah Patel",
    position: "Product Manager",
  },
];

const AboutPage = () => {
  return (
    <AnimationWrapper>
      <MaxWidthContainer className="mt-5" aria-label="About Page">
        {/* Hero section */}
        <div className="relative flex max-md:flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full md:w-[55%]">
            <h1 className="mb-8 text-4xl lg:text-5xl font-bold text-foreground">
              Welcome to Good Buy
            </h1>
            <p className="mb-3 text-sm font-medium text-secondary-foreground">
              {` Good Buy is not just another online marketplace; it's an ecosystem
              designed to revolutionize the way you shop and sell online. We
              bring together buyers and sellers from all over the world,
              offering a vast array of products and services to meet every need
              and desire.`}
            </p>
            <p className="mb-3 text-sm font-medium text-secondary-foreground">
              {`At Good Buy, we prioritize user experience, ensuring that both
              buyers and sellers have a seamless and enjoyable experience on our
              platform. Whether you're looking for the latest fashion trends,
              electronics, home decor, or anything in between, you'll find it
              all at Good Buy.`}
            </p>
          </div>

          <div className="w-full md:w-[45%] md:max-w-[36rem] h-[32rem] relative flex items-center justify-center">
            <Image
              src="/images/about.jpg"
              alt="About"
              width={500}
              height={500}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="eager"
              className="object-contain"
              priority
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 lg:gap-24 my-16 text-center">
          {ABOUT_INFOS.map((info, index) => (
            <div
              key={index}
              className={cn(
                "border border-border flex flex-col gap-3 p-4 items-center justify-center rounded-md group hover:bg-accent/80 shadow-sm hover:shadow-md cursor-pointer duration-300",
                index === 1 && "bg-accent/80 shadow-md"
              )}
              aria-label={info.desc}
            >
              <div
                className={cn(
                  "ring-secondary-foreground/60 ring-8 bg-foreground text-primary rounded-full flex items-center justify-center p-2 group-hover:bg-background group-hover:ring-secondary-foreground/30 group-hover:text-primary-foreground mt-2",
                  index === 1 &&
                    "bg-background ring-secondary-foreground/30 text-primary-foreground"
                )}
              >
                <info.icon className="rounded-full size-7 p-1" />
              </div>
              <h2
                className={cn(
                  "text-xl font-semibold text-foreground group-hover:text-background",
                  index === 1 && "text-background"
                )}
              >
                {info.number}
              </h2>
              <p
                className={cn(
                  "text-sm text-secondary-foreground group-hover:text-secondary",
                  index === 1 && "text-secondary"
                )}
              >
                {info.desc}
              </p>
            </div>
          ))}
        </div>
        {/* Teams */}
        <div className="my-24" aria-label="Our Teams">
          <h2 className="text-primary-foreground font-bold text-3xl mb-8">
            Our <span className="text-accent">Teams</span>
          </h2>
          <Carousel className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-24 text-center ">
            {ABOUT_TEAMS.map((team, index) => (
              <div
                key={index}
                className="border border-border flex flex-col gap-3 rounded-md shadow-sm py-6 mb-12"
                role="group"
                aria-label={`${team.name}, ${team.position}`}
              >
                <div className="h-80 relative">
                  <Image
                    src={team.image}
                    alt={team.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain"
                    loading="eager"
                    priority
                  />
                </div>
                <div className="h-fit">
                  <h2 className="text-2xl font-semibold text-foreground">
                    {team.name}
                  </h2>
                  <p className="text-base text-secondary-foreground">
                    {team.position}
                  </p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        {/* Service */}
        <Services />
      </MaxWidthContainer>
    </AnimationWrapper>
  );
};

export default AboutPage;
