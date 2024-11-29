import { NextRequest, NextResponse } from 'next/server';
import WorkoutPlan from '../../models/workoutPlan';
import sequelize from '../../db_connection';

// GET /api/workoutPlanController?id={id} (Single workoutPlan) or GET /api/workoutPlanController (All workoutPlans)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const workoutPlanId = searchParams.get('id');

  try {
    await sequelize.authenticate();

    if (workoutPlanId) {
      const workoutPlan = await WorkoutPlan.findByPk(workoutPlanId as string);
      if (!workoutPlan) {
        return NextResponse.json({ error: 'Workout Plan not found' }, { status: 404 });
      }
      return NextResponse.json(workoutPlan, { status: 200 });
    } else {
      const workoutPlans = await WorkoutPlan.findAll();
      return NextResponse.json(workoutPlans, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching workout plans:', error);
    return NextResponse.json({ error: 'Failed to fetch workout plans' }, { status: 500 });
  }
}

// POST /api/workoutPlanController (Create workoutPlan)
export async function POST(req: NextRequest) {
  try {
    const { userId, workoutId, name, description } = await req.json();
    await sequelize.authenticate();
    const newWorkoutPlan = await WorkoutPlan.create({ userId, workoutId, name, description });
    return NextResponse.json(newWorkoutPlan, { status: 201 });
  } catch (error) {
    console.error('Error creating workout plan:', error);
    return NextResponse.json({ error: 'Failed to create workout plan' }, { status: 500 });
  }
}

// PUT /api/workoutPlanController (Update workoutPlan)
export async function PUT(req: NextRequest) {
  try {
    const { id, name, description } = await req.json();
    await sequelize.authenticate();
    const workoutPlan = await WorkoutPlan.findByPk(id as string);
    if (!workoutPlan) {
      return NextResponse.json({ error: 'Workout Plan not found' }, { status: 404 });
    }
    workoutPlan.name = name || workoutPlan.name;
    workoutPlan.description = description || workoutPlan.description;
    await workoutPlan.save();
    return NextResponse.json(workoutPlan, { status: 200 });
  } catch (error) {
    console.error('Error updating workout plan:', error);
    return NextResponse.json({ error: 'Failed to update workout plan' }, { status: 500 });
  }
}

// DELETE /api/workoutPlanController?id={id}
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const workoutPlanId = searchParams.get('id');

  try {
    await sequelize.authenticate();
    const workoutPlan = await WorkoutPlan.findByPk(workoutPlanId as string);
    if (!workoutPlan) {
      return NextResponse.json({ error: 'Workout Plan not found' }, { status: 404 });
    }
    await workoutPlan.destroy();
    return NextResponse.json({ message: 'Workout Plan deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting workout plan:', error);
    return NextResponse.json({ error: 'Failed to delete workout plan' }, { status: 500 });
  }
}
