import Cart from "@/components/sections/Cart";
import MaxWidthContainer from "@/components/max-width-container";
import Breadcrumbs from "@/components/product/bread-crumbs";

const CartPage = async () => {
  return (
    <MaxWidthContainer>
      <Breadcrumbs
        activeClasses="text-accent"
        containerClasses="flex mb-6"
        listClasses="hover:underline font-bold"
        capitalizeLinks
      />
      <Cart />
    </MaxWidthContainer>
  );
};

export default CartPage;
