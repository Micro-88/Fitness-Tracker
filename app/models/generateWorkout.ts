import { Model, DataTypes } from 'sequelize';
import sequelize from '../db_connection'; // Your database instance
import User from './user'; // Ensure User model is defined and imported
import Workout from './workout'; // Ensure Workout model is defined and imported

class GeneratedWorkout extends Model {
  declare id: number;
  declare workoutId: number;
  declare userId: number; // Corrected the typo
  declare duration: string;
  declare intensity: string;
  declare instructions: string;
  declare description: string;
  declare caloriesBurned: number;
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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'GeneratedWorkout', // Consistent with model name
    tableName: 'GeneratedWorkouts', // Ensure the table name matches the migration
    timestamps: true, // Sequelize will automatically handle createdAt and updatedAt
  }
);

// Associations
GeneratedWorkout.belongsTo(User, { foreignKey: 'userId' });
GeneratedWorkout.belongsTo(Workout, { foreignKey: 'workoutId' });

export default GeneratedWorkout;
