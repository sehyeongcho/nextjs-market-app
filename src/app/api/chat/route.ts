/**
 * 채팅 페이지에서 채팅 내역을 불러오거나 채팅을 입력하기 위한 데이터베이스로의 요청을 처리하는 서버 API 파일입니다.
 */

import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/helpers/prismadb";

export async function GET(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const users = await prisma.user.findMany({
    include: {
      conversations: {
        include: {
          messages: {
            include: {
              sender: true,
              receiver: true
            },
            orderBy: {
              createdAt: "asc"
            }
          },
          users: true
        }
      }
    }
  })

  return NextResponse.json(users)
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const body = await request.json()

  // 이미 둘이 대화를 한 conversation이 있는지 찾기
  const conversation = await prisma.conversation.findFirst({
    where: {
      AND: [
        {
          users: {
            some: {
              id: body.senderId
            }
          }
        },
        {
          users: {
            some: {
              id: body.receiverId
            }
          }
        }
      ]
    }
  })

  if (conversation) {
    // 이미 둘이 대화를 한 conversation이 있다면 메시지만 작성하기
    try {
      const message = await prisma.message.create({
        data: {
          text: body.text,
          image: body.image,
          senderId: body.senderId,
          receiverId: body.receiverId,
          conversationId: conversation.id
        }
      })

      return NextResponse.json(message)
    } catch (error) {
      return NextResponse.json(error)
    }
  } else {
    // 둘이 처음 대화하는 거라면 conversation과 message 둘 다 생성
    // conversation 생성 시 존재하는 유저 record와 연결
    const newConversation = await prisma.conversation.create({
      data: {
        senderId: body.senderId,
        receiverId: body.receiverId,
        users: {
          connect: [
            {
              id: body.senderId
            },
            {
              id: body.receiverId
            }
          ]
        }
      }
    })

    try {
      const message = await prisma.message.create({
        data: {
          text: body.text,
          image: body.image,
          senderId: body.senderId,
          receiverId: body.receiverId,
          conversationId: newConversation.id
        }
      })

      return NextResponse.json(message)
    } catch (error) {
      return NextResponse.json(error)
    }
  }
}
