"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgMenuRight, CgClose } from "react-icons/cg";

import { logout } from "@/actions/logout";

import { NAV_LINKS } from "@/constants";

import useOnClickOutside from "@/hooks/use-on-click-outside";
import { useCurrentUser } from "@/hooks/use-current-user";

import Container from "@/components/max-width-container";
import MobileMenu from "@/components/ui/mobile-menu";

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const pathname = usePathname().split("/")[1];
  console.log(pathname);

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
    <nav
      ref={navRef}
      className="h-[62px] border-b border-b-border backdrop-blur dark:bg-[#070707]/90 bg-[#fcfcfc]/90  fixed w-full top-0 z-40"
    >
      <Container className="flex items-center justify-between h-full">
        <Link
          href="/"
          className="text-3xl font-bold tracking-tight text-foreground hover:text-primary-foreground"
        >
          Good Buy
        </Link>

        <div className="flex gap-16 text-sm font-medium max-md:hidden lg:gap-24">
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
                  className="p-2 font-semibold transition duration-300 ease-linear rounded-md cursor-pointer hover:bg-muted"
                >
                  SignOut
                </div>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    href="/login"
                    className="p-2 font-semibold transition duration-300 ease-linear rounded-md hover:bg-muted"
                  >
                    SignIn
                  </Link>
                </li>

                <li>
                  <Link
                    href="/register"
                    className="p-2 font-semibold transition duration-300 ease-linear rounded-md hover:bg-muted"
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
              <Link
                href="/login"
                className="p-2 font-semibold transition duration-300 ease-linear rounded-md hover:bg-muted"
              >
                Search
              </Link>
            </li>

            <li>
              <Link
                href="/login"
                className="p-2 font-semibold transition duration-300 ease-linear rounded-md hover:bg-muted"
              >
                WishList
              </Link>
            </li>

            <li>
              <Link
                href="/login"
                className="p-2 font-semibold transition duration-300 ease-linear rounded-md hover:bg-muted"
              >
                Cart
              </Link>
            </li>
          </ul>

          <div
            className="z-50 flex flex-col gap-1 px-2 py-1 duration-300 rounded-sm cursor-pointer md:hidden hover:bg-muted"
            onClick={handleMenu}
          >
            {isMenuOpen ? <CgClose size={24} /> : <CgMenuRight size={24} />}
          </div>

          <MobileMenu
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            pathname={pathname}
          />
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
