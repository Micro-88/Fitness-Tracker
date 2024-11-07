import { NextRequest, NextResponse } from 'next/server';
import WorkoutPlan from '../../models/workoutPlan';
import sequelize from '../../db_connection';

export async function POST(req: NextRequest) {
  try {
    const { userId, goal, plan } = await req.json();
    await sequelize.authenticate();
    const newWorkoutPlan = await WorkoutPlan.create({ userId, goal, plan });
    return NextResponse.json(newWorkoutPlan, { status: 201 });
  } catch (error) {
    console.error('Error creating workout plan:', error);
    return NextResponse.json({ error: 'Failed to create workout plan' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  try {
    await sequelize.authenticate();
    const workoutPlans = await WorkoutPlan.findAll({ where: { userId } });
    return NextResponse.json(workoutPlans, { status: 200 });
  } catch (error) {
    console.error('Error fetching workout plans:', error);
    return NextResponse.json({ error: 'Failed to fetch workout plans' }, { status: 500 });
  }
}