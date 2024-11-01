import { Model, DataTypes } from 'sequelize';
import sequelize from '../db_connection';
import User from './user';

class WorkoutPlan extends Model {
  declare id: number;
  declare userId: number;
  declare goal: string;
  declare plan: string;
}

WorkoutPlan.init(
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
    goal: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    plan: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'workoutPlans',
  }
);

WorkoutPlan.belongsTo(User, { foreignKey: 'userId' });

export default WorkoutPlan;