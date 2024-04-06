import {
  CartItem,
  Category,
  Image,
  Product,
  ProductDetail,
  Question,
  Review,
  Size,
  Style,
  SubCategory,
  SubProduct,
} from "@prisma/client";

export interface CustomProduct extends Product {
  category: Category;
  subCategories: SubCategory[];
  details: ProductDetail[];
  questions: Question[];
  reviews: Review[];
  subProducts: (SubProduct & {
    images: Image[];
    description_images: Image[];
    sizes: Size[];
    color: Style;
  })[];
}

export interface CustomSubProduct extends SubProduct {
  product: {
    category: Category;
    details: ProductDetail[];
    subCategories: SubCategory[] | null;
    questions: Question[];
    reviews: Review[];
  } & Product;
  color: Style;
  sizes: Size[];
  images: Image[];
  description_images: Image[];
}

export interface ICartItem extends CartItem {
  subProduct: CustomSubProduct;
}
