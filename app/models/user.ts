import { Model, DataTypes } from 'sequelize';
import sequelize from '../db_connection';

class User extends Model {
  declare id: number;
  declare username: string;
  declare password: string;
  declare firstname: string;
}

User.init(
    {
        id:{
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        age: { 
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        gender: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
    },
    {
        sequelize,
        tableName: 'users',
    }
);

export default User;