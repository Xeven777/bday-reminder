import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log(body);

    if (body.userId) {
      const bdateInfo = await prisma.bdateInfo.create({
        data: {
          userId: body.userId,
          name: body.name,
          bdate: body.birthday,
          friendEmail: body.email,
          tag: body.tag,
          autosend: body.autosend,
        },
      });

      return new NextResponse(JSON.stringify({ bdateInfo, ok: true }), {
        status: 201,
      });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}

// export async function DELETE(req: Request) {
//   try {
//     const { id } = await req.json();

//     if (id) {
//       const message = await prisma.message.delete({ where: { id } });

//       return new NextResponse(JSON.stringify({ message }), { status: 200 });
//     }
//   } catch (error) {
//     console.log(error);
//     return new NextResponse(
//       JSON.stringify({ error: "Internal server error" }),
//       { status: 500 }
//     );
//   }
// }
