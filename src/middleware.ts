/**
 * 페이지 접근 권한을 처리하기 위하여 미들웨어 함수를 정의한 파일입니다.
 * matcher가 있으면 matcher의 범위 안에서 미들웨어 함수를 실행합니다.
 * matcher가 없으면 모든 범위 안에서 미들웨어 함수를 실행합니다.
 */

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.JWT_SECRET })
  const pathname = req.nextUrl.pathname

  // 로그인된 유저만 접근 가능
  // req.url을 전달함으로 요청이 발생한 경로를 유지하게 되어, 로그인 후 이전 페이지로 자동으로 이동하게 할 수 있습니다.
  if (pathname.startsWith("/user") && !session) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url))
  }

  // admin 유저만 접근 가능
  if (pathname.startsWith("/admin") && (session?.role !== "Admin")) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // 로그인된 유저는 로그인, 회원가입 페이지에 접근 X
  if (pathname.startsWith("/auth") && session) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // 위 조건문에 해당되지 않는 경우, 원하는 페이지로 이동이 가능합니다.
  return NextResponse.next()
}