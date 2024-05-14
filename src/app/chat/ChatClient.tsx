/**
 * 채팅 페이지의 UI를 정의하는 파일입니다.
 * page.tsx 파일은 서버 컴포넌트이기 때문에 클라이언트 컴포넌트를 사용하기 위해 생성한 파일입니다.
 */

'use client'

import Chat from '@/components/chat/Chat'
import Contacts from '@/components/chat/Contacts'
import { TUserWithChat } from '@/types'
import { User } from '@prisma/client'
import axios from 'axios'
import React, { useState } from 'react'
import useSWR from 'swr'

interface ChatClientProps {
  currentUser?: User | null
}

const ChatClient = ({ currentUser }: ChatClientProps) => {
  const [receiver, setReceiver] = useState({ // 현재 대화하고 있는 사람의 정보를 저장하기 위한 state입니다.
    receiverId: "",
    receiverName: "",
    receiverImage: ""
  })
  const [layout, setLayout] = useState(false) // 반응형을 위한 state입니다.

  const fetcher = (url: string) => axios.get(url).then((res) => res.data)
  const { data: users, error, isLoading } = useSWR('/api/chat', fetcher, {
    refreshInterval: 1000
  })

  const currentUserWithMessage = users?.find(
    (user: TUserWithChat) => user.email === currentUser?.email
  )

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  return (
    <main>
      <div className="grid grid-cols-[1fr] md:grid-cols-[300px_1fr]">
        {/* md보다 클 때는 contact 컴포넌트, chat 컴포넌트 둘 다 보여야 합니다. */}
        {/* md보다 작고 layout이 true일 때는 contact 컴포넌트는 안 보이고 chat 컴포넌트만 보여야 합니다. */}
        <section className={`md:flex ${layout && "hidden"}`}>
          <Contacts
            users={users}
            currentUser={currentUserWithMessage}
            setLayout={setLayout}
            setReceiver={setReceiver}
          />
        </section>

        {/* md보다 클 때는 contact 컴포넌트, chat 컴포넌트 둘 다 보여야 합니다. */}
        {/* md보다 작고 layout이 false일 때는 chat 컴포넌트는 안 보이고 contact 컴포넌트만 보여야 합니다. */}
        <section className={`md:flex ${!layout && "hidden"}`}>
          <Chat
            currentUser={currentUserWithMessage}
            receiver={receiver}
            setLayout={setLayout}
          />
        </section>
      </div>
    </main>
  )
}

export default ChatClient
