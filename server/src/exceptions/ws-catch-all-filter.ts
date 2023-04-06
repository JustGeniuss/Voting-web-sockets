import {
    ArgumentsHost, BadRequestException, Catch, ExceptionFilter
} from '@nestjs/common';
import { SocketWithAuth } from 'src/polls/types';
import { WsBadRequestException, WsUnknownException } from './ws-exceptions';

@Catch()
export class WsCatchAllFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const socket: SocketWithAuth = host.switchToWs().getClient();

    if (exception instanceof BadRequestException) {
      const excepionData = exception.getResponse();

      const WsException = new WsBadRequestException(
        excepionData['message'] ?? excepionData ?? exception.name,
      );
      socket.emit('exception', WsException.getError());
      return;
    }

    const WsException = new WsUnknownException(exception.message);
    socket.emit('exception', WsException.getError());
  }
}
