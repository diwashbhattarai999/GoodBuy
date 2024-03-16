import Button from "@/components/ui/Button";
import MaxWidthContainer from "../max-width-container";

const NavBanner = () => {
  return (
    <div className="bg-primary-foreground text-background py-2">
      <MaxWidthContainer>
        <div className="flex max-md:flex-col items-center justify-center md:gap-5">
          <h2>
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          </h2>
          <div className="border-b border-border cursor-pointer hover:text-muted-foreground">
            ShopNow
          </div>
        </div>
      </MaxWidthContainer>
    </div>
  );
};

export default NavBanner;
