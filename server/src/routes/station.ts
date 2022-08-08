import express from "express";
import { Response, Request } from "express";
import {
  getStations,
  getStationbyId,
  createStation,
  updateStation,
  deleteStation,
  searchStations,
} from "../resolvers/station";
const router = express.Router();

router.get("/", async function (req: Request, res: Response) {
  let page = 0;
  if (req.query && req.query.page) {
    page = parseInt((req.query as any).page);
  }
  const journeys = await getStations(page);
  res.json(journeys);
});

router.get("/id/:id", async function (req: Request, res: Response) {
  console.log(req.query);
  const id = req.params.id;
  const station = await getStationbyId(id);
  res.json(station);
});

router.post("/", async function (req: Request, res: Response) {
  const input = req.body;
  const result = await createStation(input).catch((err) => {
    res.json(err);
  });
  console.log(result);
  if (!result) {
    res.json(false);
  }
  res.json(result?.id);
});

router.put("/", async function (req: Request, res: Response) {
  const input = req.body;
  const result = await updateStation(input).catch((err) => {
    res.json(err);
  });
  if (!result) {
    res.json(false);
  }
  res.sendStatus(201);
});

router.delete("/:id", async function (req: Request, res: Response) {
  const id = req.params.id;
  const result = await deleteStation(id).catch((err) => {
    res.json(err);
  });
  if (!result) {
    res.json(false);
  }
  res.sendStatus(201);
});

router.get("/search", async function (req: Request, res: Response) {
  let input = "";
  console.log("name", input);
  if (req.query && req.query.name) {
    input = (req.query as any).name;
  }
  const journeys = await searchStations(input.toLowerCase());
  if (!journeys) {
    res.json(null);
  }
  res.json(journeys.map((i) => i.name));
});

module.exports = router;
