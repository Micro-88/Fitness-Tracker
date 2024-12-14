import { NextResponse, NextRequest } from 'next/server';
import sequelize from '../../db_connection';
import GeneratedWorkout from '@/app/models/generateWorkout';
import Chart from '@/app/models/chart';
import { Op } from 'sequelize';

export async function POST(req: NextRequest) {
    const { userId, workoutId, checked } = await req.json(); // Accept both userId and workoutId
    const dateToday = new Date();

    const year = dateToday.getFullYear();
    const month = String(dateToday.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(dateToday.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

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

        const chartEntry = await Chart.findOne({
            where: {
              userId,
              date: formattedDate, // Match the date
            },
          });

        if (chartEntry) {
            // Increment or decrement the progress column
            const newProgress = checked
                ? chartEntry.progress + 1 // Add 1 if checkbox is checked
                : chartEntry.progress - 1; // Subtract 1 if checkbox is unchecked

            // Ensure progress doesn't drop below zero
            chartEntry.progress = Math.max(newProgress, 0);
            
            await chartEntry.save();

            console.log('Updated progress in chart:', chartEntry.progress);
        } else if (checked) {
            // If no entry exists for today and checkbox is checked, create a new one
            const newChartEntry = await Chart.create({
                userId,
                date: new Date(),
                progress: 1, // Start progress with 1 for the first check
            });

            console.log('New chart entry created:', newChartEntry);
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