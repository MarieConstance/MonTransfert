import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { phone_num, amount, name } = await req.json();

  const transaction = await prisma.transaction.create({
    data: {
      name,
      phone_num,
      amount,
    },
  });

  return NextResponse.json({
    status: 200,
    data: transaction,
  });
};
