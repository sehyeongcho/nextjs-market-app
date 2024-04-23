import bcrypt from "bcryptjs"
import prisma from "@/helpers/prismadb"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()
  const {
    email,
    name,
    password,
  } = body
  const hashedPassword = await bcrypt.hash(password, 12)
  const user = await prisma.user.create({ // 이처럼 하나의 PrismaClient 객체를 만들어서 여러 곳에서 사용할 수 있습니다.
    data: {
      email,
      name,
      hashedPassword,
    }
  })

  return NextResponse.json(user)
}