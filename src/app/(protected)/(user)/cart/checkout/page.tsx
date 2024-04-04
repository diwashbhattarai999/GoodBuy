import MaxWidthContainer from "@/components/max-width-container";
import Breadcrumbs from "@/components/product/bread-crumbs";
import Checkout from "@/components/sections/cart/Checkout";

const CheckoutPage = async () => {
  return (
    <MaxWidthContainer>
      <Breadcrumbs
        activeClasses="text-accent"
        containerClasses="flex mb-6"
        listClasses="hover:underline font-bold"
        capitalizeLinks
      />
      <Checkout />
    </MaxWidthContainer>
  );
};

export default CheckoutPage;
