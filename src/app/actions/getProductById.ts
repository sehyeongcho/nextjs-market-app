/**
 * Id가 일치하는 한 개의 상품 데이터를 가져오는 작업을 모듈화 한 파일입니다.
 */

import prisma from "@/helpers/prismadb"

interface Params {
  productId?: string
}

export default async function getProductById(
  params: Params
) {
  try {
    const { productId } = params

    const product = prisma.product.findUnique({
      where: {
        id: productId
      },
      include: {
        user: true // 상품 정보를 가져올 때 연결된 user 정보도 함께 가져옵니다.
      }
    })

    if (!product) {
      return null
    }

    return product
  } catch (error: any) {
    throw new Error(error)
  }
}
