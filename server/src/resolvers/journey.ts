import { Timestamp } from "typeorm";
import { myDataSource } from "../app-data-source";
import { Journey } from "../entities/Journey";

type journeyInput = {
  departure_date: Timestamp;
  return_date: Timestamp;
  departureStationId: string;
  returnStationId: string;
  cover_distance: number;
  duration: number;
};

async function getJourneys(): Promise<Journey[] | null> {
  const journeys = await myDataSource.getRepository(Journey).find({
    relations: {
      return_station: true,
      departure_station: true,
    },
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

export {
  getJourneys,
  getJourneybyId,
  createJourney,
  updateJourney,
  deleteJourney,
};
