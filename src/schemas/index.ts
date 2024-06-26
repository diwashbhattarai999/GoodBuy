import * as z from "zod";
import { UserRole } from "@prisma/client";

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Please provide a valid email",
    }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, {
        message: "Username is required",
      })
      .refine((name) => name.length > 3 && name.length < 255, {
        message: "Full name must be between 3 and 255 characters",
      }),
    email: z
      .string()
      .trim()
      .min(1, { message: "Email is required" })
      .email({ message: "Please provide a valid email" }),
    role: z.enum([UserRole.VENDOR, UserRole.USER]),
    companyName: z.optional(z.string()),
    panNo: z.optional(z.number()),

    password: z
      .string()
      .trim()
      .min(1, { message: "Password is required" })
      .refine(
        (password: string): boolean => {
          const trimmedPassword = password.trim();
          return (
            trimmedPassword.length > 0 &&
            trimmedPassword.length >= 6 &&
            trimmedPassword.length <= 20 &&
            /[a-z]/.test(password) &&
            /[A-Z]/.test(password)
          );
        },
        {
          message:
            "Password must be between 6 and 20 characters and contain at least one lowercase and one uppercase letter",
        }
      ),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters required!",
  }),
});

export const SettingsSchema = z
  .object({
    image: z.optional(z.string()),
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.VENDOR, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string()),
    newPassword: z.optional(z.string()),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  )
  .refine(
    (data) => {
      if (data.password) {
        // Only validate password if it's provided
        return data.password.length >= 6;
      }

      return true; // Allow empty password
    },
    {
      message: "Password must be at least 6 characters",
      path: ["password"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword) {
        // Only validate newPassword if it's provided
        return data.newPassword.length >= 6;
      }

      return true; // Allow empty newPassword
    },
    {
      message: "New password must be at least 6 characters",
      path: ["newPassword"],
    }
  );

export const CategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Category name is required" })
    .max(30, { message: "Category name must be between 1 and 30 characters." }),
});

export const SubCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "SubCategory name is required" })
    .max(30, {
      message: "SubCategory name must be between 1 and 30 characters.",
    }),
  category: z
    .string()
    .trim()
    .min(1, { message: "Category name is required" })
    .max(30, { message: "Category name must be between 1 and 30 characters." }),
});

export const CreateProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "SubCategory name is required" })
    .max(300, {
      message: "SubCategory name must be between 1 and 300 characters.",
    }),
  brand: z.string().min(1, { message: "Please add a brand" }),
  description: z.string().min(1, { message: "Please add a description" }),
  category: z.optional(z.string()),
  subCategories: z.optional(z.array(z.string())),
  productId: z.optional(z.string()),
  sku: z.string().min(1, { message: "Please add a sku/number" }),
  discount: z.optional(z.number()),
  image: z.optional(z.array(z.string())),
  color: z.optional(z.string()),
});

export const CheckoutSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Please provide a valid email",
    }),
  phone: z
    .string()
    .min(10, {
      message: "Phone Number must be 10 digits",
    })
    .max(10, { message: "Phone Number must be 10 digits" }),
  state: z.string().min(1, {
    message: "State is required",
  }),
  city: z.string().min(1, {
    message: "Town/City is required",
  }),
  address: z.string().min(1, {
    message: "Address is required",
  }),
  street: z.string().min(1, {
    message: "Street is required",
  }),
  saveInfo: z.optional(z.boolean()),
  paymentMethod: z.optional(z.enum(["cashOnDelivery", "online"])),
});
