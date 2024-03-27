import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const categoryId = params.categoryId;
    const subCategories = await db.subCategory.findMany({
      where: { categoryId },
      select: { name: true, id: true },
    });

    return NextResponse.json(subCategories, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" });
  }
}
