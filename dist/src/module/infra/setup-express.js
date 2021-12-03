"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetupExpress = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
class SetupExpress {
    constructor(port = process.env.PORT || 3001, app = (0, express_1.default)()) {
        this.port = port;
        this.app = app;
        this.server = (0, http_1.createServer)(app);
        this.sockets = new socket_io_1.Server(this.server);
    }
    start() {
        this.init();
        this.server.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
    init() {
        this.setupExpress();
        this.setupRoutes();
    }
    setupRoutes() {
    }
    setupExpress() {
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.static("dist/public"));
    }
}
exports.SetupExpress = SetupExpress;
//# sourceMappingURL=setup-express.js.map