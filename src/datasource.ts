import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "dotenv";

config();
export default new DataSource({
  type: "postgres",
  url: process.env["egf_databaseUrl"],
  logging: false,
  synchronize: false,
  entities: [`./**/*.entity.{js,ts}`],
  migrations: ["./migrations/*.{js,ts}"],
  subscribers: [],
});
