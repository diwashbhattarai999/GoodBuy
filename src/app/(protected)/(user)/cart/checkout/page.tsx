import MaxWidthContainer from "@/components/max-width-container";
import Breadcrumbs from "@/components/product/bread-crumbs";
import Checkout from "@/components/sections/cart/Checkout";
import { getShippingAddressByUserId } from "@/data/user/shippingAddress";
import { currentUser } from "@/lib/auth";

const CheckoutPage = async () => {
  const user = await currentUser();
  const shippingAddress = await getShippingAddressByUserId(user?.id as string);

  return (
    <MaxWidthContainer>
      <Breadcrumbs
        activeClasses="text-accent"
        containerClasses="flex mb-6"
        listClasses="hover:underline font-bold"
        capitalizeLinks
      />
      <Checkout shippingAddress={shippingAddress} />
    </MaxWidthContainer>
  );
};

export default CheckoutPage;
