import { NextRequest, NextResponse } from "next/server";
import { uploadImageToCloudinary } from "@/lib/utils/uploadImage";
import { FoodType } from "@/lib/utils/types";
import {
  createFood,
  getAllFood,

} from "@/lib/services/food-service";
import { Food } from "@/lib/models/Food";
import connectDB from "@/lib/mongodb";

export async function GET() {
  const foodMenu = await getAllFood();
  const response = NextResponse.json({ data: foodMenu }, { status: 200 });
  response.headers.set("Access-Control-Allow-Origin", "*"); // Or '*' for all origins
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return response;
}
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const ingredients = formData.get("ingredients") as string;
  const price = formData.get("price") as string;
  const categoryId = formData.get("categoryId") as string;
  const image = formData.get("image") as File;

  const uploadedUrl = await uploadImageToCloudinary(image);

  const result = await createFood({
    name,
    ingredients,
    price: parseFloat(price),
    categoryId,
    image: uploadedUrl,
  });

  if (result) {
    return NextResponse.json(
      { message: "Food item received successfully" },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { message: "Food Failed to create" },
      { status: 400 }
    );
  }
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

    const deleted = await Food.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { error: "Food not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Food deleted" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/categories error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(request:NextRequest) {
 try {
    const formData = await request.formData();
  const name = formData.get("name") as string;
  const ingredients = formData.get("ingredients") as string;
  const price = formData.get("price") as string;
  const categoryId = formData.get("categoryId") as string;
  const image = formData.get("image") as File;
  const id = formData.get("id") as string;

  const uploadedUrl = await uploadImageToCloudinary(image);
    if (!formData) {
      return NextResponse.json(
        { error: "Category ID required" },
        { status: 400 }
      );
    }

    const updateData = {
      name, ingredients, price, categoryId, image:uploadedUrl
    }

    const updated = await Food.findByIdAndUpdate(id, updateData);
    if (!updated) {
      return NextResponse.json(
        { error: "Food not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Food updated" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/categories error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

}