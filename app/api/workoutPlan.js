import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma"; // Assuming you're using Prisma to interact with the database

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { body } = req.body;

      // Parse the user input
      const { gender, age, goal, level, equipment } = JSON.parse(body);

      // Query workouts based on the user's goal, level, and available equipment
      const workouts = await prisma.workouts.findMany({
        where: {
          goal: goal,
          level: level,
          equipment: {
            in: equipment,
          },
        },
      });

      // If no workouts are found, return an error message
      if (workouts.length === 0) {
        return res.status(404).json({ output: "No workouts found for your selection." });
      }

      // Create a new workoutPlan for the user (you would need user ID here, which you could get from session or passed data)
      const workoutPlan = await prisma.workoutPlan.create({
        data: {
          goal,
          level,
          equipment: equipment.join(", "), // Store the equipment as a comma-separated string or in another table
          workouts: {
            connect: workouts.map((workout) => ({ id: workout.id })), // Connect the selected workouts to the new workout plan
          },
        },
      });

      // Send back the workout plan details (for now, sending workout names)
      return res.status(200).json({
        output: workouts.map((workout) => workout.name).join(", "),
        workoutPlanId: workoutPlan.id, // Returning the ID of the created workout plan
      });
    } catch (error) {
      console.error("Error generating workout plan:", error);
      return res.status(500).json({ output: "Error generating workout plan." });
    }
  } else {
    return res.status(405).json({ output: "Method Not Allowed" });
  }
}
