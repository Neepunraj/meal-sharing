import knex from "knex";
import dotenv from "dotenv";
dotenv.config();

const isUsingDatabaseURL = Boolean(process.env.DATABASE_URL);

const connection = knex({
  client: isUsingDatabaseURL ? "pg" : process.env.DB_CLIENT,
  connection: isUsingDatabaseURL
    ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    }
    : {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_NAME,
      ssl:
        process.env.DB_USE_SSL === "true"
          ? { rejectUnauthorized: false }
          : false,
    },
});

export default connection;
