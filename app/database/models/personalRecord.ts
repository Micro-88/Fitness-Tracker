import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/db_connection.mjs';
import User from './user';

class PersonalRecord extends Model {
  declare userId: number;
  declare totalCaloriesBurned: number;
  declare totalWorkoutDuration: number;
  declare totalWorkoutsFinished: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

PersonalRecord.init(
  {
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: User,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    totalCaloriesBurned: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    totalWorkoutDuration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    totalWorkoutsFinished: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'PersonalRecord',
    tableName: 'personalRecords',
    timestamps: true,
  }
);

export default PersonalRecord;