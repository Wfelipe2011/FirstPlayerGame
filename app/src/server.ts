import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

import { Game } from "./module/game";
import { createGame } from "./core/create-game";

const app = express();
const server = createServer(app);
const sockets = new Server(server);

app.use(express.static("dist/public"));

const game = createGame();

const newGame = new Game(game, sockets);

newGame.start();

server.listen(process.env.PORT || 3001, () => {
  console.log("> Sever listening on port: 3000");
});
