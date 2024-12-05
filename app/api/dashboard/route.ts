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

      // Check if the user has a workout plan
      const generatedWorkouts = await GeneratedWorkout.findAll({
        where: { userId },
        attributes: ['workoutId'], // Only fetch the workoutId column
    });

    const workoutIds = generatedWorkouts.map(workout => workout.workoutId);

    if (workoutIds.length === 0) {
      return NextResponse.json({ error: 'No workouts found for the user in generated workouts' }, { status: 404 });
  }

    const workouts = await Workout.findAll({
      where: { 
        id: { [Op.in]: workoutIds }
      }
    })

    // Pass the fetched workouts to the generateWorkout API
    // const response = await fetch(`../generatedWorkout`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ userId, workouts }),
    // });

    return NextResponse.json({ userId, workouts }, { status: 200 });
    } catch (error) {
      console.error('Error fetching workout plans:', error);
      return NextResponse.json({ error: 'Failed to fetch workout plans' }, { status: 500 });
    }
  }