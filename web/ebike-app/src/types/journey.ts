import { Station } from "./station";

export type Journey = {
  id: string;
  departure_station: Station;
  return_station: Station;
  departure_date: string;
  return_date: string;
  cover_distance: number;
  duration: number;
};
