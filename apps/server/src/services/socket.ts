import { Server } from "socket.io";
import { Redis } from "ioredis";

// const PORT = process.env.REACT_APP_REDIS_PORT

const pub = new Redis({
  host: process.env.REACT_APP_REDIS_HOST,
  port: 19311,
  username: process.env.REACT_APP_REDIS_USERNAME,
  password: process.env.REACT_APP_REDIS_PSWD
});
const sub = new Redis({
  host: process.env.REACT_APP_REDIS_HOST,
  port: 19311,
  username: process.env.REACT_APP_REDIS_USERNAME,
  password: process.env.REACT_APP_REDIS_PSWD
});

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

    sub.subscribe("MESSAGE");
  }

  public initListener() {
    console.log("Init Socket listeners");
    const io = this.io;
    io.on("connect", (socket) => {
      console.log("New Socket connected", socket.id);
      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("New Message is sent", message);
        //pub this msg to redis
        await pub.publish("MESSAGE", JSON.stringify({ message }));
      });
    });
    sub.on("message", async (channel, message) => {
      if (channel === "MESSAGE") {
        console.log("Message from Redis:", message);

        io.emit("message", message);
      }
    });
  }
  get io() {
    return this._io;
  }
}

export default SocketServices;
