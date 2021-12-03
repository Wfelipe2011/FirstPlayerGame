import { Game } from "./module/game";
import { createGame } from "./core/create-game";
import { SetupExpress } from "./module/infra/setup-express";

const game = createGame();
const setupExpress = new SetupExpress();
const newGame = new Game(game, setupExpress.sockets);

class SetupServer {
  static start(setupExpress: SetupExpress, newGame: Game) {
    newGame.start();
    setupExpress.start();
  }
}
SetupServer.start(setupExpress, newGame)

