import { NextResponse, NextRequest } from 'next/server';
import WorkoutPlan from '../../models/workoutPlan';
import DailyWorkout from '../../models/dailyWorkout';
import Workout from '../../models/workout';
import get from 'lodash/get';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
    try {
      // Query the workouts table for workouts that match the user's criteria
      const workouts = await WorkoutPlan.findAll({
        where: {
          userId: 1, // Replace with the actual user ID
        },
        include: [{
          model: Workout,
          attributes: ['id', 'name', 'muscleGroup'], // Select workout ID, name, and muscle group from the workouts table
        }]
      });

    if (workouts.length === 0) {
        return NextResponse.json(
            { message: 'No matching workouts found for your criteria' },
            { status: 404 }
        );
    }

    // Extract and structure the results
    const workoutDetails = workouts.map(workoutPlan => ({
      workoutId: get(workoutPlan, 'Workout.id'),
      workoutName: get(workoutPlan, 'Workout.name'),
      muscleGroup: get(workoutPlan, 'Workout.muscleGroup'),
    }));

    const formattedPrompt = `
      Here are the details of the workouts for the user with userId 1:
      ${workoutDetails.map(workout => `- Workout ID: ${workout.workoutId}, Name: ${workout.workoutName}, Muscle Group: ${workout.muscleGroup}`).join('\n')}

      Based on these workouts, select only the workout IDs that contribute to a balanced workout plan. A balanced workout plan should target different muscle groups (e.g., push, pull, legs, etc.) and include exercises for both strength and endurance. Please provide only the Workout IDs that would make a balanced workout.
    `;

    // Ensure the API key is loaded
    if (!process.env.GEMINI_API_KEY) {
      console.error("Gemini API Key is missing");
      return NextResponse.json(
        { error: "Internal Server Error: API Key is missing" },
        { status: 500 }
      );
    }

    // Create an instance of the Gemini AI model
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Send the prompt to Gemini AI
    const result = await model.generateContent(formattedPrompt);
    const response = await result.response;
    const output = await response.text();
    
    // Extract the Workout IDs from the Gemini response using a regular expression
    const workoutIds = output.match(/Workout ID: (\d+)/g);
    // const extractedIds = workoutIds ? workoutIds.map(id => id.match(/\d+/)[0]) : [];

    // Send the prompt to Gemini (or whatever system you're using for further processing)
    console.log(formattedPrompt);  // You can now send the prompt to Gemini
  
      return NextResponse.json({ message: 'Workout plan created successfully' });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to create workout plan' }, { status: 500 });
    }
  }
