import { Sequelize } from "sequelize-typescript";
import { config } from "./config/config";

export const sequelize = new Sequelize({
  username: config.username,
  password: config.password,
  database: config.database,
  host: "postgres.cc3jxguaxvim.us-east-1.rds.amazonaws.com",

  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Use only for testing; should be true in production
    }
  },
  storage: ":memory:",
});
