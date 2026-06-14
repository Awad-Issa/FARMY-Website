import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    const count = await prisma.product.count();
    return NextResponse.json({ ok: true, productCount: count, dbUrl: process.env.DATABASE_URL?.slice(0, 60) });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      error: String(error),
      dbUrl: process.env.DATABASE_URL?.slice(0, 60),
    }, { status: 500 });
  }
}
