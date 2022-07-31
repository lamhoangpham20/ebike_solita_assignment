import express from "express";
import { Response } from "express";
import { myDataSource } from "./app-data-source";
import { Station } from "./entities/Station";
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

  app.get("/stations", async function (_, res: Response) {
    const station = await myDataSource
      .getRepository(Station)
      .createQueryBuilder("s")
      .orderBy("s.fid")
      .take(10)
      .getMany();
    res.send(station);
  });

  app.get("/", async function (_, res: Response) {
    res.json("hello");
  });

  app.listen(port, () => {
    console.log(`App running on port ${port}.`);
  });
};

main().catch((err) => console.log(err));
