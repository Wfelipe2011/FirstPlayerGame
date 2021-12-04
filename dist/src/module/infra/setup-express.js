import express from "express";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import { createServer } from "http";
export class SetupExpress {
    constructor(port = process.env.PORT || 3001, app = express()) {
        this.port = port;
        this.app = app;
        this.server = createServer(app);
        this.sockets = new Server(this.server);
    }
    start() {
        this.init();
        this.server.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
    init() {
        this.setupExpress();
        this.setupRoutes();
    }
    setupRoutes() {
    }
    setupExpress() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.static("dist/public"));
    }
}
