import { createGame } from "./core/create-game";
import { Game } from "./module/game";
import { SetupExpress } from "./module/infra/setup-express";

const game = createGame();
const setupExpress = new SetupExpress();
const newGame = new Game(game, setupExpress.sockets);

class SetupServer {
  static start(setupExpress, newGame) {
    newGame.start();
    setupExpress.start();
  }
}
console.log("teste");
SetupServer.start(setupExpress, newGame)

