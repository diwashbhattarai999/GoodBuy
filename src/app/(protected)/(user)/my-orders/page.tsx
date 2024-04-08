import MaxWidthContainer from "@/components/max-width-container";
import OrderTable from "@/components/sections/my-orders/order-table";

import { getOrdersByUserId } from "@/data/user/order";
import { currentUser } from "@/lib/auth";

const MyOrdersPage = async () => {
  const user = await currentUser();

  const orders = await getOrdersByUserId(user?.id as string);

  return (
    <MaxWidthContainer>
      <OrderTable orders={orders} />
    </MaxWidthContainer>
  );
};

export default MyOrdersPage;
