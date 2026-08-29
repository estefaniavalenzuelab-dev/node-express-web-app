import {
  Sequelize
} from "sequelize";

const DB_PORT = Number(
  process.env.DB_PORT || 5432
);

export const sequelize =
  new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host:
        process.env.DB_HOST,
      port: DB_PORT,
      dialect:
        "postgres",
      logging: console.log
    }
  );
