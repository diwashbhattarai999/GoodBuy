import Image from "next/image";
import SectionHeader from "./section-header";

const Featured = () => {
  return (
    <div>
      <div className="my-28">
        <SectionHeader label="Featured" subLabel="New Arrival" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative mt-8 min-h-[40rem]">
          {/* Large image on the left */}
          <div className="relative h-full rounded-md max-md:h-[28rem]">
            <Image
              src="/images/featured-pc.webp"
              alt="Frost PC"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
              className="object-cover rounded-md"
            />
            <div className="absolute inset-0 bg-accent/50 rounded-md"></div>
            <div className="absolute bottom-0 left-0 p-8 text-primary max-w-md">
              <h1 className="text-xl font-semibold">Frost Gaming PC</h1>
              <p className="text-base font-medium">
                The Frost Gaming PC provides superb performance and tech,
                starting with an NVIDIA GeForce RTX 4060 & 16GB RAM.
              </p>
              <h2 className="py-2 border-b border-secondary w-fit cursor-pointer hover:text-secondary duration-300">
                Shop Now
              </h2>
            </div>
          </div>

          {/* Two images stacked vertically on the right */}
          <div className="grid grid-cols-1 gap-4">
            <div className="rounded-md overflow-hidden shadow-input relative w-full max-md:h-[32rem]">
              <Image
                src="/images/men's-fashion-2.webp"
                alt="Frost PC"
                className="object-cover object-right-top"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
              />
              <div className="absolute inset-0 bg-accent/50 rounded-md"></div>
              <div className="absolute bottom-0 right-0 text-right p-8 text-primary max-w-md">
                <h1 className="text-xl font-semibold">{`Men's Collection`}</h1>
                <p className="text-base font-medium">
                  {`Explore our latest collection of men's fashion, featuring
                    premium quality clothing and accessories designed to elevate
                    your style.`}
                </p>
                <h2 className="py-2 border-b border-secondary w-fit ml-auto cursor-pointer hover:text-secondary duration-300">
                  Shop Now
                </h2>
              </div>
            </div>

            {/* Two images stacked vertically on the right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-md overflow-hidden shadow-input relative w-full max-md:h-[28rem]">
                <Image
                  src="/images/headphones.webp"
                  alt="Frost PC"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-accent/50 rounded-md"></div>
                <div className="absolute bottom-0 left-0 p-8 text-primary max-w-md">
                  <h1 className="text-xl font-semibold">Wireless Headphones</h1>
                  <p className="text-base font-medium">
                    Superior Sound Quality
                  </p>
                  <h2 className="py-2 border-b border-secondary w-fit cursor-pointer hover:text-secondary duration-300">
                    Shop Now
                  </h2>
                </div>
              </div>
              <div className="rounded-md overflow-hidden shadow-input relative w-full max-md:h-[28rem]">
                <Image
                  src="/images/travel-backpack.webp"
                  alt="Frost PC"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-accent/50 rounded-md"></div>
                <div className="absolute bottom-0 left-0 p-8 text-primary max-w-md">
                  <h1 className="text-xl font-semibold">Travel Backpack</h1>
                  <p className="text-base font-medium">
                    Durable and Comfortable
                  </p>
                  <h2 className="py-2 border-b border-secondary w-fit cursor-pointer hover:text-secondary duration-300">
                    Shop Now
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
