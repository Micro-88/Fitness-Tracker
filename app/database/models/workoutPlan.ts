import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/db_connection.mjs'; 
import User from './user'; 
import Workout from './workout'; 

class WorkoutPlan extends Model {
  declare id: number;
  declare userId: number;
  declare workoutId: number;
  declare name: string;                       
  declare description: string;
}

WorkoutPlan.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: User, key: 'id' },
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
  { sequelize, modelName: 'WorkoutPlan' }
);

// Associations
WorkoutPlan.belongsTo(User, { foreignKey: 'userId' });
WorkoutPlan.belongsTo(Workout, { foreignKey: 'workoutId' });

export default WorkoutPlan;
