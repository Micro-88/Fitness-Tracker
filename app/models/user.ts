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
  declare currentBodyWeight: number;            // added currentBodyWeight
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    gender: {                                                       //added gender and age
      type: DataTypes.ENUM('male', 'female'),
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    currentBodyWeight: {                                            // added currentBodyWeight
      type: DataTypes.FLOAT,
      allowNull: true, 
    },
  },
  {
    sequelize,
    tableName: 'users',
    hooks: {
      afterCreate: async (user) => {
        const PersonalRecord = (await import('./personalRecord')).default;
        await PersonalRecord.create({
          userId: user.id,
          totalCaloriesBurned: 0,
          totalWorkoutDuration: 0,
          totalWorkoutsFinished: 0,
        });
      },
    },
  }
);

export default User;