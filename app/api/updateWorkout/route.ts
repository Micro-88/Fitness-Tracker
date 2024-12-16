import { NextRequest, NextResponse } from 'next/server';
import GeneratedWorkout from '../../models/generateWorkout';
import sequelize from '../../db_connection.mjs';

export async function PUT(req: NextRequest) {
  try {
    const { workoutId, isCompleted } = await req.json();

    if (typeof workoutId !== 'number' || typeof isCompleted !== 'number') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    await sequelize.authenticate();

    const generatedWorkout = await GeneratedWorkout.findOne({ where: { workoutId } });
    if (!generatedWorkout) {
      return NextResponse.json({ error: 'Generated workout not found' }, { status: 404 });
    }

    generatedWorkout.isCompleted = isCompleted === 1; // Convert number to boolean
    await generatedWorkout.save();

    return NextResponse.json({ message: 'Generated workout updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Failed to update generated workout', error);
    return NextResponse.json({ error: 'Failed to update generated workout' }, { status: 500 });
  }
}