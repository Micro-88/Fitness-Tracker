import { NextResponse, NextRequest } from 'next/server';
import WorkoutPlan from '../../models/workoutPlan';
import User from '../../models/user';
import sequelize from '../../db_connection';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
  
    try {
      await sequelize.authenticate();

      // Check if the user has a workout plan
      const workoutPlan = await WorkoutPlan.findOne({ 
        where: { userId: userId }, // Query for the user's workout plan
      });
  
      if (workoutPlan) {
        // User has a workout plan
        return NextResponse.json({ hasWorkoutPlan: true, workoutPlan }, { status: 200 });
      } else {
        // User does not have a workout plan
        return NextResponse.json({ hasWorkoutPlan: false }, { status: 200 });
      }
    } catch (error) {
      console.error('Error fetching workout plans:', error);
      return NextResponse.json({ error: 'Failed to fetch workout plans' }, { status: 500 });
    }
  }