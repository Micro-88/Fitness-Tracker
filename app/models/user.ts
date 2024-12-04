import { Model, DataTypes } from 'sequelize';
import sequelize from '../db_connection';

enum Gender {                                  //made enum for gender
    Male = 'Male',
    Female = 'Female',
  }
class User extends Model {
  declare id: number;
  declare username: string;
  declare password: string;
  declare gender: Gender;                       //added gender and age
  declare age: number;
  declare isDeleted: boolean;              //added isDeleted for user soft delete
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
        gender: {                                                       //added gender and age
            type: DataTypes.ENUM('male', 'female'),
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        isDeleted: {                              //added isDeleted for user soft delete
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },  
    {
        sequelize,
        tableName: 'users',
    }
);

export default User;