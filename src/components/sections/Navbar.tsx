"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgMenuRight, CgClose } from "react-icons/cg";
import { LuHeart, LuSearch, LuShoppingCart } from "react-icons/lu";

import { logout } from "@/actions/logout";

import { NAV_LINKS } from "@/constants";

import useOnClickOutside from "@/hooks/use-on-click-outside";
import { useCurrentUser } from "@/hooks/use-current-user";

import MaxWidthContainer from "@/components/max-width-container";
import MobileMenu from "@/components/ui/mobile-menu";
import UserProfile from "@/components/user-profile/user-profile";
import NavBanner from "@/components/sections//Banner";

interface NavbarProps {
  showNavBanner?: boolean;
}

const Navbar = ({ showNavBanner }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname().split("/")[1];

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

  return (
    <nav className=" border-b border-b-border/50 backdrop-blur dark:bg-background/70 bg-background/70 fixed w-full top-0 z-40">
      {showNavBanner && <NavBanner />}
      <MaxWidthContainer>
        <div className="py-4 w-full flex items-center justify-between">
          <Link
            href="/"
            className="text-3xl font-bold tracking-tight text-primary-foregroun"
          >
            Good <span className="text-accent">Buy</span>
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

              <li>
                <Link href="/cart">
                  <LuShoppingCart className="w-10 h-10 rounded-full p-2 hover:bg-muted duration-300" />
                </Link>
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
