import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayInit {
  private logger: Logger = new Logger('Chat logger');
  private clients = [];

  @WebSocketServer() wss: Server;

  afterInit() {
    this.logger.log('inited');
  }

  @SubscribeMessage('messageToServer')
  handleMessage(
    client: Socket,
    payload: {
      sender: string;
      room: string;
      message: string;
    },
  ): any {
    console.log(payload);
    this.wss
      .to(payload.room)
      .emit('messageToClient', { ...payload, id: Date.now() });
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('typing')
  handleTyping(
    client: Socket,
    payload: {
      sender: string;
      room: string;
    },
  ): any {
    this.wss.to(payload.room).emit('typing', payload.sender);
  }

  @SubscribeMessage('endOfTyping')
  handleEndOfTyping(
    client: Socket,
    payload: {
      room: string;
    },
  ): any {
    this.wss.to(payload.room).emit('endOfTyping');
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    client.emit('leftRoom', room);
  }
}
