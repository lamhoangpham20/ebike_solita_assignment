"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_data_source_1 = require("./app-data-source");
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
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded());
    const stationRoute = require("./routes/station");
    app.use("/stations", stationRoute);
    app.get("/", async function (_, res) {
        res.json("hello");
    });
    app.listen(port, () => {
        console.log(`App running on port ${port}.`);
    });
};
main().catch((err) => console.log(err));
//# sourceMappingURL=index.js.map