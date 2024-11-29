'use strict';

require('reflect-metadata');
const { AllowNull } = require('sequelize-typescript');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('workouts', {
      fields: ['planId'],
      type: 'foreign key',
      name: 'workouts_planId_fk',
      references: {
        table: 'workoutPlans',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('workouts', {
      fields: ['planId'],
      type: 'foreign key',
      name: 'workouts_planId_fk',
      references: {
        table: 'workoutPlans',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
};
