import express from "express";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import { createServer } from "http";

export class SetupExpress {
  public sockets: Server;
  public server 

  constructor(private port = process.env.PORT || 3001, public app = express()) {
    this.server = createServer(app);
    this.sockets = new Server(this.server);
  }

  public start(): void {
    this.init();
    this.server.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  private init(): void {
    this.setupExpress();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // this.app.use(router);
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(express.static("dist/public"));
  }
}
