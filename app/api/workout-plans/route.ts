import { NextResponse, NextRequest } from 'next/server';
import WorkoutPlan from '../../models/workoutPlan';
import Workout from '../../models/workout';
import sequelize from '../../db_connection';
import { Op } from 'sequelize';  // Import Op for the 'in' operator

// POST request to create a workout plan based on user input
export async function POST(req: NextRequest) {
  try {
    const { goal, level, equipment, userId } = await req.json(); // Removed gender and age
    await sequelize.authenticate();

    // Query the workouts table for workouts that match the user's criteria
    const workoutIds = await Workout.findAll({
      attributes: ['id'],  // Select the 'id' column from the Workout model
      where: {
        goal,        // Match the goal
        level,       // Match the level
        equipment: {
          [Op.in]: equipment,  // Match any of the provided equipment
        },
      },
    });
      
    if (workoutIds.length === 0) {
      return NextResponse.json(
        { message: 'No matching workouts found for your criteria' },
        { status: 404 }
      );
    }

    // Map the workoutIds correctly (reference 'id' from Workout)
    const workoutIdArray = workoutIds.map(workout => workout.id);

    const name = `Plan for User ${userId}`;
    const description = `A workout plan for User: ${userId}`;

    const workoutPlanData = workoutIdArray.map(workoutId => ({
      userId,
      workoutId,
      name,
      description,
    }));

    // Create workout plans in bulk
    await WorkoutPlan.bulkCreate(workoutPlanData);

    return NextResponse.json({ message: 'Workout plan created successfully' });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create workout plan' }, { status: 500 });
  }
}

