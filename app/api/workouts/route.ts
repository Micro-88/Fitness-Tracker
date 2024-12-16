import { NextRequest, NextResponse } from 'next/server';
import Workout from '../../database/models/workout';
import sequelize from '../../config/db_connection.mjs';

export async function POST(req: NextRequest) {
  try {
    const { userId, workoutID, name, description} = await req.json();
    await sequelize.authenticate();
    const newWorkout = await Workout.create({ userId, workoutID, name, description});
    return NextResponse.json(newWorkout, { status: 201 });
  } catch (error) {
    console.error('Error logging workout:', error);
    return NextResponse.json({ error: 'Failed to log workout' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  try {
    await sequelize.authenticate();
    const workouts = await Workout.findAll({ where: { userId } });
    return NextResponse.json(workouts, { status: 200 });
  } catch (error) {
    console.error('Error fetching workouts:', error);
    return NextResponse.json({ error: 'Failed to fetch workouts' }, { status: 500 });
  }
}