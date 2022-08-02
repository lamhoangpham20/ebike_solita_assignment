import express from "express";
import { Response, Request } from "express";
import {
  getStations,
  getStationbyId,
  createStation,
  updateStation,
  deleteStation,
} from "../resolvers/station";
const router = express.Router();

router.get("/", async function (_: Request, res: Response) {
  const stations = await getStations();
  res.json(stations);
});

router.get("/:id", async function (req: Request, res: Response) {
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

module.exports = router;
