import dotenv from 'dotenv';
dotenv.config();

console.log('DB_USER:', process.env.DB_USERNAME);         //changed process.env.DB_USER to process.env.DB_USERNAME
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_HOST:', process.env.DB_HOST);

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,                                //changed process.env.DB_USER to process.env.DB_USERNAME
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
      ssl: false // Disable SSL
    }
  }
);

export default sequelize;

