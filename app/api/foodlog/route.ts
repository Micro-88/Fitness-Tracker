// import { NextResponse, NextRequest } from 'next/server';
// import sequelize from '../../db_connection';
// import FoodLog from '@/app/models/foodlog';

// export async function POST(req: NextRequest) {
//     const { userId } = await req.json();
    
//     try {

//       await sequelize.authenticate();

//       // Step 1: Fetch all generated workouts for the user
//       const getLogs = await FoodLog.findAll({
//         where: { userId },
//         attributes: [
//             'id',
//             'food_name', 
//             'calories', 
//         ], // Fetch specific columns from the generatedWorkouts table
//     });

//     // Return the fetched logs
//     return NextResponse.json({ foodLogs: getLogs }, { status: 200 });
//     } catch (error) {
//       console.error('Error fetching workout plans:', error);
//       return NextResponse.json({ error: 'Failed to fetch workout plans' }, { status: 500 });
//     }
//   }