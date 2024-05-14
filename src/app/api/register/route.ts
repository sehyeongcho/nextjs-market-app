/**
 * Register 버튼을 눌렀을 때 입력한 payload를 데이터베이스에 저장하기 위한 요청을 처리하는 서버 API 파일입니다.
 */

import bcrypt from "bcryptjs"
import prisma from "@/helpers/prismadb"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()
  const {
    email,
    name,
    password
  } = body
  const hashedPassword = await bcrypt.hash(password, 12)
  const user = await prisma.user.create({ // 이처럼 하나의 PrismaClient 객체를 만들어서 여러 곳에서 사용할 수 있습니다.
    data: {
      email,
      name,
      hashedPassword
    }
  })

  return NextResponse.json(user)
}
