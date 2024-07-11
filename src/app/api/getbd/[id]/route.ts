import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const id = req.url.split("/").pop();
    if (id) {
      const bdayinfo = await prisma.bdateInfo.findUnique({ where: { id } });

      return new NextResponse(JSON.stringify(bdayinfo), { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
