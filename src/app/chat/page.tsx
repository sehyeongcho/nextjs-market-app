/**
 * 채팅 페이지를 정의하는 파일입니다.
 */

import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import ChatClient from './ChatClient'

const ChatPage = async () => {
  const currentUser = await getCurrentUser()

  return (
    <ChatClient
      currentUser={currentUser}
    />
  )
}

export default ChatPage
