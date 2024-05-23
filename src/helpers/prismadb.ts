/**
 * 데이터베이스와 상호 작용할 수 있는 클라이언트인 PrismaClient 클래스의 인스턴스를 생성하고, 개발 환경에서만 전역적으로 접근할 수 있게 설정하는 파일입니다.
 */

import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = client
} else {
  globalThis.prisma = client
}

export default client
