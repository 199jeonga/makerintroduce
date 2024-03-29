//app/api/user/route.ts

import prisma from "@/app/lib/prisma";
import * as bcrypt from "bcrypt"; // 바뀐 부분

interface RequestBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: await bcrypt.hash(body.password, 10), // 바뀐 부분
    },
  });

  const { password, ...result } = user;
  return new Response(JSON.stringify(result));
}
