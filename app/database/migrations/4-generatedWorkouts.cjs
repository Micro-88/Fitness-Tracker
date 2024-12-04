'use strict';

require('reflect-metadata');
const { AllowNull } = require('sequelize-typescript');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GeneratedWorkouts', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      workoutId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Workouts',  // Ensure the reference table name matches your model name
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      userId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'users',  // Ensure the reference table name matches your model name
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // Deletes the generated workout if the user is deleted
      },
      duration: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      intensity: {
        type: Sequelize.STRING,
        allowNull: true,  // Made nullable in case it's optional
      },
      instructions: {
        type: Sequelize.TEXT,
        allowNull: true,  // Made nullable in case it's optional
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      caloriesBurned: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable('GeneratedWorkouts');
  },
};