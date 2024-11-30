import { Model, DataTypes } from 'sequelize';
import sequelize from '../db_connection'; // Your database instance
import WorkoutPlan from './workoutPlan'; // Ensure this model is correctly defined
import Workout from './workout'; // Ensure this model is correctly defined

class DailyWorkout extends Model {
  declare id: number;
  declare planId: number;
  declare workoutId: number;
  declare name: string;
  declare description: string;
}

DailyWorkout.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    planId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: WorkoutPlan, key: 'id' },
    },
    workoutId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: Workout, key: 'id' },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'dailyWorkout',
  }
);

// Associations
DailyWorkout.belongsTo(WorkoutPlan, { foreignKey: 'planId' });
DailyWorkout.belongsTo(Workout, { foreignKey: 'workoutId' });

export default DailyWorkout;
