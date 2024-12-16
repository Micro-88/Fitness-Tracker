import { Model, DataTypes } from 'sequelize';
import sequelize from '../db_connection.mjs'; // Your database instance
import User from './user'; // Ensure User model is defined and imported

class Chart extends Model {
  declare id: number;
  declare userId: number;
  declare date: Date;
  declare progress: number;
}

Chart.init(
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
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    progress: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // Progress starts at 0
    },
  },
  {
    sequelize,
    tableName: 'Chart', // Ensure the table name matches the migration
    timestamps: true, // Sequelize will automatically handle createdAt and updatedAt
  }
);

// Associations
Chart.belongsTo(User, { foreignKey: 'userId' });

export default Chart;
