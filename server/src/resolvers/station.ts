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

async function getStationbyId(id: string): Promise<Station | null> {
  const stations = await Station.findOne({ where: { id } });
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

export {
  getStations,
  getStationbyId,
  createStation,
  updateStation,
  deleteStation,
};
