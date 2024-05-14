/**
 * 인증 기능을 제공하는 NextAuth를 설정하는 파일입니다.
 */

import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/helpers/prismadb"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma), // adapter: 데이터를 저장하는 데 사용할 데이터베이스 또는 백엔드 시스템에 애플리케이션을 연결
  providers: [ // providers: 어떠한 로그인을 사용할 것인지, 기본 로그인 혹은 소셜 로그인 사용(Google, GitHub 등)
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials')
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials')
        }

        return user
      }
    })
  ],
  session: {
    strategy: "jwt" // 세션 데이터를 jwt에 저장합니다. jwt 대신 데이터베이스에 저장할 수도 있습니다.
  },
  jwt: {
    // JWT(JSON Web Token)는 세션 데이터를 안전하게 전달하고 저장하기 위한 토큰입니다.
    secret: process.env.JWT_SECRET,
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  pages: {
    // pages 속성을 사용하여 signIn 페이지의 경로를 변경할 수 있습니다. 그리고 변경한 경로에 해당하는 페이지를 생성하여 커스텀 로그인 페이지를 생성할 수 있습니다.
    signIn: '/auth/login'
  },
  callbacks: {
    // jwt 함수에서 token, user 데이터를 받아와서 각 데이터를 전개한 후 합친 데이터를 반환합니다. 여기서 반환되는 데이터는 session 함수의 token 매개변수에 전달됩니다. 현재 session에는 user, expires property가 있고, session.user에 token을 할당하면 기존에 있던 유저 데이터에 토큰 데이터를 추가할 수 있습니다.
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = token
      return session
    }
  }
}

export default NextAuth(authOptions)