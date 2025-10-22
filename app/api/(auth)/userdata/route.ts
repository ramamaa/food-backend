import { UserData } from "@/lib/models/UserData";
import connectDB from "@/lib/mongodb";
import { getAllUserData } from "@/lib/services/userData-service";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET() {
  const userData = await getAllUserData();
  return new NextResponse(JSON.stringify({ data: userData }), {
    status: 200,
  });
}
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { email, password } = body;

    const existedUser = await UserData.findOne({
      email,
    });
    console.log(email, "email");
    console.log(password, "password");

    if (existedUser) {
      return NextResponse.json(
        {
          message: "Hereglegch burtgeltei bn",
          error: true,
        },
        { status: 406 }
      );
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = new UserData({
      email,
      password: hashPassword,
      role: "USER",
    });
    await newUser.save();

    return NextResponse.json(
      { success: true, message: "User created!" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
