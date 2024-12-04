import { NextResponse, NextRequest } from 'next/server';
import WorkoutPlan from '../../models/workoutPlan';
import User from '../../models/user';
import sequelize from '../../db_connection';
import Workout from '@/app/models/workout';
import { Op } from 'sequelize';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const { userId } = await req.json();

    try {

      // To ensure the Gemini API Key is loaded
      if (!process.env.GEMINI_API_KEY) {
        console.error("Gemini API Key is missing");
        return NextResponse.json(
          { error: "Internal Server Error: API Key is missing" },
          { status: 500 }
        );
      }

      await sequelize.authenticate();

      // Check if the user has a workout plan
      const workoutPlans = await WorkoutPlan.findAll({
        where: { userId },
        attributes: ['workoutId'], // Only fetch the workoutId column
    });

    const workoutIds = workoutPlans.map(plan => plan.workoutId);

    const workouts = await Workout.findAll({
      where: { 
        id: { [Op.in]: workoutIds }
      }
    })

    // Filter specific workout information
    const specificWorkoutData = workouts.map(workout => ({
      id: workout.id,
      name: workout.name,
      muscleGroup: workout.muscleGroup,
    }));

    // Integrate Gemini Chatbot
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Format the filtered data into a prompt
    const prompt = `User ID ${userId} has the following workouts assigned:\n${specificWorkoutData
      .map(
        workout => `- Workout ID: ${workout.id}, Name: ${workout.name}`
      )
      .join("\n")}\n\nPlease provide a balanced workout plan using all the user's available workouts.\nReply in JSON with the following structure:\n\n{
        "workoutId": "workout.id",\n
        "userId": "userId",\n
        "duration": "duration",\n
        "intensity": "intensity",\n
        "instructions": "instructions",\n
        "description": "description"
      }`;

    console.log("Sending prompt to Gemini API:", prompt);

    // Send request to Gemini API
    const result = await model.generateContent(prompt);
    const response = await result.response;

    // Extract the generated content
    const geminiOutput = await response.text();
    console.log("Generated response from Gemini API:", geminiOutput);

    return NextResponse.json({ userId, workouts }, { status: 200 });
    } catch (error) {
      console.error('Error fetching workout plans:', error);
      return NextResponse.json({ error: 'Failed to fetch workout plans' }, { status: 500 });
    }
  }