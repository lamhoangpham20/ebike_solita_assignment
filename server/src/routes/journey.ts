import express from "express";
import { Response, Request } from "express";
import {
  createJourney,
  deleteJourney,
  getJourneybyId,
  getJourneys,
  updateJourney,
} from "../resolvers/journey";
const router = express.Router();

router.get("/", async function (_: Request, res: Response) {
  const stations = await getJourneys();
  res.json(stations);
});

router.get("/:id", async function (req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const station = await getJourneybyId(id);
  if (!station) {
    res.json(null);
  }
  res.json(station);
});

router.post("/", async function (req: Request, res: Response) {
  const input = req.body;
  const stations = await createJourney(input);
  res.json(stations);
});

router.put("/:id", async function (req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const input = req.body;
  const station = await updateJourney(id, input);
  if (!station) {
    res.json(null);
  }
  res.json(station);
});

router.delete("/:id", async function (req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const station = await deleteJourney(id);
  if (!station) {
    res.json(null);
  }
  res.json(station);
});

module.exports = router;
