"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
const path_1 = __importDefault(require("path"));
const typeorm_1 = require("typeorm");
const Journey_1 = require("./entities/Journey");
const Station_1 = require("./entities/Station");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
exports.myDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "01655326497",
    database: "ebike",
    entities: [Station_1.Station, Journey_1.Journey],
    logging: true,
    synchronize: true,
    migrations: [path_1.default.join(__dirname, "./migrations/*")],
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
});
//# sourceMappingURL=app-data-source.js.map