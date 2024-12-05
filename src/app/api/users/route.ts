import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "../utils";
export const POST = async (req: NextRequest) => {
  const { email, name, password } = await req.json();

  const users = await prisma.user.create({
    data: {
      email,
      name,
      password: await hashPassword(password),
    },
  });

  return NextResponse.json({
    status: 200,
    data: users,
  });
};
