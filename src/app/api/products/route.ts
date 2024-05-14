/**
 * 상품 생성하기 버튼을 눌렀을 때 입력한 payload를 데이터베이스에 저장하기 위한 요청을 처리하는 서버 API 파일입니다.
 */

import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/helpers/prismadb"

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const body = await request.json()
  const {
    title,
    description,
    imageSrc,
    category,
    latitude,
    longitude,
    price
  } = body

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      return NextResponse.error()
    }
  })

  const product = await prisma.product.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      latitude,
      longitude,
      price: Number(price),
      userId: currentUser.id
    }
  })

  return NextResponse.json(product)
}
