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
      const workoutPlans = await WorkoutPlan.findAll({
        where: { userId: 1 },
        attributes: ['workoutId'], // Only fetch the workoutId column
    });
    
    const workoutIds = workoutPlans.map(plan => plan.workoutId);

    return NextResponse.json({ userId, workoutIds }, { status: 200 });
    } catch (error) {
      console.error('Error fetching workout plans:', error);
      return NextResponse.json({ error: 'Failed to fetch workout plans' }, { status: 500 });
    }
  }