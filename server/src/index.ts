import express from "express";
import { Response } from "express";
import { myDataSource } from "./app-data-source";
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
  const app = express();
  const port = 4000;
  app.use(express.json());
  app.use(express.urlencoded());
  const stationRoute = require("./routes/station");
  app.use("/stations", stationRoute);

  app.get("/", async function (_, res: Response) {
    res.json("hello");
  });

  app.listen(port, () => {
    console.log(`App running on port ${port}.`);
  });
};

main().catch((err) => console.log(err));
