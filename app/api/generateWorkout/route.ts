import { NextResponse, NextRequest } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import GeneratedWorkout from '@/app/models/generateWorkout';
import WorkoutPlan from '../../models/workoutPlan';
import sequelize from '../../db_connection';
import Workout from '@/app/models/workout';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    // Ensure the Gemini API Key is loaded
    if (!process.env.GEMINI_API_KEY) {
        console.error("Gemini API Key is missing");
        return NextResponse.json(
          { error: "Internal Server Error: API Key is missing" },
          { status: 500 }
        );
      }

    // Log incoming request data
    console.log('User ID:', userId);

    // Fetch existing workout plans from the workoutPlan table
    const existingWorkoutPlans = await WorkoutPlan.findAll({
        attributes: ['userId', 'workoutId'],
      });
  
    // Log the retrieved data
    // console.log('Existing workout plans from workoutPlan table:', existingWorkoutPlans);

      // Extract all workoutIds from the workoutPlan table
    const workoutIds = existingWorkoutPlans.map(plan => plan.workoutId);
    
    const workoutsDetails = await Workout.findAll({
        where: {
          id: workoutIds,  // Filter by workoutIds
        },
      });

    // Log the detailed workout information
    // console.log('Workout details from Workout table:', workoutsDetails);

    // Filter specific workout information
    const specificWorkoutData = workoutsDetails.map(workout => ({
      id: workout.id,
      name: workout.name,
    }));

    // Integrate Gemini Chatbot
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Format the filtered data into a prompt
    const prompt = `User ID ${userId} has the following workouts assigned:\n${specificWorkoutData
      .map(
        workout => `- Workout ID: ${workout.id}, Name: ${workout.name}`
      )
      .join("\n")}\n\nPlease provide a balanced workout plan using all the user's available workouts.\nReply only with the following structure:\n\n
      [\n{
      "workoutId": "workout.id",\n
      "userId": "userId",\n
      "duration": "duration",\n
      "intensity": "intensity",\n
      "instructions": "instructions",\n
      "description": "description", \n
      "caloriesBurned": "caloriesBurned"
      }\n]`;

    // console.log("Sending prompt to Gemini API:", prompt);

    // Send request to Gemini API
    const result = await model.generateContent(prompt);
    const response = await result.response;

    // Extract the generated content
    const geminiOutput = await response.text();
    // console.log("Generated response from Gemini API:", geminiOutput);

    // Parse the Gemini response (assumed to be in JSON format)
    const workoutPlanData = JSON.parse(geminiOutput);

    // console.log('Generated workout plan data:', workoutPlanData);

    // Check if the user already has workout plans
    const existingWorkouts = await GeneratedWorkout.findAll({ where: { userId } });

    if (existingWorkouts.length > 0) {
      // If workout plans exist, delete them
      await GeneratedWorkout.destroy({ where: { userId } });
    //   console.log(`Deleted ${existingWorkouts.length} existing workout plans for user ID: ${userId}`);
    }

    // Create new generated workouts
    await GeneratedWorkout.bulkCreate(workoutPlanData);

    // Return the generated workout plan
    return NextResponse.json(workoutPlanData, { status: 200 });
  } catch (error) {
    console.error("Error processing generateWorkout:", error);
    return NextResponse.json(
      { error: "Failed to generate and save workout plan" },
      { status: 500 }
    );
  }
}
