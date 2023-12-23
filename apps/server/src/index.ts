import http from "http"
import SocketServices from "./services/socket";

async function init() {
    const httpServer = http.createServer();
    const socketServices = new SocketServices();

    socketServices.io.attach(httpServer);

    const PORT = process.env.PORT ? process.env.PORT : 8000;
    httpServer.listen(PORT, () => {
        console.log(`Http server started at port:${PORT}`);
    });


    socketServices.initListener();


}

init();