"use client";

import Image from "next/image";
import Link from "next/link";
import { TbMinus, TbPlus } from "react-icons/tb";
import { BsTrash } from "react-icons/bs";

import Button from "@/components/ui/Button";
import { useCart } from "@/context/cart.context";
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
import { useState } from "react";
import Loader from "../../loader";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, clearCart, loading } =
    useCart();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const totalCartPrice = cartItems.reduce((total, item) => {
    const itemPrice =
      item.product.subProducts[0].sizes[0].price * item.quantity;
    return total + itemPrice;
  }, 0);

  const selectedItemsSubtotal = cartItems.reduce((total, item) => {
    if (selectedItems.includes(item.product.id)) {
      const itemPrice =
        item.product.subProducts[0].sizes[0].price * item.quantity;
      return total + itemPrice;
    }
    return total;
  }, 0);

  const selectedItemsTotalShipping = cartItems.reduce((total, item) => {
    if (selectedItems.includes(item.product.id)) {
      const itemShipping = item.product.shipping;
      return total + itemShipping;
    }
    return total;
  }, 0);

  const selectedItemsTotalPrice =
    selectedItemsSubtotal + selectedItemsTotalShipping;

  const handleCheckboxChange = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
      setSelectAll(false);
    } else {
      setSelectedItems([...selectedItems, itemId]);
      if (selectedItems.length + 1 === cartItems.length) {
        setSelectAll(true);
      }
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allItemIds = cartItems.map((item) => item.product.id);
      setSelectedItems(allItemIds);
    } else {
      setSelectedItems([]);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {cartItems.length <= 0 ? (
        <div className="w-full flex flex-col items-center justify-center gap-6">
          <Image
            src="/images/no-cart.jpg"
            alt="no-cart"
            width={400}
            height={400}
            className=""
          />
          <p>Cart is Empty</p>

          {/* // TODO: add link to all products  */}
          <Link href="/">
            <Button>Browse products</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-semibold mt-4 mb-8">
              Items Summary - {cartItems.length} items in your cart
            </h1>
          </div>
          <Table className="overflow-x-auto ">
            <TableCaption>A list of your cart items.</TableCaption>
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
              {cartItems.slice(0, 2).map((item, i) => (
                <TableRow
                  key={item.product.id}
                  onClick={() => handleCheckboxChange(item.product.id)}
                >
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.product.id)}
                      onChange={() => handleCheckboxChange(item.product.id)}
                      className="w-4 h-4"
                    />
                  </TableCell>
                  <TableCell colSpan={2} className="font-medium">
                    <div className="flex items-center gap-4">
                      <Image
                        src={item.product.subProducts[0].images[0].url}
                        alt={item.product.name}
                        width={40}
                        height={40}
                      />

                      <div>
                        <p className="text-lg text-muted-foreground">
                          {item.product.name}
                        </p>
                        <p className="text-muted-foreground/70">
                          {item.product.shipping === 0
                            ? "Free Delivery"
                            : `Rs. ${item.product.shipping} Shipping Fee`}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    Rs. {item.product.subProducts[0].sizes[0].price}
                  </TableCell>

                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        onClick={() => addToCart(item.productId)}
                        icon
                        className="border border-border rounded-md px-2 py-1 hover:text-muted-foreground"
                      >
                        <TbPlus />
                      </Button>
                      <span className="my-[2px] px-4 py-1">
                        {item.quantity}
                      </span>
                      <Button
                        onClick={() => removeFromCart(item.id)}
                        icon
                        className="border border-border rounded-md px-2 py-1 hover:text-muted-foreground"
                      >
                        <TbMinus />
                      </Button>
                    </div>
                  </TableCell>

                  <TableCell>
                    Total: Rs.
                    {item.product.subProducts[0].sizes[0].price * item.quantity}
                  </TableCell>
                  <TableCell className="text-right">
                    <BsTrash
                      className="pl-auto ml-2 text-destructive w-full min-w-5 h-5 cursor-pointer hover:text-destructive/70"
                      onClick={() => clearCart(item.id)}
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

          <div className="flex flex-col md:flex-row items-start justify-between gap-4">
            <div className="flex gap-4 max-md:w-full max-md:justify-between">
              <input
                placeholder="Coupen Code"
                className="h-full w-full py-3 px-2 md:min-w-[300px] bg-transparent border rounded-md text-primary-foreground placeholder:text-secondary-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button className="w-56">Apply Coupen</Button>
            </div>

            <div className="border border-foreground shadow-md p-4 rounded-md text-left w-full md:w-[500px]">
              <h3 className="text-lg font-semibold">Cart Total</h3>

              <div className="text-lg text-primary-foreground flex gap-4 justify-between items-center mt-4 pb-4 border-b border-border">
                <p>Subtotal</p>
                Rs. {selectedItemsSubtotal}
              </div>

              <div className="text-lg text-primary-foreground flex gap-4 justify-between items-center mt-4 pb-4 border-b border-border">
                <p>Shipping</p>
                Rs. {selectedItemsTotalShipping}
              </div>

              <div className="text-lg font-semibold text-primary-foreground flex gap-4 justify-between items-center mt-4 pb-4">
                <p>Total</p>
                Rs. {selectedItemsTotalPrice}
              </div>

              <Link
                href={{
                  pathname: "/cart/checkout",
                  query: {
                    checkoutItems: selectedItems.join(","),
                    total: selectedItemsTotalPrice,
                    subtotal: selectedItemsSubtotal,
                    shipping: selectedItemsTotalShipping,
                  },
                }}
              >
                <Button
                  className="mt-4 p-3"
                  disabled={selectedItems.length <= 0}
                >
                  Proceed to checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
