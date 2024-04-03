"use client";

import Image from "next/image";

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
import { TbMinus, TbPlus } from "react-icons/tb";
import { BsTrash } from "react-icons/bs";
import Link from "next/link";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();

  const totalCartPrice = cartItems.reduce((total, item) => {
    const itemPrice =
      item.product.subProducts[0].sizes[0].price * item.quantity;
    return total + itemPrice;
  }, 0);

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
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>A list of your cart items.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead colSpan={2}>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Subtotal</TableHead>
                <TableHead className="text-right">Delete Items</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartItems.slice(0, 2).map((item, i) => (
                <TableRow key={item.product.id}>
                  <TableCell colSpan={2} className="font-medium">
                    <div className="flex items-center gap-4">
                      <Image
                        src={item.product.subProducts[0].images[0].url}
                        alt={item.product.name}
                        width={40}
                        height={40}
                      />

                      <p className="text-lg text-muted-foreground">
                        {item.product.name}
                      </p>
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
                <TableCell colSpan={5}>Total</TableCell>
                <TableCell className="text-right">
                  Rs. {totalCartPrice}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      )}
    </>
  );
};

export default Cart;
