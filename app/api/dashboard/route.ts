import { NextResponse, NextRequest } from 'next/server';
import WorkoutPlan from '../../models/workoutPlan';
import User from '../../models/user';
import sequelize from '../../db_connection';
import Workout from '@/app/models/workout';
import { Op } from 'sequelize';

export async function POST(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const { userId } = await req.json();

    try {
      await sequelize.authenticate();

      // Check if the user has a workout plan
      const workoutPlans = await WorkoutPlan.findAll({
        where: { userId },
        attributes: ['workoutId'], // Only fetch the workoutId column
    });

    const workoutIds = workoutPlans.map(plan => plan.workoutId);

    const workouts = await Workout.findAll({
      where: { 
        id: { [Op.in]: workoutIds }
      }
    })

    return NextResponse.json({ userId, workouts }, { status: 200 });
    } catch (error) {
      console.error('Error fetching workout plans:', error);
      return NextResponse.json({ error: 'Failed to fetch workout plans' }, { status: 500 });
    }
  }