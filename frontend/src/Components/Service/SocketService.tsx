import { io, Socket } from "socket.io-client";
import VacationModel from "../Models/VacationModel";

class SocketService {
  public socket: Socket;

  public connect(): void {
    this.socket = io("http://localhost:3001");
    console.log("connect")
  }

  public disconnect(): void {
    this.socket.disconnect();
  }



  public send(msg: VacationModel | string): void {
    this.socket.emit("msg-from-client", msg);
    console.log("emit")
  }
}

export default SocketService
  ;
