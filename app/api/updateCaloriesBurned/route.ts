// File: /api/updateCaloriesBurned.ts
import { NextRequest, NextResponse } from 'next/server';
import GeneratedWorkout from '../../models/generateWorkout'; // Ensure correct import
import User from '../../models/user';
import Workout from '../../models/workout';
import sequelize from '../../db_connection';

export async function PUT(req: NextRequest) {
  try {
    const { userId, workoutId } = await req.json();

    console.log(`Received userId: ${userId}, workoutId: ${workoutId}`);

    await sequelize.authenticate();

    const user = await User.findByPk(userId);
    if (!user) {
      console.log('User not found');
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log(`Looking for generated workout with id: ${workoutId}`);
    const generatedWorkout = await GeneratedWorkout.findOne({
      where: { userId, workoutId }
    });
    if (!generatedWorkout) {
      console.log('Generated workout not found');
      return NextResponse.json({ error: 'Generated workout not found' }, { status: 404 });
    }

    const workout = await Workout.findByPk(generatedWorkout.workoutId);
    if (!workout) {
      console.log('Workout not found');
      return NextResponse.json({ error: 'Workout not found' }, { status: 404 });
    }

    const duration = parseFloat(generatedWorkout.duration);
    const { METscore } = workout as { METscore: number };
    const { currentBodyWeight } = user as { currentBodyWeight: number };


    console.log(`Duration: ${duration}, METscore: ${METscore}, currentBodyWeight: ${currentBodyWeight}`);
    const caloriesBurned = (duration * METscore * currentBodyWeight) / 200;

    generatedWorkout.caloriesBurned = caloriesBurned;
    await generatedWorkout.save();

    return NextResponse.json({ message: 'Calories burned updated successfully', generatedWorkout }, { status: 200 });
  } catch (error) {
    console.error('Error updating calories burned:', error);
    return NextResponse.json({ error: 'Failed to update calories burned' }, { status: 500 });
  }
}