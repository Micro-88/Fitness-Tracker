// import jwt from 'jsonwebtoken';
// import type { NextApiRequest, NextApiResponse } from 'next';
import  Workout  from '../models/workout'; // Import your Sequelize model

// Define the Workout interface to match your Sequelize model
// export interface WorkoutModel {
//     id: number;
//     name: string;
//     description: string;
//     goal: 'Lose_Weight' | 'Gain_Strength' | 'Gain_Muscle';
//     level: 'Novice' | 'Beginner' | 'Intermediate' | 'Advanced';
//     equipment: 'Barbells' | 'Dumbbells' | 'BodyWeight' | 'Machine' | 'Kettlebells' | 'Cables' | 'Bands';
//     duration: number;
//     muscleGroup: string;
//     instructions: string;
// }

// Fetch all workouts from the database
export default async function GetAllWorkouts(){ // Return type is an array of WorkoutModel
    try {
        const workouts = await Workout.findAll(); // Fetch all workouts
        console.log(workouts);
        // Returning the workouts as plain objects (without Sequelize methods)
        // return workouts.map(workout => workout.get()) as WorkoutModel[];

        // const ObtainedWorkouts: WorkoutModel[] = workouts.map((workout) => ({
        //     id: workout.id,
        //     name: workout.name,
        //     description: workout.description,
        //     goal: workout.goal as 'Lose_Weight' | 'Gain_Strength' | 'Gain_Muscle', // Explicitly cast to narrow the type
        //     level: workout.level as 'Novice' | 'Beginner' | 'Intermediate' | 'Advanced',
        //     equipment: workout.equipment as 'Barbells' | 'Dumbbells' | 'BodyWeight' | 'Machine' | 'Kettlebells' | 'Cables' | 'Bands',
        //     duration: workout.duration,
        //     muscleGroup: workout.muscleGroup,
        //     instructions: workout.instructions,
        //   }));

        const ObtainedWorkouts = workouts.map(workout => workout.toJSON());

        return ObtainedWorkouts;
        
    } catch (error) {
        console.error("Error fetching workouts:", error);
        return []; // Return an empty array in case of an error
    }
}

// // Fetch workouts by user goal or any specific filter
// export async function GetWorkoutsByGoal(goal: 'Lose_Weight' | 'Gain_Strength' | 'Gain_Muscle'): Promise<WorkoutModel[]> {
//     try {
//         const workouts = await Workout.findAll({
//             where: {
//                 goal: goal
//             }
//         });
//         return workouts.map((workout: InstanceType<typeof Workout>) => workout.get()); // Explicitly typing 'workout'
//     } catch (error) {
//         console.error(`Error fetching workouts for goal: ${goal}`, error);
//         return []; // Return empty array if there's an error
//     }
// }

// // Fetch workouts by level
// export async function GetWorkoutsByLevel(level: 'Novice' | 'Beginner' | 'Intermediate' | 'Advanced'): Promise<WorkoutModel[]> {
//     try {
//         const workouts = await Workout.findAll({
//             where: {
//                 level: level
//             }
//         });
//         return workouts.map((workout: InstanceType<typeof Workout>) => workout.get()); // Explicitly typing 'workout'
//     } catch (error) {
//         console.error(`Error fetching workouts for level: ${level}`, error);
//         return []; // Return empty array if there's an error
//     }
// }

// // Get workouts for a specific user (this assumes you want to filter by the user ID from the JWT token)
// export async function GetWorkoutsForUser(): Promise<WorkoutModel[]> {
//     const token = localStorage.getItem('token') || sessionStorage.getItem('token');

//     if (!token) {
//         console.error("No token found in localStorage or sessionStorage.");
//         return []; // Return an empty array if no token is found
//     }

//     try {
//         const decodedToken = jwt.decode(token) as { id: string }; // Assuming the token contains user ID
//         if (decodedToken && decodedToken.id) {
//             // You can use the user's ID here to fetch user-specific workouts
//             // For now, we return all workouts. You can change this logic based on your requirements
//             return await GetAllWorkouts();
//         } else {
//             console.error("Token is not valid.");
//             return [];
//         }
//     } catch (error) {
//         console.error("Error decoding the token", error);
//         return [];
//     }
// }
