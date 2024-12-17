import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/db_connection.mjs'; 
import User from './user'; 
import Workout from './workout'; 

class GeneratedWorkout extends Model {
  declare id: number;
  declare workoutId: number;
  declare userId: number; 
  declare duration: string;
  declare intensity: string;
  declare instructions: string;
  declare description: string;
  declare caloriesBurned: number; 
  declare isCompleted: boolean; 
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
      allowNull: false, // Set to false if duration is required
    },
    intensity: {
      type: DataTypes.STRING,
      allowNull: true, // Made nullable as intensity can be optional
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: true, // Made nullable as instructions can be optional
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true, // Allowing description to be nullable as per migration
    },
    caloriesBurned: {
      type: DataTypes.FLOAT, // Corrected the data type
      allowNull: true, // Made nullable as calories burned can be optional
    },
    isCompleted: {
      type: DataTypes.BOOLEAN, 
      allowNull: false, // Mark as required
      defaultValue: false, // Default value is false
    },
  },
  {
    sequelize,
    modelName: 'GeneratedWorkout', 
    tableName: 'GeneratedWorkouts', 
    timestamps: true, // Sequelize will automatically handle createdAt and updatedAt
  }
);

// Associations
GeneratedWorkout.belongsTo(User, { foreignKey: 'userId' });
GeneratedWorkout.belongsTo(Workout, { foreignKey: 'workoutId' });

export default GeneratedWorkout;
