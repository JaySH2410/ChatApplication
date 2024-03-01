import { Server } from "socket.io";
import { Redis } from "ioredis";

// const PORT = process.env.REACT_APP_REDIS_PORT

const pub = new Redis({
  host: 'redis-2a59ef7e-jaysh-chat-app.a.aivencloud.com',
  port: 19311,
  username: 'default',
  password: 'AVNS_-1mD7kkWCitc5BsXatn',
});
const sub = new Redis({
  host: 'redis-2a59ef7e-jaysh-chat-app.a.aivencloud.com',
  port: 19311,
  username: 'default',
  password: 'AVNS_-1mD7kkWCitc5BsXatn',
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
