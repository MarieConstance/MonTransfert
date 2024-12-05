import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { comparePassword } from "../../utils";

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json({
      status: 401,
      data: {
        message: "User not found",
      },
    });
  }

  const isPasswordMatch = await comparePassword(password, user.password);

  if (!isPasswordMatch) {
    return NextResponse.json({
      status: 401,
      data: {
        message: "Invalid password",
      },
    });
  }

  return NextResponse.json({
    status: 200,
    data: {
      message: "Login successful",
    },
  });
};
