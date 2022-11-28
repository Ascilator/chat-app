export class Message2 {
  message: string;
  sender: string;
}

export class UpdateMessagesDto {
  newMessages: Array<Message2>;
  roomId: string;
}
