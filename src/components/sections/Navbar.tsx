"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgMenuRight, CgClose } from "react-icons/cg";
import { LuHeart, LuSearch, LuShoppingCart } from "react-icons/lu";

import { logout } from "@/actions/logout";

import { NAV_LINKS } from "@/constants";

import useOnClickOutside from "@/hooks/use-on-click-outside";
import { useCurrentUser } from "@/hooks/use-current-user";

import { cn } from "@/lib/utils";

import MaxWidthContainer from "@/components/max-width-container";
import MobileMenu from "@/components/ui/mobile-menu";
import UserProfile from "@/components/user-profile/user-profile";
import NavBanner from "@/components/sections//Banner";
import { useCart } from "@/context/cart.context";
import Button from "../ui/Button";

interface NavbarProps {
  showNavBanner?: boolean;
}

const Navbar = ({ showNavBanner }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname().split("/")[1];

  const { cartItems } = useCart();

  const handleMenu = () => {
    setIsMenuOpen((currentValue) => !currentValue);
  };

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isMenuOpen]);

  useOnClickOutside(menuRef, () => {
    setIsMenuOpen(false);
  });

  const user = useCurrentUser();

  const totalCartPrice = cartItems.reduce((total, item) => {
    const itemPrice =
      item.product.subProducts[0].sizes[0].price * item.quantity;
    return total + itemPrice;
  }, 0);

  return (
    <nav
      className=" border-b border-b-border/50 backdrop-blur dark:bg-background/90 bg-background/90 fixed w-full top-0 z-40"
      onMouseLeave={() => setShowCart(false)}
    >
      {showNavBanner && <NavBanner />}
      <MaxWidthContainer>
        <div className="py-4 w-full flex items-center justify-between">
          <Link
            href="/"
            className="text-3xl font-bold tracking-tight text-primary-foreground max-md:hidden"
          >
            Good <span className="text-accent">Buy</span>
          </Link>

          <Link
            href="/"
            className="text-3xl font-bold tracking-tight text-primary-foreground md:hidden"
          >
            G<span className="text-accent">B</span>
          </Link>

          <div className="hidden md:flex gap-16 text-sm font-medium lg:gap-24">
            <ul className="flex items-center justify-between gap-4">
              {NAV_LINKS.map((link) => {
                return (
                  <li key={link.label + link.path}>
                    <Link
                      href={link.path}
                      className={`p-2 rounded-md hover:bg-muted transition ease-linear duration-300 ${
                        `/${pathname}` === link.path.toLowerCase() && "bg-muted"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              {user ? (
                <li>
                  <div
                    onClick={() => logout()}
                    className="p-2 transition duration-300 ease-linear rounded-md cursor-pointer hover:bg-muted"
                  >
                    SignOut
                  </div>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      href="/login"
                      className={`p-2 rounded-md hover:bg-muted transition ease-linear duration-300 ${
                        `/${pathname}` === "/login" && "bg-muted"
                      }`}
                    >
                      SignIn
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/register"
                      className={`p-2 rounded-md hover:bg-muted transition ease-linear duration-300  ${
                        `/${pathname}` === "/register" && "bg-muted"
                      }`}
                    >
                      SignUp
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="z-50 flex items-center gap-4" ref={menuRef}>
            <ul className="flex items-center justify-between gap-4">
              <li>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    className="w-60 py-1 pl-8 pr-2 bg-transparent border rounded-md text-primary-foreground placeholder:text-secondary-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50 border-input focus:border-secondary-foreground max-lg:hidden"
                  />
                  <LuSearch className="lg:absolute lg:left-2 lg:top-2 lg:pointer-events-none max-lg:h-10 h-4 w-10 lg:w-4 text-secondary-foreground max-lg:cursor-pointer p-2 lg:p-0 max-lg:hover:bg-muted max-lg:rounded-full max-lg:duration-300" />
                </div>
              </li>

              <li>
                <Link href="/wishlist">
                  <LuHeart className="w-10 h-10 rounded-full p-2 hover:bg-muted duration-300" />
                </Link>
              </li>

              <li className="relative" onMouseOver={() => setShowCart(true)}>
                <Link href="/cart">
                  <LuShoppingCart className="w-10 h-10 p-2" />
                </Link>

                <div className="absolute -top-1 -right-2 font-semibold bg-accent text-accent-foreground p-1 rounded-full h-6 min-w-6 flex items-center justify-center">
                  {cartItems.length}
                </div>

                <div
                  className={cn(
                    "hidden md:block bg-background p-4 rounded-md absolute top-12 shadow-md border border-border right-0 duration-300",
                    cartItems.length <= 0
                      ? "md:min-w-[300px]"
                      : "md:min-w-[400px]",
                    showCart
                      ? "translate-y-0 opacity-100 pointer-events-auto"
                      : "-translate-y-3 opacity-0 pointer-events-none"
                  )}
                >
                  {cartItems.length <= 0 ? (
                    <div className="flex flex-col items-center justify-center w-full gap-8">
                      <div className="w-full flex items-center justify-center gap-6">
                        <Image
                          src="/images/no-cart.jpg"
                          alt="no-cart"
                          width={100}
                          height={100}
                        />
                        <p className="text-lg font-medium text-muted-foreground">
                          Cart is Empty
                        </p>
                      </div>
                      {!user && (
                        <Link href="/login" className="w-full">
                          <Button full>Signin / Register</Button>
                        </Link>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <h1 className="font-semibold text-lg underline">
                        Cart Items
                      </h1>
                      {cartItems.slice(0, 2).map((item, i) => {
                        return (
                          <div
                            key={item.product.id}
                            className="bg-muted rounded-md px-2 py-4 border border-border"
                          >
                            <div className="flex items-center justify-between gap-4">
                              <Image
                                src={item.product.subProducts[0].images[0].url}
                                alt={item.product.name}
                                width={40}
                                height={40}
                              />
                              <div className="flex-1">
                                <p className="text-lg text-muted-foreground">
                                  {item.product.name}
                                </p>
                                <p className="text-lg  text-muted-foreground">
                                  Rs.{" "}
                                  {item.product.subProducts[0].sizes[0].price}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-lg  text-muted-foreground">
                                x {item.quantity}
                              </p>
                              <p className="text-lg font-medium text-muted-foreground">
                                Total: Rs.
                                {item.product.subProducts[0].sizes[0].price *
                                  item.quantity}
                              </p>
                            </div>
                          </div>
                        );
                      })}

                      <Link href="/cart" className="underline text-right">
                        See all
                      </Link>

                      <div className="flex justify-between items-center text-muted-foreground">
                        <span className="font-semibold text-lg">
                          Total Price:
                        </span>
                        <span className="font-medium text-base pr-[6px]">
                          Rs. {totalCartPrice}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </li>

              {user && <UserProfile />}
            </ul>

            <div
              className="px-2 py-1 duration-300 rounded-sm cursor-pointer md:hidden hover:bg-muted"
              onClick={handleMenu}
            >
              {isMenuOpen ? <CgClose size={24} /> : <CgMenuRight size={24} />}
            </div>

            <MobileMenu
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              pathname={pathname}
              user={user}
            />
          </div>
        </div>
      </MaxWidthContainer>
    </nav>
  );
};

export default Navbar;
