// export { default } from "next-auth/middleware"

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// // 이 경로 안에 있는 것들만 middleware에서 처리하게 됩니다.
// export const config = { matcher: ["/admin/:path*", "/user"] }

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.JWT_SECRET })
  const pathname = req.nextUrl.pathname

  // console.log('session', session)
  // console.log('pathname', pathname)

  // 로그인된 유저만 접근 가능
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

  return NextResponse.next()
}