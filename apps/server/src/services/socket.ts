import { Server } from "socket.io";

class SocketServices {
  private _io: Server;

  constructor() {
    console.log("Init Socket Server");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
  }

  public initListener() {
    console.log("Init Socket listeners");
    const io = this.io;
    io.on("connect", (socket) => {
      console.log("New Socket connected", socket.id);
      socket.on("event:message", ({ message }: { message: string }) => {
        console.log("New Message is sent", message);
      });
    });
  }
  get io() {
    return this._io;
  }
}

export default SocketServices;
