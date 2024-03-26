import {
  Category,
  Image,
  Product,
  ProductDetail,
  Question,
  Review,
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
  })[];
}