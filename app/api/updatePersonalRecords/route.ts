import { NextRequest, NextResponse } from 'next/server';
import PersonalRecord from '../../database/models/personalRecord';
import GeneratedWorkout from '../../database/models/generateWorkout';
import sequelize from '../../config/db_connection.mjs';

export async function PUT(req: NextRequest) {
  try {
    const { userId, workoutId, isCompleted } = await req.json();

    if (typeof userId !== 'number' || typeof workoutId !== 'number' || typeof isCompleted !== 'number') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    await sequelize.authenticate();

    const generatedWorkout = await GeneratedWorkout.findOne({ where: { workoutId, userId } });
    if (!generatedWorkout) {
      return NextResponse.json({ error: 'Generated workout not found' }, { status: 404 });
    }

    const personalRecord = await PersonalRecord.findOne({ where: { userId } });
    if (!personalRecord) {
      return NextResponse.json({ error: 'Personal record not found' }, { status: 404 });
    }

    const caloriesBurned = generatedWorkout.caloriesBurned;

    if (isCompleted === 1) {
      personalRecord.totalCaloriesBurned += caloriesBurned;
      personalRecord.totalWorkoutDuration += parseFloat(generatedWorkout.duration);
      personalRecord.totalWorkoutsFinished += 1;
    } else {
      personalRecord.totalCaloriesBurned -= caloriesBurned;
      personalRecord.totalWorkoutDuration -= parseFloat(generatedWorkout.duration);
      personalRecord.totalWorkoutsFinished -= 1;
    }

    await personalRecord.save();

    return NextResponse.json({ message: 'Personal record updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Failed to update personal record', error);
    return NextResponse.json({ error: 'Failed to update personal record' }, { status: 500 });
  }
}