import { FaHeadphones } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { SiAdguard } from "react-icons/si";

const SERVICES = [
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

const Services = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-24 my-16 text-center">
        {SERVICES.map((info, index) => (
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

export default Services;
