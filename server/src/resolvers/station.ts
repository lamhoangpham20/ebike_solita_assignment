import { myDataSource } from "../app-data-source";
import { Station } from "../entities/Station";

async function getStations() {
  const stations = await myDataSource
    .getRepository(Station)
    .createQueryBuilder("s")
    .orderBy("s.id")
    .take(10)
    .getMany();
  return stations;
}

async function getStationbyId(id: string) {
  const stations = Station.findOne({ where: { id } });
  return stations;
}

export { getStations, getStationbyId };
