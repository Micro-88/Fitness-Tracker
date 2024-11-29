import { Model, DataTypes } from 'sequelize';
import sequelize from '../db_connection'; // Your database instance

enum Goal {                                  
  Lose_Weight = 'Lose Weight', 
  Gain_Strength = 'Gain Strength',
  Gain_Muscle = 'Gain Muscle',
}

enum Level {                                  
  Novice = 'Novice',
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

enum Equipment {                                  
  Barbells ='Barbells',
  Dumbbells = 'Dumbbells',
  BodyWeight = 'BodyWeight',
  Machine = 'Machine',
  Kettlebells = 'Kettlebells',
  Cables = 'Cables',
  Bands = 'Bands',
}
class Workout extends Model {
  declare id: number;
  declare name: string;
  declare description: string;;
  declare goal: Goal;                       
  declare level: Level;
  declare equipment: Equipment;
  declare duration: number;
  declare muscleGroup: string;
  declare instructions: string;
}

Workout.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    goal: {
      type: DataTypes.ENUM('Lose_Weight', 'Gain_Strength', 'Gain_Muscle'),
      allowNull: false,
    },
    level: {
      type: DataTypes.ENUM('Novice', 'Beginner', 'Intermediate', 'Advanced'),
      allowNull: false,
    },
    equipment: {
      type: DataTypes.ENUM('Barbells', 'Dumbbells', 'BodyWeight', 'Machine', 'Kettlebells', 'Cables', 'Bands'),
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    muscleGroup: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instructions: {
      type: DataTypes.TEXT,
    },
  },
  { sequelize, modelName: 'Workout' }
);

export default Workout;
