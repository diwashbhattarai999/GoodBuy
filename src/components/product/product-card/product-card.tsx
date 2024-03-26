// "use client";

// import { IconType } from "react-icons";
// import { Product } from "@prisma/client";
// import Link from "next/link";
// import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
// import { useState } from "react";
// import Image from "next/image";
// import Button from "../ui/Button";
// import ProductSwiper from "./product-swiper";

// interface NewProductCardProps {
//   product: Product;
//   w_full?: boolean;
//   buttonText: string;
//   icon?: IconType;
//   imgHeight?: string;
//   options?: boolean;
// }

// const ProductCard: React.FC<NewProductCardProps> = ({
//   product,
//   w_full,
//   buttonText,
//   icon,
//   imgHeight,
//   options,
// }) => {
//   const [heartActive, setHeartActive] = useState(false);
//   const handleWishList = () => {
//     setHeartActive((prev) => !prev);
//   };

//   let discountAmt = 5;

//   return (
//     <div
//       className={`
//         p-[10px] mb-[10px] w-full 
//         ${!w_full && "mobile:w-1/2 tablet:w-1/3 desktop:w-1/4"}
        
//       `}
//     >
//       <div className="relative bg-content-background-color h-full text-center transition-all duration-1000 ease-in-out">
//         <div className="min-h-0 relative overflow-hidden mb-4">
//           {/* --------------- IMAGE --------------- */}
//           <Link
//             href={`/product/${product?.slug}?style=${active}`}
//             className="z-0"
//           >
//             <ProductSwiper images={images} imgHeight={imgHeight} />
//           </Link>
//           {/* --------------- WISHLIST --------------- */}
//           <div
//             className="absolute top-2 right-2 cursor-pointer z-10"
//             onClick={handleWishList}
//           >
//             <AiOutlineHeart
//               size={28}
//               className={`fill-gray-400 absolute inset-0 `}
//             />
//             <AiFillHeart
//               size={28}
//               className={`${heartActive ? "fill-red-600" : "fill-white"}`}
//             />
//           </div>
//           {/* --------------- SAVEUPTO --------------- */}
//           {discountAmt > 0 && (
//             <div
//               className="
//               text-red-700 font-semibold text-base text-left 
//               bg-[#cdb9fa] 
//               py-[6px] px-4 w-full
//               absolute bottom-0 z-10
//             "
//             >
//               <span>Discount upto {discountAmt}$</span>
//             </div>
//           )}
//         </div>

//         {/* PRODUCT INFO */}
//         <div className="pb-1 px-4 text-left text-primary-color relative">
//           <Link href={`/product/${product?.slug}?style=${active}`}>
//             <div className="mb-2 text-lg font-normal block cursor-pointer h-[56px]">
//               {productName}
//             </div>
//           </Link>
//           <div className="mb-5">
//             <span className="text-lg">{productPrice}</span>
//             {/* <s className="text-sm text-gray-color">Rs 423</s> */}
//           </div>
//           {!options && (
//             <div className="flex gap-2 mb-4">
//               {styles &&
//                 styles.map((style, i) =>
//                   style.image ? (
//                     <Image
//                       key={i}
//                       src={style.image}
//                       alt=""
//                       width={30}
//                       height={30}
//                       className={`
//                       rounded-full w-[30px] h-[30px] cursor-pointer
//                       object-cover shadow-md 
//                       outline-offset-2 outline hover:outline-primary-color
//                       transition-all duration-500
//                       ${i == active && "outline-primary-color"} 
//                     `}
//                       onMouseOver={() => {
//                         setImages(product.subProducts[i].images);
//                         setActive(i);
//                       }}
//                     />
//                   ) : (
//                     <span
//                       key={i}
//                       className={`
//                     bg-white 
//                     w-[30px] h-[30px] rounded-full
//                     shadow-md overflow-hidden
//                   `}
//                       onMouseOver={() => {
//                         setImages(product.subProducts[i].images);
//                         setActive(i);
//                       }}
//                     ></span>
//                   )
//                 )}
//             </div>
//           )}
//           <Button full icon>
//             <icon />
//             {ButtonText}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
