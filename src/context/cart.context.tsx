"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { CustomProduct } from "@/../product";
import toast from "react-hot-toast";
import { addCartItem, clearCartItem, deleteCartItem, getAllCartItems } from "@/actions/cart";
import { CartItem } from "@prisma/client";

export interface CartItemWithProduct extends CartItem {
  product: CustomProduct;
}

interface CartContextType {
  cartItems: CartItemWithProduct[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: (productId: string) => void;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([]);

  useEffect(() => {
    getAllCartItems().then((cartItems) => {
      setCartItems(cartItems || []);
    });
  }, []);

  const addToCart = async (productId: string) => {
    try {
      const data = await addCartItem(productId);
      if (data.success) {
        toast.success(data.success);

        const updatedCartItems = await getAllCartItems();
        setCartItems(updatedCartItems || []);
      } else if (data.error) {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const data = await deleteCartItem(productId);
      if (data.success) {
        toast.success(data.success);

        const updatedCartItems = await getAllCartItems();
        setCartItems(updatedCartItems || []);
      } else if (data.error) {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearCart = async (productId: string) => {
    try {
      const data = await clearCartItem(productId);
      if (data.success) {
        toast.success(data.success);

        const updatedCartItems = await getAllCartItems();
        setCartItems(updatedCartItems || []);
      } else if (data.error) {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
