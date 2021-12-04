import { Game } from "./module/game.js";
import { createGame } from "./core/create-game.js";
import { SetupExpress } from "./module/infra/setup-express.js";

const game = createGame();
const setupExpress = new SetupExpress();
const newGame = new Game(game, setupExpress.sockets);

class SetupServer {
  static start(setupExpress: SetupExpress, newGame: Game) {
    newGame.start();
    setupExpress.start();
  }
}
console.log("teste");
SetupServer.start(setupExpress, newGame)

