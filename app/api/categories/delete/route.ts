import { Category } from "@/lib/models/Category";
import {

  getAllCategories,
} from "@/lib/services/category-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const categories = await getAllCategories();
  return new NextResponse(JSON.stringify({ data: categories }), {
    status: 200,
  });
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json(); 
    if (!id) {
      return NextResponse.json(
        { error: "Category ID required" },
        { status: 400 }
      );
    }

    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Category deleted" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/categories error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
