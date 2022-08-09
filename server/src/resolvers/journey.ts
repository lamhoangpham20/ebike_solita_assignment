import { Timestamp } from "typeorm";
import { myDataSource } from "../app-data-source";
import { Journey } from "../entities/Journey";
import { Between } from "typeorm";

type journeyInput = {
  departure_date: Timestamp;
  return_date: Timestamp;
  departureStationId: string;
  returnStationId: string;
  cover_distance: number;
  duration: number;
};

async function getJourneys(page: number | null): Promise<Journey[] | null> {
  const journeys = await myDataSource.getRepository(Journey).find({
    relations: {
      return_station: true,
      departure_station: true,
    },
    order: {
      departure_date: "ASC",
    },
    skip: page ? (page - 1) * 10 : 0,
    take: 10,
  });
  return journeys;
}

async function getJourneybyId(id: number) {
  const journeys = await Journey.find({
    relations: {
      return_station: true,
      departure_station: true,
    },
    where: {
      id,
    },
  });
  return journeys;
}

async function createJourney(input: journeyInput) {
  return Journey.create({ ...input }).save();
}

async function updateJourney(id: number, input: journeyInput) {
  const journey = await Journey.findOneBy({ id });
  if (!journey) {
    return null;
  }
  await Journey.update({ id }, input);
  return true;
}

async function deleteJourney(id: number) {
  const journey = await Journey.findOneBy({ id });
  if (!journey) {
    return null;
  }
  await Journey.delete({ id });
  return true;
}

const searchJourney = async (
  departure_station_id: string,
  return_station_id: string,
  page: number
) => {
  return await Journey.find({
    relations: {
      return_station: true,
      departure_station: true,
    },
    where: {
      departureStationId: departure_station_id,
      returnStationId: return_station_id,
    },
    skip: page ? (page - 1) * 10 : 0,
    take: 10,
  });
};

const filterJourney = async (
  departure_station_id: string,
  return_station_id: string,
  startDate: string,
  endDate: string,
  page: number
) => {
  return await Journey.find({
    relations: {
      return_station: true,
      departure_station: true,
    },
    where: {
      departureStationId: departure_station_id,
      returnStationId: return_station_id,
      departure_date: Between(new Date(startDate), new Date(endDate)),
    },
    skip: page ? (page - 1) * 10 : 0,
    take: 10,
  });
};

export {
  filterJourney,
  searchJourney,
  getJourneys,
  getJourneybyId,
  createJourney,
  updateJourney,
  deleteJourney,
};
