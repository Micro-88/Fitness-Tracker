'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('personalRecords', {
      userId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      totalCaloriesBurned: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      totalWorkoutDuration: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      totalWorkoutsFinished: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('personalRecords');
  },
};