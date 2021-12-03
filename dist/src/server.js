"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = require("./module/game");
const create_game_1 = require("./core/create-game");
const setup_express_1 = require("./module/infra/setup-express");
const game = (0, create_game_1.createGame)();
const setupExpress = new setup_express_1.SetupExpress();
const newGame = new game_1.Game(game, setupExpress.sockets);
class SetupServer {
    static start(setupExpress, newGame) {
        newGame.start();
        setupExpress.start();
    }
}
SetupServer.start(setupExpress, newGame);
//# sourceMappingURL=server.js.map