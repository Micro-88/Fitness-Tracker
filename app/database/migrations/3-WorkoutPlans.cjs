'use strict';

require('reflect-metadata');
const { AllowNull } = require('sequelize-typescript');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.createTable('WorkoutPlans', {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE', // Deletes the workout plan if the user is deleted
        },
        workoutId: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: 'Workouts',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
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
  
    async down(queryInterface, Sequelize) {
      await queryInterface.dropTable('workoutPlans');
    },
  };