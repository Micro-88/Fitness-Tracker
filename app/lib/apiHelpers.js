import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is set in .env file
});
const openai = new OpenAIApi(configuration);

export async function getWorkoutPlan(inputs) {
  const { gender, age, goal, level, equipment } = inputs;

  const prompt = `
    Create a workout plan for a ${age}-year-old ${gender} whose goal is to ${goal.toLowerCase()}.
    Their fitness level is ${level.toLowerCase()}, and they have access to the following equipment: ${equipment.join(', ')}.
    Provide a detailed workout routine.
  `;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",  // Use an appropriate model
      prompt: prompt,
      max_tokens: 300,
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error generating workout plan:", error);
    return "Failed to generate workout plan";
  }
}
