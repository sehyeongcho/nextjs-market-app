/**
 * NextAuth의 Session 인터페이스를 확장하는 파일입니다. 모듈 선언 확장문을 사용하여 기존 모듈에 새로운 프로퍼티를 추가합니다.
 */

import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string
      role?: string
    } & DefaultSession["user"]
  }
}