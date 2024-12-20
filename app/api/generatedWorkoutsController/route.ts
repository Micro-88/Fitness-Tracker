import { NextRequest, NextResponse } from 'next/server';
import GeneratedWorkout from '../../database/models/generateWorkout'; 
import sequelize from '../../config/db_connection.mjs'; 

// GET /api/generatedWorkoutController?id={id} (Single GeneratedWorkout) or GET /api/generatedWorkoutController (All GeneratedWorkouts)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const generatedWorkoutId = searchParams.get('id');

  try {
    await sequelize.authenticate();

    if (generatedWorkoutId) {
      // Fetch a single generated workout by its ID
      const generatedWorkout = await GeneratedWorkout.findByPk(generatedWorkoutId as string);
      if (!generatedWorkout) {
        return NextResponse.json({ error: 'Generated Workout not found' }, { status: 404 });
      }
      return NextResponse.json(generatedWorkout, { status: 200 });
    } else {
      // Fetch all generated workouts
      const generatedWorkouts = await GeneratedWorkout.findAll();
      return NextResponse.json(generatedWorkouts, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching generated workouts:', error);
    return NextResponse.json({ error: 'Failed to fetch generated workouts' }, { status: 500 });
  }
}

// POST /api/generatedWorkoutController (Create Generated Workout)
export async function POST(req: NextRequest) {
  try {
    const { workoutId, userId, duration, intensity, instructions, description, caloriesBurned} = await req.json();

    if (!userId || !workoutId || !duration ) {
        return NextResponse.json(
          { error: 'Missing required fields: userId, workoutId, duration' },
          { status: 400 } // Bad Request
        );
      }

    // Authenticate the Sequelize connection
    await sequelize.authenticate();

    // Create a new generated workout
    const newGeneratedWorkout = await GeneratedWorkout.create({
      workoutId,
      userId,
      duration,
      intensity,
      instructions,
      description,
      caloriesBurned,
    });

    // Return the newly created generated workout as JSON with status 201 (Created)
    return NextResponse.json(newGeneratedWorkout, { status: 201 });
  } catch (error) {
    console.error('Error creating generated workout:', error);
    return NextResponse.json({ error: 'Failed to create generated workout' }, { status: 500 });
  }
}

// PUT /api/generatedWorkoutController (Update Generated Workout)
export async function PUT(req: NextRequest) {
  try {
    const { id, workoutId, userId, duration, intensity, instructions, description, caloriesBurned } = await req.json();
    
    // Authenticate the database connection
    await sequelize.authenticate();

    // Find the generated workout by its ID
    const generatedWorkout = await GeneratedWorkout.findByPk(id);
    if (!generatedWorkout) {
      return NextResponse.json({ error: 'Generated Workout not found' }, { status: 404 });
    }

    // Update the fields of the generated workout
    generatedWorkout.workoutId = workoutId;
    generatedWorkout.userId = userId || generatedWorkout.userId;
    generatedWorkout.duration = duration || generatedWorkout.duration;
    generatedWorkout.intensity = intensity || generatedWorkout.intensity;
    generatedWorkout.instructions = instructions || generatedWorkout.instructions;
    generatedWorkout.description = description || generatedWorkout.description;
    generatedWorkout.caloriesBurned = caloriesBurned || generatedWorkout.caloriesBurned;

    // Save the updated generated workout
    await generatedWorkout.save();

    return NextResponse.json(generatedWorkout, { status: 200 });
  } catch (error) {
    console.error('Error updating generated workout:', error);
    return NextResponse.json({ error: 'Failed to update generated workout' }, { status: 500 });
  }
}


