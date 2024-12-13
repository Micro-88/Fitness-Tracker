import { Sequelize } from "sequelize";
import { SequelizeOptions } from "sequelize-typescript";
import { options } from "./database/config/config.mjs"; 
import mariadb from "mariadb"; // Import mariadb directly

const dbOptions = <SequelizeOptions>options
dbOptions.dialectModule = mariadb;

const sequelize = new Sequelize(dbOptions);

export default sequelize;