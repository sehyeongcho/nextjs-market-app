import { Message, User } from "@prisma/client"

export type TUserWithChat = User & {
  conversations: TConversation[]
}

export type TConversation = {
  id: string,
  messages: TMessage[],
  users: User[]
}

export type TMessage = Message & {
  sender: User,
  receiver: User
}