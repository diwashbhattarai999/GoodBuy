"use client";

import Link from "next/link";
import { BsChevronRight } from "react-icons/bs";

import { CustomProductType } from "@/app/(public)/product/[productId]/page";

interface BreadCrumbsProps {
  product: CustomProductType;
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ product }) => {

  

  return (
    <div className="mb-2">
      <ul className="flex items-center gap-1 text-sm italic flex-wrap">
        {/* ----- */}
        <li className="flex items-center gap-2 capitalize">
          <Link href="/" className="text-secondary-color">
            Home
          </Link>
          <div className="flex items-center">
            <BsChevronRight size="14px" className="mt-[2px]" />
            <BsChevronRight size="14px" className="-ml-3 mt-[2px]" />
          </div>
        </li>

        {/* ----- */}
        {product?.category && (
          <li className="flex items-center gap-2 capitalize">
            <Link
              href="/categories/${product?.category?.slug}"
              className="text-secondary-color"
            >
              {product?.category?.name}
            </Link>
            <div className="flex items-center">
              <BsChevronRight size="14px" className="mt-[2px]" />
              <BsChevronRight size="14px" className="-ml-3 mt-[2px]" />
            </div>
          </li>
        )}

        {/* ----- */}
        <li className="flex items-center gap-2 capitalize">{product?.name}</li>
      </ul>
    </div>
  );
};

export default BreadCrumbs;
