import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string; style: number; size: number } }
) {
  try {
    const id = params.id;
    const style = params.style || 0;
    const size = params.size || 0;

    const product = await db.product.findUnique({
      where: { id },
      include: {
        category: true,
        subCategories: true,
        subProducts: {
          include: {
            sizes: true,
            images: true,
            color: true,
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    let discount = product.subProducts[style].discount;
    let priceBefore = product.subProducts[style].sizes[size].price;
    let price = discount ? priceBefore - priceBefore / discount : priceBefore;

    return NextResponse.json(
      {
        id: product.id,
        style: Number(style),
        name: product.name,
        description: product.description,
        slug: product.slug,
        sku: product.subProducts[style].sku,
        brand: product.brand,
        category: product.category,
        subCategories: product.subCategories,
        shipping: product.shipping,
        images: product.subProducts[style].images,
        color: product.subProducts[style].color,
        size: product.subProducts[style].sizes[size].size,
        price,
        priceBefore,
        quantity: product.subProducts[style].sizes[size].qty,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
