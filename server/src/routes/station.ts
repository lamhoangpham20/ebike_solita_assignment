const express = require("express");
import { Response, Request } from "express";
import { getStations, getStationbyId } from "../resolvers/station";
const router = express.Router();

router.get("/", async function (res: Response) {
  const stations = await getStations();
  res.json(stations);
});

router.get("/:id", async function (req: Request, res: Response) {
  const id = req.params.id;
  const station = await getStationbyId(id);
  res.json(station);
});

module.exports = router;
