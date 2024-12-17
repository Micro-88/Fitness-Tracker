import { NextResponse, NextRequest } from 'next/server';
import sequelize from '../../config/db_connection.mjs';
import Workout from '@/app/database/models/workout';
import { Op } from 'sequelize';
import GeneratedWorkout from '@/app/database/models/generateWorkout';

export async function POST(req: NextRequest) {
    const { userId } = await req.json();
    
    try {

      await sequelize.authenticate();

      // Step 1: Fetch all generated workouts for the user
      const generatedWorkouts = await GeneratedWorkout.findAll({
        where: { userId },
        attributes: [
          'workoutId', 
          'duration', 
          'intensity', 
          'instructions', 
          'description', 
          'isCompleted'
        ], // Fetch specific columns from the generatedWorkouts table
    });

    if (generatedWorkouts.length === 0) {
      return NextResponse.json(
          { message: 'No workout plans found for this user.' },
          { status: 200 }
      );
    }

    const workoutIds = generatedWorkouts.map(workout => workout.workoutId);

    if (workoutIds.length === 0) {
      return NextResponse.json({ error: 'No workouts found for the user in generated workouts' }, { status: 404 });
  }
    // Step 2: Fetch the workouts that match the workoutIds
    const workouts = await Workout.findAll({
      where: { 
        id: { [Op.in]: workoutIds }
      },
      attributes: ['id', 'name', 'equipment'],
    })

    // Step 3: Merge the data from GeneratedWorkout and Workout to create DisplayWorkouts
    const displayWorkouts = generatedWorkouts.map((generatedWorkout) => {
      const workout = workouts.find(w => w.id === generatedWorkout.workoutId);

      if (workout) {
        
        return {
          workoutId: workout.id,
          workoutName: workout.name,
          equipment: workout.equipment,
          duration: generatedWorkout.duration,
          intensity: generatedWorkout.intensity,
          instructions: generatedWorkout.instructions,
          description: generatedWorkout.description, 
          isCompleted: generatedWorkout.isCompleted,
        };
      }
      return null; // If no matching workout is found
    }).filter(Boolean); // Filter out null values

    // Step 4: Respond with the displayWorkouts
    return NextResponse.json({ userId, displayWorkouts }, { status: 200 });
    } catch (error) {
      console.error('Error fetching workout plans:', error);
      return NextResponse.json({ error: 'Failed to fetch workout plans' }, { status: 500 });
    }
  }