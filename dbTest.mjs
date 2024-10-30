import dotenv from 'dotenv';
dotenv.config();

import sequelize from './app/lib/db.js'; // Ensure the path is correct

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

