"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const game_1 = require("./module/game");
const create_game_1 = require("./core/create-game");
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const sockets = new socket_io_1.Server(server);
app.use(express_1.default.static("dist/public"));
const game = (0, create_game_1.createGame)();
const newGame = new game_1.Game(game, sockets);
newGame.start();
server.listen(process.env.PORT || 3001, () => {
    console.log("> Sever listening on port: 3000");
});
//# sourceMappingURL=server.js.map