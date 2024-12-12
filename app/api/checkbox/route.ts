import { NextResponse, NextRequest } from 'next/server';
import sequelize from '../../db_connection';
import GeneratedWorkout from '@/app/models/generateWorkout';

export async function POST(req: NextRequest) {
    const { userId, workoutId, checked } = await req.json(); // Accept both userId and workoutId
    
    console.log(userId);
    console.log(workoutId);
    console.log(checked);

    const isCompleted = checked
    try {

        await sequelize.authenticate();
        // Step 1: Attempt to update the isCompleted column
        const [updatedCount] = await GeneratedWorkout.update(
            { isCompleted }, // Set isCompleted to the value received from the frontend
            { where: { userId, workoutId } } // Match the row based on userId and workoutId
        );

        // Step 2: Check if any row was updated
        if (updatedCount === 0) {
            return NextResponse.json(
                { error: 'No matching workout found for the user' },
                { status: 404 }
            );
        }

        // Step 3: Respond with success
        return NextResponse.json(
            { message: 'Workout status updated successfully', userId, workoutId, isCompleted },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching workout plans:', error);
        return NextResponse.json({ error: 'Failed to fetch workout plans' }, { status: 500 });
    }
  }