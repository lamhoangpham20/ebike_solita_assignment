import path from "path";
import { DataSource } from "typeorm";
import { Journey } from "./entities/Journey";
import { Station } from "./entities/Station";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import "dotenv-safe/config";

export const myDataSource = new DataSource({
  migrationsTableName: "migrations",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "01655326497",
  database: "ebike",
  entities: [Station, Journey],
  logging: true,
  //synchronize: true,
  migrations: [path.join(__dirname, "./migrations/*")],
  namingStrategy: new SnakeNamingStrategy(),
});
