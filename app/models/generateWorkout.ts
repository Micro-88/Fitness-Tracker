import { Model, DataTypes } from 'sequelize';
import sequelize from '../db_connection'; // Your database instance
import User from './user'; // Use import instead of require
import Workout from './workout'; // Ensure this model is correctly defined

class GeneratedWorkout extends Model {
  declare id: number;
  declare workoutId: number;
  declare usertId: number;
  declare duration: string;
  declare intensity: string;
  declare instructions: string;
  declare description: string;
}

GeneratedWorkout.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    workoutId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: Workout, key: 'id' },
    },
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: User, key: 'id' },
      },
    duration: {
        type: DataTypes.STRING,
    },
    intensity: {
        type: DataTypes.STRING,
    },
    instructions: {
        type: DataTypes.TEXT,
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
GeneratedWorkout.belongsTo(User, { foreignKey: 'userId' });
GeneratedWorkout.belongsTo(Workout, { foreignKey: 'workoutId' });

export default GeneratedWorkout;
