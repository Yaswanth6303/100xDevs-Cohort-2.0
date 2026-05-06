// To create a API route in Next.js, we need to create a file in the app/api/user/route.ts file.
// This file is a server component and can be used to fetch data from the backend.
// The file is automatically converted to a API route by Next.js.

import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "../../../../generated/prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Users not found" }, { status: 404 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // To access body
    const data = await request.json();

    // To access headers
    // const headers = request.headers.get("Authorization");
    // To access query params
    // const searchParams = request.nextUrl.searchParams;
    // const name = searchParams.get("name");
    // const email = searchParams.get("email");
    // console.log(name, email);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });

    return NextResponse.json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "User creation failed" },
      { status: 500 }
    );
  }
}
