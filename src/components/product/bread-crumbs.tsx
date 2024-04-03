// "use client";

// import Link from "next/link";
// import { BsChevronRight } from "react-icons/bs";

// import { CustomProductType } from "@/app/(public)/product/[productId]/page";

// interface BreadCrumbsProps {
//   product: CustomProductType;
// }

// const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ product }) => {

//   return (
//     <div className="mb-2">
//       <ul className="flex items-center gap-1 text-sm italic flex-wrap">
//         {/* ----- */}
//         <li className="flex items-center gap-2 capitalize">
//           <Link href="/" className="text-secondary-color">
//             Home
//           </Link>
//           <div className="flex items-center">
//             <BsChevronRight size="14px" className="mt-[2px]" />
//             <BsChevronRight size="14px" className="-ml-3 mt-[2px]" />
//           </div>
//         </li>

//         {/* ----- */}
//         {product?.category && (
//           <li className="flex items-center gap-2 capitalize">
//             <Link
//               href="/categories/${product?.category?.slug}"
//               className="text-secondary-color"
//             >
//               {product?.category?.name}
//             </Link>
//             <div className="flex items-center">
//               <BsChevronRight size="14px" className="mt-[2px]" />
//               <BsChevronRight size="14px" className="-ml-3 mt-[2px]" />
//             </div>
//           </li>
//         )}

//         {/* ----- */}
//         <li className="flex items-center gap-2 capitalize">{product?.name}</li>
//       </ul>
//     </div>
//   );
// };

// export default BreadCrumbs;

"use client";

import React, { ReactNode } from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";

interface BreadCrumbProps {
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
}

const Breadcrumbs = ({
  containerClasses,
  listClasses,
  activeClasses,
  capitalizeLinks,
}: BreadCrumbProps) => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  return (
    <ul className={containerClasses}>
      <li className={listClasses}>
        <Link href={"/"}>Home</Link>
      </li>
      {pathNames.length > 0 && <span className="mx-2"> / </span>}
      {pathNames.map((link, index) => {
        let href = `/${pathNames.slice(0, index + 1).join("/")}`;
        let itemClasses =
          paths === href ? `${listClasses} ${activeClasses}` : listClasses;
        let itemLink = capitalizeLinks
          ? link[0].toUpperCase() + link.slice(1, link.length)
          : link;
        return (
          <React.Fragment key={index}>
            <li className={itemClasses}>
              <Link href={href}>{itemLink}</Link>
            </li>
            {pathNames.length !== index + 1 && (
              <span className="mx-2"> / </span>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default Breadcrumbs;
