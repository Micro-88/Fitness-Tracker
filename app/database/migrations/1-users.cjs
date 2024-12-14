'use strict';

import ('reflect-metadata'); 

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.createTable('users', {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        gender: {
          type: Sequelize.ENUM('male', 'female'),
          allowNull: false,
        },
        age: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        currentBodyWeight: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      });
    },
  
    async down(queryInterface) {
      await queryInterface.dropTable('users');
    },
  };
