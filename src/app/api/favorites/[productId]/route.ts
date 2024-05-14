/**
 * 상품 즐겨찾기 버튼을 눌렀을 때 데이터베이스의 즐겨찾기 목록에 추가하거나 삭제하기 위한 요청을 처리하는 서버 API 파일입니다.
 */

import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"

interface Params {
  productId?: string
}

// 즐겨찾기 목록 추가 요청 처리
export async function POST(
  request: Request,
  { params }: { params: Params }
) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const { productId } = params

  if (!productId || typeof productId !== 'string') {
    throw new Error('Invalid ID')
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])]

  favoriteIds.push(productId)

  const user = await prisma?.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds
    }
  })

  return NextResponse.json(user)
}

// 즐겨찾기 목록 삭제 요청 처리
export async function DELETE(
  request: Request,
  { params }: { params: Params }
) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const { productId } = params

  if (!productId || typeof productId !== 'string') {
    throw new Error('Invalid ID')
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])]

  favoriteIds = favoriteIds.filter((id) => id !== productId)

  const user = await prisma?.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds
    }
  })

  return NextResponse.json(user)
}