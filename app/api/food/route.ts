import { NextRequest, NextResponse } from "next/server";
import { uploadImageToCloudinary } from "@/lib/utils/uploadImage";
import { FoodType } from "@/lib/utils/types";
import {
  createFood,
  getAllFood,
  updateFood,
} from "@/lib/services/food-service";
import { Food } from "@/lib/models/Food";

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

  // Extract food fields from formData
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
// export async function POST(request: NextRequest) {
//   try {
//     // Parse the formData from the request
//     const formData = await request.formData();

//     // Extract food fields from formData
//     const name = formData.get("name") as string;
//     const ingredients = formData.get("ingredients") as string;
//     const price = formData.get("price") as string;
//     const categoryId = formData.get("categoryId") as string;
//     const image = formData.get("image") as File;

//     // Console log the received data
//     console.log("========== Received Food Data ==========");
//     console.log("Name:", name);
//     console.log("ingredients:", ingredients);
//     console.log("Price:", price);
//     console.log("Category:", categoryId);
//     console.log(
//       "Image:",
//       image ? `${image.name} (${image.size} bytes)` : "No image"
//     );
//     console.log("=======================================");

//     // Validate required fields
//     if (!name || !ingredients || !price || !categoryId) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Handle image upload if image exists
//     let imageUrl = "";
//     console.log(image);
//     if (image) {
//       imageUrl = await uploadImageToCloudinary(image);
//     }
//     const foodData: FoodType = {
//       name,
//       ingredients,
//       price: parseFloat(price),
//       categoryId,
//       image: imageUrl,
//     };
//     const result = await createFood( foodData );

//   if (result) {
//     return NextResponse.json(
//       { message: "Food item received successfully" },
//       { status: 200 }
//     );
//   } else {
//     return NextResponse.json(
//       { message: "Food Failed to create" },
//       { status: 400 }
//     );
//   }
// }
// }
// Prepare the food data object

//     await createFood(foodData);
//     console.log("Final Food Data:", foodData);

//     return NextResponse.json(
//       {
//         success: true,
//         message: "Food item received and image uploaded successfully",
//         data: foodData,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error processing food data:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         error: "Failed to process food data",
//         details: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 }
//     );
//   }
// }
// export async function PATCH(req: NextRequest) {
//   try {
//     const { id } = await req.json();
//     if (!id) {
//       return NextResponse.json({ error: "Food ID required" }, { status: 400 });
//     }

//     const updated = await Food.findByIdAndUpdate(id);
//     if (!updated) {
//       return NextResponse.json({ error: "Food not found" }, { status: 404 });
//     }

//     return NextResponse.json({ message: "Food updated" }, { status: 200 });
//   } catch (error) {
//     console.error("DELETE /api/food error:", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
// export async function PATCH(request: NextRequest) {
//   try {
//     // Parse the formData from the request
//     const formData = await request.formData();
//     const { id } = await request.json();
//     // Extract food fields from formData
//     const name = formData.get("name") as string;
//     const ingredients = formData.get("ingredients") as string;
//     const price = formData.get("price") as string;
//     const categoryId = formData.get("categoryId") as string;
//     const image = formData.get("image") as File;

//     // Console log the received data
//     console.log("========== Received Food Data ==========");
//     console.log("Name:", name);
//     console.log("ingredients:", ingredients);
//     console.log("Price:", price);
//     console.log("Category:", categoryId);
//     console.log(
//       "Image:",
//       image ? `${image.name} (${image.size} bytes)` : "No image"
//     );
//     console.log("=======================================");

//     // Validate required fields || !category
//     if (!name || !ingredients || !price) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Handle image upload if image exists
//     let imageUrl = "";
//     console.log(image);
//     if (image) {
//       imageUrl = await uploadImageToCloudinary(image);
//     }

//     // Prepare the food data object
//     const foodData: FoodType = {
//       name,
//       ingredients,
//       price: parseFloat(price),
//       categoryId,
//       image: imageUrl,
//     };
//     let updated = await Food.findByIdAndUpdate(id);
//     await updateFood(foodData);
//     console.log("Final Food Data:", foodData);
//     updated = foodData;
//     return NextResponse.json(
//       {
//         success: true,
//         message: "Food item received and image uploaded successfully",
//         data: foodData,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error processing food data:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         error: "Failed to process food data",
//         details: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 }
//     );
//   }
//}
