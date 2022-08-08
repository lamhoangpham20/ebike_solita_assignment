import express from "express";
import { Response, Request } from "express";
import {
  createJourney,
  deleteJourney,
  filterJourney,
  getJourneybyId,
  getJourneys,
  searchJourney,
  updateJourney,
} from "../resolvers/journey";
const router = express.Router();

// router.get("/", async function (_: Request, res: Response) {
//   const stations = await getJourneys(null);
//   res.json(stations);
// });

router.get("/", async function (req: Request, res: Response) {
  let page = 0;
  if (req.query && req.query.page) {
    page = parseInt((req.query as any).page);
  }
  const journeys = await getJourneys(page);
  res.json(journeys);
});

router.get("/id/:id", async function (req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const journey = await getJourneybyId(id);
  if (!journey) {
    res.json(null);
  }
  res.json(journey);
});

router.post("/", async function (req: Request, res: Response) {
  const input = req.body;
  const journey = await createJourney(input);
  res.json(journey);
});

router.put("/:id", async function (req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const input = req.body;
  const journey = await updateJourney(id, input);
  if (!journey) {
    res.json(null);
  }
  res.json(journey);
});

router.delete("/:id", async function (req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const journey = await deleteJourney(id);
  if (!journey) {
    res.json(null);
  }
  res.json(journey);
});

router.get("/search", async function (req: Request, res: Response) {
  let departure_station_id: string;
  let return_station_id: string;
  if (req.query && req.query.name) {
    departure_station_id = (req.query as any).depId;
    return_station_id = (req.query as any).retId;
  }
  const journey = await searchJourney(
    (req.query as any).depId,
    (req.query as any).retId
  );
  if (!journey) {
    res.json(null);
  }
  res.json(journey);
});

router.post("/filter", async function (req: Request, res: Response) {
  const input = req.body;
  const departure_station_id = input.depId;
  const return_station_id = input.retId;
  const startDate = input.startDate;
  const endDate = input.endDate;
  const journey = await filterJourney(
    departure_station_id,
    return_station_id,
    startDate,
    endDate
  );
  if (!journey) {
    res.json(null);
  }
  res.json(journey);
});

module.exports = router;
