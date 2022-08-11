import express from "express";
import { Response } from "express";
import { myDataSource } from "./ormconfig";
var cors = require("cors");
import "reflect-metadata";

const main = async () => {
  await myDataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization:", err);
    });

  //await myDataSource.runMigrations();
  const app = express();
  const port = process.env.PORT;
  app.set("proxy", 1);
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded());
  const stationRoute = require("./routes/station");
  const journeyRoute = require("./routes/journey");
  app.use("/stations", stationRoute);
  app.use("/journeys", journeyRoute);
  app.get("/", async function (_, res: Response) {
    res.json("hello");
  });

  app.listen(port, () => {
    console.log(`App running on port ${port}.`);
  });
};

main().catch((err) => console.log(err));
