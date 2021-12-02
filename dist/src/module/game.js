"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
class Game {
    constructor(game, sockets) {
        this.game = game;
        this.sockets = sockets;
        this.gameAddFruit = null;
    }
    start() {
        this.game.subscribe((command) => {
            this.sockets.emit(command.type, command);
        });
        this.sockets.on("connection", (socket) => {
            const playerId = socket.id;
            if (this.game.gameOver())
                this.gameAddFruit = this.game.start();
            this.game.addPlayer({ playerId });
            socket.on("disconnect", () => {
                this.game.removePlayer({ playerId });
                this.game.unSubscribe();
                if (this.game.gameOver())
                    this.game.stop(this.gameAddFruit);
            });
            socket.emit("setup", this.game.state);
            socket.on("move-player", (command) => {
                command.playerId = playerId;
                command.type = "move-player";
                this.game.movePlayer(command);
            });
        });
    }
}
exports.Game = Game;
//# sourceMappingURL=game.js.map