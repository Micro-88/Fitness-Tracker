import { NextResponse, NextRequest } from 'next/server';
import WorkoutPlan from '../../models/workoutPlan';
import Workout from '../../models/workout';
import sequelize from '../../db_connection';

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
        equipment,   // Match the equipment
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

    // const userId = userId;  // Assuming a fixed userId (you may need to replace this with dynamic input)
    const name = 'My Custom Workout Plan';  // Replace with actual name
    const description = 'A description of the workout plan.';  // Replace with actual description

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

