import { NextResponse } from 'next/server';
import { Op } from 'sequelize'; // Import Op from Sequelize
import WorkoutPlan from '../../models/workoutPlan';
import Workout from '../../models/workout';
import { NextRequest } from 'next/server';

// POST request to create a workout plan based on user input
export async function POST(req: NextRequest) {
  try {
    const { goal, level, equipment } = await req.json(); // Removed gender and age

    // Query the workouts table for workouts that match the user's criteria
    const workouts = await Workout.findAll({
        where: {
          [Op.or]: [
            { goal: goal },
            { level: level },
            { equipment: { [Op.in]: equipment } }
          ]
        }
      });

    if (workouts.length === 0) {
      return NextResponse.json(
        { message: 'No matching workouts found for your criteria' },
        { status: 404 }
      );
    }

    // Loop through workouts and create a new WorkoutPlan for each one
    for (const workout of workouts) {
        await WorkoutPlan.create({
          userId: 1, // Replace this with the actual user's ID
          workoutId: workout.id,
          name: "Plan-A", // Make sure Plan-A is in quotes to be treated as a string
          description: "A workout plan for user 1", // Ensure description is a string
        });
      }
      

    return NextResponse.json({ message: 'Workout plan created successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create workout plan' }, { status: 500 });
  }
}
