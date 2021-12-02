import { Server } from "socket.io";

export class Game {
  private gameAddFruit = null;
  constructor(readonly game, readonly sockets: Server) {}

  start() {
    this.game.subscribe((command) => {
      // console.log(`> Emitting ${command.type}`);
      this.sockets.emit(command.type, command);
    });
    this.sockets.on("connection", (socket) => {
      const playerId = socket.id;
      // console.log(`Player connected on Server ${playerId}`)

      if (this.game.gameOver()) this.gameAddFruit = this.game.start();

      this.game.addPlayer({ playerId });

      socket.on("disconnect", () => {
        this.game.removePlayer({ playerId });
        this.game.unSubscribe();

        if (this.game.gameOver()) this.game.stop(this.gameAddFruit);
      });

      socket.emit("setup", this.game.state);

      socket.on("move-player", (command) => {
        // console.log(command);
        command.playerId = playerId;
        command.type = "move-player";

        this.game.movePlayer(command);
      });
    });
  }
}
