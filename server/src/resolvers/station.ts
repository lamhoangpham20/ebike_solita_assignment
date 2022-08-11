import {
  averageStationQuery,
  DepartTopStations,
  ReturnTopStations,
} from "../utils/query";
import { myDataSource } from "../ormconfig";
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

console.log(typeof Station);

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

const getStationTest = async (id: string) => {
  const station = await myDataSource
    .getRepository(Station)
    .createQueryBuilder("station")
    .loadRelationCountAndMap(
      "station.departureCount",
      "station.departurn_journeys"
    )
    .loadRelationCountAndMap("station.returnCount", "station.return_journeys")
    .where("station.id = :id", { id: id })
    .getOne();
  const avgDepart = await myDataSource
    .getRepository(Station)
    .query(averageStationQuery, [id]);
  const top5return = await myDataSource
    .getRepository(Station)
    .query(ReturnTopStations, [id]);
  const top5Depart = await myDataSource
    .getRepository(Station)
    .query(DepartTopStations, [id]);
  return { station, top5Depart, top5return, avgDepart };
};
export {
  searchStations,
  getStations,
  getStationbyId,
  createStation,
  updateStation,
  deleteStation,
  getStationTest,
};
