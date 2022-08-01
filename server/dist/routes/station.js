"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const station_1 = require("../resolvers/station");
const router = express.Router();
router.get("/", async function (res) {
    const stations = await (0, station_1.getStations)();
    res.json(stations);
});
router.get("/:id", async function (req, res) {
    const id = req.params.id;
    const station = await (0, station_1.getStationbyId)(id);
    res.json(station);
});
module.exports = router;
//# sourceMappingURL=station.js.map