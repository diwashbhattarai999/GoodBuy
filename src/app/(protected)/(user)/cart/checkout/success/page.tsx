import MaxWidthContainer from "@/components/max-width-container";
import Breadcrumbs from "@/components/product/bread-crumbs";
import CheckoutSuccess from "@/components/sections/cart/CheckoutSuccess";

const CheckoutSuccessPage = () => {
  return (
    <MaxWidthContainer>
      <Breadcrumbs
        activeClasses="text-accent"
        containerClasses="flex mb-6"
        listClasses="hover:underline font-bold"
        capitalizeLinks
      />
      <CheckoutSuccess />
    </MaxWidthContainer>
  );
};

export default CheckoutSuccessPage;
