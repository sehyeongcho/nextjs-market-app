/**
 * 사용자의 세션 데이터를 가져오는 작업을 모듈화 한 파일입니다.
 * useSession() 함수는 클라이언트 컴포넌트에서, getServerSession() 함수는 서버 컴포넌트에서 세션 데이터를 가져올 수 있습니다. 
 */

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export async function getSession() {
  return await getServerSession(authOptions)
}

export default async function getCurrentUser() {
  try {
    const session = await getSession()

    if (!session?.user?.email) {
      return null
    }

    // 이메일을 이용해서 데이터베이스에서 요청 정보 찾은 후 가져오기
    const currentUser = await prisma?.user.findUnique({
      where: {
        email: session.user.email
      }
    })

    if (!currentUser) {
      return null
    }

    return currentUser
  } catch (error) {
    return null
  }
}
