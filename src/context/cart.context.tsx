"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { ICartItem } from "@/../product";
import toast from "react-hot-toast";
import {
  addCartItem,
  clearCartItem,
  deleteCartItem,
  getAllCartItems,
} from "@/actions/cart";
import { useCurrentUser } from "@/hooks/use-current-user";

interface CartContextType {
  cartItems: ICartItem[];
  addToCart: (subProductId: string) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: (cartItemId: string) => void;
  loading: boolean;
  loadingItems: string[];
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  loading: false,
  loadingItems: [],
});

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingItems, setLoadingItems] = useState<string[]>([]);

  const user = useCurrentUser();

  useEffect(() => {
    if (user) {
      setLoading(true);

      getAllCartItems()
        .then((cartItems) => {
          setCartItems(cartItems || []);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [user]);

  const addToCart = async (subProductId: string) => {
    try {
      setLoadingItems((prev) => [...prev, subProductId]);

      const data = await addCartItem(subProductId);
      if (data.success) {
        toast.success(data.success);

        const updatedCartItems = await getAllCartItems();
        setCartItems(updatedCartItems || []);
      } else if (data.error) {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingItems((prev) => prev.filter((id) => id !== subProductId)); // Reset loading state after adding the item
    }
  };

  const removeFromCart = async (subProductId: string) => {
    try {
      setLoading(true);
      const data = await deleteCartItem(subProductId);
      if (data.success) {
        toast.success(data.success);

        const updatedCartItems = await getAllCartItems();
        setCartItems(updatedCartItems || []);
        setLoading(false);
      } else if (data.error) {
        toast.error(data.error);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const clearCart = async (subProductId: string) => {
    try {
      setLoading(false);
      const data = await clearCartItem(subProductId);
      if (data.success) {
        toast.success(data.success);

        const updatedCartItems = await getAllCartItems();
        setCartItems(updatedCartItems || []);
        setLoading(false);
      } else if (data.error) {
        toast.error(data.error);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        loading,
        loadingItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
