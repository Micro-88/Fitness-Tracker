import { NextRequest, NextResponse } from 'next/server';
import Workout from '../../database/models/workout'; // Adjust the path based on your directory structure
import sequelize from '../../config/db_connection.mjs';

// GET /api/workoutController?id={id} (Single workout) or GET /api/workoutController (All workouts)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const workoutId = searchParams.get('id');

  try {
    await sequelize.authenticate();

    if (workoutId) {
      const workout = await Workout.findByPk(workoutId as string);
      if (!workout) {
        return NextResponse.json({ error: 'Workout not found' }, { status: 404 });
      }
      return NextResponse.json(workout, { status: 200 });
    } else {
      const workouts = await Workout.findAll();
      return NextResponse.json(workouts, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching workouts:', error);
    return NextResponse.json({ error: 'Failed to fetch workouts' }, { status: 500 });
  }
}

// POST /api/workoutController (Create workout)
export async function POST(req: NextRequest) {
  try {
    const { name, description, goal, level, equipment, duration, muscleGroup, instructions } = await req.json();
    await sequelize.authenticate();
    const newWorkout = await Workout.create({
      name,
      description,
      goal,
      level,
      equipment,
      duration,
      muscleGroup,
      instructions,
    });
    return NextResponse.json(newWorkout, { status: 201 });
  } catch (error) {
    console.error('Error creating workout:', error);
    return NextResponse.json({ error: 'Failed to create workout' }, { status: 500 });
  }
}

// PUT /api/workoutController
export async function PUT(req: NextRequest) {
  try {
    const { id, name, description, goal, level, equipment, duration, muscleGroup, instructions } = await req.json();
    await sequelize.authenticate();
    const workout = await Workout.findByPk(id as string);
    if (!workout) {
      return NextResponse.json({ error: 'Workout not found' }, { status: 404 });
    }
    workout.name = name || workout.name;
    workout.description = description || workout.description;
    workout.goal = goal || workout.goal;
    workout.level = level || workout.level;
    workout.equipment = equipment || workout.equipment;
    workout.duration = duration || workout.duration;
    workout.muscleGroup = muscleGroup || workout.muscleGroup;
    workout.instructions = instructions || workout.instructions;
    await workout.save();
    return NextResponse.json(workout, { status: 200 });
  } catch (error) {
    console.error('Error updating workout:', error);
    return NextResponse.json({ error: 'Failed to update workout' }, { status: 500 });
  }
}

// DELETE /api/workoutController?id={id}
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const workoutId = searchParams.get('id');

  try {
    await sequelize.authenticate();
    const workout = await Workout.findByPk(workoutId as string);
    if (!workout) {
      return NextResponse.json({ error: 'Workout not found' }, { status: 404 });
    }
    await workout.destroy();
    return NextResponse.json({ message: 'Workout deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting workout:', error);
    return NextResponse.json({ error: 'Failed to delete workout' }, { status: 500 });
  }
}
