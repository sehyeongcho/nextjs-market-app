/**
 * 채팅 페이지에서 채팅 내용을 나열하기 위한 Chat 컴포넌트를 정의하는 파일입니다.
 */

import { TUserWithChat } from '@/types'
import React, { useEffect, useRef } from 'react'
import Input from './Input'
import ChatHeader from './ChatHeader'
import Message from './Message'

interface ChatProps {
  currentUser: TUserWithChat,
  receiver: {
    receiverId: string,
    receiverName: string,
    receiverImage: string
  }
  setLayout: (layout: boolean) => void
}

const Chat = ({
  currentUser,
  receiver,
  setLayout
}: ChatProps) => {
  const messageEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    messageEndRef?.current?.scrollIntoView({
      behavior: "smooth"
    })
  }

  useEffect(() => {
    scrollToBottom()
  })

  if (!receiver.receiverName || !currentUser) {
    return <div className="w-full h-full"></div>
  }

  const conversation = currentUser?.conversations.find(
    (conversation) => conversation.users.find(
      (user) => user.id === receiver.receiverId
    )
  )

  return (
    <div className="w-full">
      <div>
        <ChatHeader
          setLayout={setLayout}
          receiverName={receiver.receiverName}
          receiverImage={receiver.receiverImage}
          lastMessageTime={
            conversation?.messages
              .filter((message) => message.receiverId === currentUser.id)
              .slice(-1)[0]?.createdAt
          }
        />
      </div>

      <div className="flex flex-col gap-8 p-4 overflow-auto h-[calc(100vh_-_60px_-_70px_-_80px)]">
        {conversation &&
          conversation.messages
            .map((message) => {
              return (
                <Message
                  key={message.id}
                  isSender={message.senderId === currentUser?.id}
                  messageText={message.text}
                  messageImage={message.image}
                  receiverName={receiver.receiverName}
                  receiverImage={receiver.receiverImage}
                  senderImage={currentUser?.image}
                  time={message.createdAt}
                />
              )
            })
        }
        <div ref={messageEndRef} />
      </div>

      <div className="flex items-center p-3">
        <Input
          receiverId={receiver?.receiverId}
          currentUserId={currentUser?.id}
        />
      </div>
    </div>
  )
}

export default Chat