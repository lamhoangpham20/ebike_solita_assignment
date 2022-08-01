"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStationbyId = exports.getStations = void 0;
const app_data_source_1 = require("../app-data-source");
const Station_1 = require("../entities/Station");
async function getStations() {
    const stations = await app_data_source_1.myDataSource
        .getRepository(Station_1.Station)
        .createQueryBuilder("s")
        .orderBy("s.id")
        .take(10)
        .getMany();
    return stations;
}
exports.getStations = getStations;
async function getStationbyId(id) {
    const stations = Station_1.Station.findOne({ where: { id } });
    return stations;
}
exports.getStationbyId = getStationbyId;
//# sourceMappingURL=station.js.map