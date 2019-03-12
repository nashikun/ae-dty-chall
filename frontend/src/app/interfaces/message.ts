export interface Message {
  title: string,
  message: string,
  senderId: string,
  sender: {user: string, username: string},
  recipientId: string,
  recipient: {user: string, username: string},
  read?: boolean
}
