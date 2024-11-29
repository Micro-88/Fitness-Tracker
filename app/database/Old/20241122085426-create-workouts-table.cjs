'use strict';

require('reflect-metadata');
const { AllowNull } = require('sequelize-typescript');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Workouts', {
      workoutID: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      planId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      goal: {
        type: Sequelize.ENUM('Lose Weight', 'Gain Strength', 'Gain Muscle'),
        allowNull: false,
      },
      level: {
        type: Sequelize.ENUM('Novice', 'Beginner', 'Intermediate', 'Advanced'),
        allowNull: false,
      },
      equipment: {
        type: Sequelize.ENUM('Barbells', 'Dumbbells', 'BodyWeight', 'Machine', 'Kettlebells', 'Cables', 'Bands'),
        allowNull: false,
      },
      duration: {
        type: Sequelize.INTEGER, // In minutes
      },
      muscleGroup: {
        type: Sequelize.ENUM('Arm', 'UpperBody', 'LowerBody', 'Legs', 'Back'), // Restrict values
        allowNull: false,
      },
      instructions: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Workouts');
  },
};

