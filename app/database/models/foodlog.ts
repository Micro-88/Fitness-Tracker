import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/db_connection.mjs'; 
import User from './user'; 

class FoodLog extends Model {
  declare id: number;
  declare userId: number; 
  declare food_name: string;
  declare calories: string;
}

FoodLog.init(
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
    food_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    calories: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'FoodLog', 
    timestamps: true, 
  }
);

// Associations
FoodLog.belongsTo(User, { foreignKey: 'userId' });

export default FoodLog;
