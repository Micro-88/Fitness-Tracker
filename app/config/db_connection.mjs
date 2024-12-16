// db_connection.mjs
import { Sequelize } from 'sequelize';
import config from './config.mjs';

const dbOptions = config.development;

const sequelize = new Sequelize(dbOptions);

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
