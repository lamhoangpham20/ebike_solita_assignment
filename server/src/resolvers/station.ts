import { myDataSource } from "../app-data-source";
import { Station } from "../entities/Station";

type StationInput = {
  id: string;
  name?: string;
  namn?: string;
  nimi?: string;
  oisoite?: string;
  address?: string;
  operator?: string;
  capacities?: number;
  longitude?: number;
  latitude?: number;
};

async function getStations(page: number): Promise<Station[] | null> {
  const stations = await myDataSource
    .getRepository(Station)
    .createQueryBuilder("s")
    .orderBy("s.id")
    .skip(page ? (page - 1) * 10 : 0)
    .take(10)
    .getMany();
  return stations;
}

async function getStationbyId(id: string): Promise<any | null> {
  // const stations = await Station.findOne({
  //   where: { id },
  //   relations: {
  //     departurn_journeys:true
  //     return_journeys: true,
  //   },
  // });
  const stations = await myDataSource
    .getRepository(Station)
    .createQueryBuilder("station")
    .loadRelationCountAndMap(
      "station.departureCount",
      "station.departurn_journeys"
    )
    .loadRelationCountAndMap("station.returnCount", "station.return_journeys")
    .innerJoin("station.return_journeys", "return_journey")
    //.select("*, AVG(return_journey.duration)")
    .where("station.id = :id", { id: id })
    .getOne();
  return stations;
}

async function createStation(input: StationInput): Promise<Station | null> {
  const foundStation = await Station.findOneBy({ id: input.id });
  if (foundStation) {
    return null;
  }
  return Station.create({ ...input }).save();
}

async function updateStation(input: StationInput): Promise<Station | null> {
  const id = input.id;
  const station = await Station.findOneBy({ id });
  if (!station) {
    return null;
  }
  if (typeof input.name !== undefined) {
    await Station.update(
      { id },
      {
        name: input.name,
        address: input.address,
        capacities: input.capacities,
        longitude: input.longitude,
        latitude: input.latitude,
      }
    );
  }
  return station;
}

async function deleteStation(id: string) {
  const station = await Station.findOneBy({ id });
  if (!station) {
    return null;
  }
  await Station.delete({ id });
  return true;
}

const searchStations = async (name: string) => {
  console.log(name);
  return await myDataSource
    .getRepository(Station)
    .createQueryBuilder("station")
    .where("LOWER(station.name) like :name", { name: `%${name}%` })
    .take(10)
    .getMany();
};
export {
  searchStations,
  getStations,
  getStationbyId,
  createStation,
  updateStation,
  deleteStation,
};
