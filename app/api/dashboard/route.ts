import { NextResponse, NextRequest } from 'next/server';
import WorkoutPlan from '../../models/workoutPlan';
import sequelize from '../../db_connection';
import Workout from '@/app/models/workout';
import { Op } from 'sequelize';
import GeneratedWorkout from '@/app/models/generateWorkout';

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
          'caloriesBurned',
        ], // Fetch specific columns from the generatedWorkouts table
    });

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
          caloriesBurned: generatedWorkout.caloriesBurned,
        };
      }
      return null; // If no matching workout is found
    }).filter(Boolean); // Filter out null values

    // Step 4: Return the DisplayWorkouts to the front-end
    console.log('!!!!!!!!!!!!!!!!!!!!!Test START HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log('!!!!!!!!!!!!!!!!!!!!!Test START HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log('!!!!!!!!!!!!!!!!!!!!!Test START HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log('!!!!!!!!!!!!!!!!!!!!!Test START HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log(displayWorkouts);
    console.log('!!!!!!!!!!!!!!!!!!!!!Test END HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log('!!!!!!!!!!!!!!!!!!!!!Test END HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log('!!!!!!!!!!!!!!!!!!!!!Test END HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log('!!!!!!!!!!!!!!!!!!!!!Test END HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

    return NextResponse.json({ userId, displayWorkouts }, { status: 200 });
    } catch (error) {
      console.error('Error fetching workout plans:', error);
      return NextResponse.json({ error: 'Failed to fetch workout plans' }, { status: 500 });
    }
  }