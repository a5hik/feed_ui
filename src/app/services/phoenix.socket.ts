import {Socket} from 'phoenix';
import {PhoenixChannel} from './phoenix.channel';

export class PhoenixSocket {
  private readonly socket: Socket;

  constructor(socketUrl) {
    this.socket = new Socket(socketUrl);
    this.socket.connect();
  }

  channel(topic, params = {}): PhoenixChannel {
    return new PhoenixChannel(this.socket, topic, params);
  }
}
