import { NAV_LINKS } from "@/constants";
import Link from "next/link";

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pathname: string;
}

const MobileMenu = ({
  isMenuOpen,
  setIsMenuOpen,
  pathname,
}: MobileMenuProps) => {
  return (
    <div
      className={`
        absolute top-0 right-0 border-l border-l-border backdrop-blur-lg bg-background opacity-[.98] py-16 px-8 h-screen w-[65%] md:hidden transition-all ease duration-500 z-20 shadow-md
        ${isMenuOpen ? "translate-x-0" : "translate-x-[100vw]"} 
    `}
    >
      <ul className="flex flex-col items-center justify-center gap-4 h-1/2">
        {NAV_LINKS.map((link) => {
          return (
            <li
              key={link.label + link.path}
              onClick={() => {
                setIsMenuOpen(false);
              }}
            >
              <Link
                href={link.path}
                className={`p-2 rounded-md hover:text-secondary-foreground transition ease-linear duration-300 ${
                  `/${pathname}` === link.path.toLowerCase() && "bg-muted"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <p className="p-2 text-center duration-300 border rounded-md cursor-pointer bg-accent border-accent hover:bg-muted">
        Resume
      </p>
    </div>
  );
};

export default MobileMenu;
