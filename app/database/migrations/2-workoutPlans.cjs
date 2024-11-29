'use strict';

require('reflect-metadata');
const { AllowNull } = require('sequelize-typescript');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.createTable('workoutPlans', {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          unique: true, // Ensures one-to-one relationship
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE', // Deletes the workout plan if the user is deleted
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
  
    async down(queryInterface, Sequelize) {
      await queryInterface.dropTable('workoutPlans');
    },
  };