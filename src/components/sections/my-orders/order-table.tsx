"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsTrash } from "react-icons/bs";

import Button from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loader from "../../loader";
import { Order, ShippingAdress } from "@prisma/client";
import { CustomSubProduct } from "@/../product";

interface IOrders extends Order {
  subProduct: CustomSubProduct;
  shippingAddress: ShippingAdress;
}

interface IOrderTableProps {
  orders: IOrders[] | null;
}

const OrderTable = ({ orders }: IOrderTableProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  if (!orders) return <Loader />;

  const totalCartPrice = orders?.reduce((total, item) => {
    const itemPrice = item.subProduct.sizes[0].price * item.quantity;
    return total + itemPrice + item.subProduct.product.shipping;
  }, 0);

  const selectedItemsSubtotal = orders?.reduce((total, item) => {
    if (selectedItems.includes(item.subProductId)) {
      const itemPrice = item.subProduct.sizes[0].price * item.quantity;
      return total + itemPrice;
    }
    return total;
  }, 0);

  const selectedItemsTotalShipping = orders?.reduce((total, item) => {
    if (selectedItems.includes(item.subProductId)) {
      const itemShipping = item.subProduct.product.shipping;
      return total + itemShipping;
    }
    return total;
  }, 0);

  const selectedItemsTotalPrice =
    (selectedItemsSubtotal as number) +
      (selectedItemsTotalShipping as number) ?? 0;

  const handleCheckboxChange = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
      setSelectAll(false);
    } else {
      setSelectedItems([...selectedItems, itemId]);
      if (selectedItems.length + 1 === orders?.length) {
        setSelectAll(true);
      }
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allItemIds = orders?.map((order) => order.subProductId) ?? [];
      setSelectedItems(allItemIds);
    } else {
      setSelectedItems([]);
    }
  };

  console.log(orders);

  return (
    <>
      {orders.length <= 0 ? (
        <div className="w-full flex flex-col items-center justify-center">
          <Image
            src="/images/ordernow.svg"
            alt="no-cart"
            width={400}
            height={400}
          />
          <div className="-mt-10 flex flex-col items-center justify-center gap-2">
            <p>No Orders made.</p>

            <Link href="/cart">
              <Button className="w-52">Go to Cart</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-semibold mt-4 mb-8">
              Order Items Summary - {orders?.length}{" "}
              {orders?.length === 1 ? "item" : "items"}
            </h1>
          </div>
          <Table className="overflow-x-auto ">
            <TableCaption>A list of your ordered items.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left" onClick={handleSelectAll}>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectAll}
                    className="w-4 h-4"
                  />
                </TableHead>
                <TableHead colSpan={2}>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Subtotal</TableHead>
                <TableHead className="text-right">Delete Items</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((item) => (
                <TableRow
                  key={item.id}
                  onClick={() => handleCheckboxChange(item.subProductId)}
                >
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.subProductId)}
                      onChange={() => handleCheckboxChange(item.subProductId)}
                      className="w-4 h-4"
                    />
                  </TableCell>
                  <TableCell colSpan={2} className="font-medium">
                    <div className="flex items-center gap-4">
                      <Image
                        src={item.subProduct.images[0].url}
                        alt={item.subProduct.product.name}
                        width={40}
                        height={40}
                      />

                      <div>
                        <p className="text-lg text-muted-foreground">
                          {item.subProduct.product.name}
                        </p>
                        <p className="text-muted-foreground/70">
                          {item.subProduct.product.shipping === 0
                            ? "Free Delivery"
                            : `Rs. ${item.subProduct.product.shipping} Shipping Fee`}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>Rs. {item.subProduct.sizes[0].price}</TableCell>

                  <TableCell>{item.quantity}</TableCell>

                  <TableCell>
                    Rs.
                    {item.subProduct.sizes[0].price * item.quantity}
                  </TableCell>
                  <TableCell className="text-right w-full min-h-full mt-6 flex items-center justify-end">
                    <BsTrash
                      className="text-destructive w-5 h-5 cursor-pointer hover:text-destructive/70"
                      onClick={() => {}}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={6}>Total</TableCell>
                <TableCell colSpan={2} className="text-right">
                  Rs. {totalCartPrice}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>

          <Button className="bg-transparent border-2 border-border rounded-md text-foreground">
            Return to Home
          </Button>
        </div>
      )}
    </>
  );
};

export default OrderTable;
