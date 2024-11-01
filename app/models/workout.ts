import { Model, DataTypes } from 'sequelize';
import sequelize from '../db_connection';
import User from './user';

class Workout extends Model {
  declare id: number;
  declare userId: number;
  declare type: string;
  declare duration: number;
  declare intensity: string;
  declare caloriesBurned: number;
}

Workout.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    intensity: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    caloriesBurned: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'workouts',
  }
);

Workout.belongsTo(User, { foreignKey: 'userId' });

export default Workout;