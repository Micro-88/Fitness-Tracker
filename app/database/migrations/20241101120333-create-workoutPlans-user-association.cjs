'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('workoutPlans', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'workoutPlans_userId_fk',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('workoutPlans', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'workoutPlans_userId_fk',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
};
