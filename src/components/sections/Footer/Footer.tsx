import { Fira_Sans } from "next/font/google";

import Container from "@/components/max-width-container";
import FooterSection from "./footer-section";
import {
  INFORMATION,
  POPULAR_CATEGORIES,
  PRODUCT_CATEGORIES,
  SOCIALS,
} from "./footer-data";

const font = Fira_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

const Footer = () => {
  return (
    <footer className={font.className}>
      <div className="mt-8 border-t shadow-sm border-t-border bg-foreground text-background">
        <Container className="flex flex-col py-6 text-xs max-sm:flex-col max-sm:gap-2 md:text-sm">
          <div className="lg:flex lg:justify-between">
            <FooterSection
              title="Product Categories"
              data={PRODUCT_CATEGORIES}
            />
            <FooterSection
              title="Popular Categories"
              data={POPULAR_CATEGORIES}
            />
            <FooterSection title="Information" data={INFORMATION} />
            <FooterSection title="Socials" data={SOCIALS} />
          </div>

          <hr className="opacity-30 " />

          <div className="flex items-center justify-center gap-4 mt-4">
            <p>All Rights Reserved &copy; 2024</p>
            <p>
              Developed By <span className="text-accent">Diwash Bhattarai</span>
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
