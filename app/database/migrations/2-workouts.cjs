'use strict';

import ('reflect-metadata');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.createTable('Workouts', {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        goal: {
          type: Sequelize.ENUM('Lose_Weight', 'Gain_Strength', 'Gain_Muscle'),  //changed naming to match ENUM in @/models/workout.ts
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
          type: Sequelize.STRING,
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
        METscore: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
      });
    },
  
    async down(queryInterface) {
      await queryInterface.dropTable('Workouts');
    },
  };
