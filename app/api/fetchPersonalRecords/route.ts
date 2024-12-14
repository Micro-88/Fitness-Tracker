import { NextRequest, NextResponse } from 'next/server';
import GeneratedWorkout from '../../models/generateWorkout';
import PersonalRecord from '../../models/personalRecord';
import sequelize from '../../db_connection';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  try {
    await sequelize.authenticate();

    const completedWorkouts = await GeneratedWorkout.findAll({
      where: { userId, isCompleted: 1 },
    });

    const totalCaloriesBurned = completedWorkouts.reduce((sum, workout) => sum + parseInt(workout.caloriesBurned.toString(), 10), 0);
    const totalWorkoutDuration = completedWorkouts.reduce((sum, workout) => sum + parseInt(workout.duration.toString(), 10), 0);
    const totalWorkoutsFinished = completedWorkouts.length;

    const personalRecords = {
      totalCaloriesBurned,
      totalWorkoutDuration,
      totalWorkoutsFinished,
    };

    // Update the personalRecords table
    await PersonalRecord.upsert({
      userId,
      totalCaloriesBurned,
      totalWorkoutDuration,
      totalWorkoutsFinished,
    });

    return NextResponse.json(personalRecords, { status: 200 });
  } catch (error){
    console.error('Error fetching personal records:', error);
    return NextResponse.json({ error: 'Failed to fetch personal records' }, { status: 500 });
  }
}