import { Sequelize } from "sequelize";
import { SequelizeOptions } from "sequelize-typescript";
import { options } from "./database/config/config.mjs"; 

const dbOptions = <SequelizeOptions>options
dbOptions.dialectModule = require('mariadb');

const sequelize = new Sequelize(dbOptions);

export default sequelize;