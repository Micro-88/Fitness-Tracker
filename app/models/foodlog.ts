import { Model, DataTypes } from 'sequelize';
import sequelize from '../db_connection.mjs'; // Your database instance
import User from './user'; // Ensure User model is defined and imported

class FoodLog extends Model {
  declare id: number;
  declare userId: number; // Corrected the typo
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
    tableName: 'FoodLog', // Ensure the table name matches the migration
    timestamps: true, // Sequelize will automatically handle createdAt and updatedAt
  }
);

// Associations
FoodLog.belongsTo(User, { foreignKey: 'userId' });

export default FoodLog;
