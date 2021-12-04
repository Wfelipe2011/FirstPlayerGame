import { Game } from "./module/game.js";
import { createGame } from "./core/create-game.js";
import { SetupExpress } from "./module/infra/setup-express.js";

const game = createGame();
const setupExpress = new SetupExpress();
const newGame = new Game(game, setupExpress.sockets);

class SetupServer {
  static start(setupExpress, newGame) {
    newGame.start();
    setupExpress.start();
  }
}

SetupServer.start(setupExpress, newGame)

