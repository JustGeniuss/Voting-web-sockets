import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { PollsService } from './polls.service';
import { SocketWithAuth } from './types';

@WebSocketGateway({
  namespace: 'polls',
})
export class PollsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(PollsGateway.name);
  constructor(private readonly pollService: PollsService) {}

  @WebSocketServer() io: Namespace;

  afterInit(): void {
    this.logger.log('Websocket Gateway Initializated');
  }

  handleConnection(client: SocketWithAuth) {
    const sockets = this.io.sockets;

    this.logger.debug(
      `Socket connected with userID: ${client.userID}, pollID: ${client.pollID} and name: *${client.name}*`,
    );

    this.logger.log(`WS client with id: ${client.id} connected`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}`);

    this.io.emit('hello from', client.id);
  }

  handleDisconnect(client: SocketWithAuth) {
    const sockets = this.io.sockets;

    this.logger.debug(
      `Socket connected with userID: ${client.userID}, pollID: ${client.pollID} and name: *${client.name}*`,
    );

    this.logger.log(`WS client with id: ${client.id} disconnected`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}`);
  }
}
