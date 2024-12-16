// config.mjs
import dotenv from 'dotenv';
import mariadb from 'mariadb';

dotenv.config();

export const options = {
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'fitness_tracker_db',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  dialect: "mariadb",
  dialectModule: mariadb,
  logging: process.env.NODE_ENV === "development" ? console.log : false,
  migrationStorageTableName: "migrations",
};

if (process.env.NODE_ENV === "production") {
  options.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  };
}

export const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyALj_icXPAj502k0VEicvw1d_TCJGmG6Vw';

const config = {
  development: options,
  test: options,
  production: options,
};

export default config;