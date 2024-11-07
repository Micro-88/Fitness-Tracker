import { Model, DataTypes } from 'sequelize';
import sequelize from '../db_connection';
import User from './user';

class PersonalRecord extends Model {
  declare id: number;
  declare userId: number;
  declare workoutType: string;
  declare record: string;
}

PersonalRecord.init(
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
    workoutType: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    record: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'personalRecords',
  }
);

PersonalRecord.belongsTo(User, { foreignKey: 'userId' });

export default PersonalRecord;