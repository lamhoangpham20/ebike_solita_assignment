"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_data_source_1 = require("./app-data-source");
const Station_1 = require("./entities/Station");
require("reflect-metadata");
const main = async () => {
    await app_data_source_1.myDataSource
        .initialize()
        .then(() => {
        console.log("Data Source has been initialized!");
    })
        .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });
    const app = (0, express_1.default)();
    const port = 4000;
    app.get("/stations", async function (_, res) {
        const station = await app_data_source_1.myDataSource
            .getRepository(Station_1.Station)
            .createQueryBuilder("s")
            .orderBy("s.fid")
            .take(10)
            .getMany();
        res.send(station);
    });
    app.get("/", async function (_, res) {
        res.json("hello");
    });
    app.listen(port, () => {
        console.log(`App running on port ${port}.`);
    });
};
main().catch((err) => console.log(err));
//# sourceMappingURL=index.js.map