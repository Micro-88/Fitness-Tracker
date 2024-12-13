// import { NextResponse, NextRequest } from 'next/server';
// import sequelize from '../../db_connection';
// import FoodLog from '@/app/models/foodlog';

// export async function POST(req: NextRequest) {
//   const { userId, foodName, calories } = await req.json();
  
//   try {
//     await sequelize.authenticate();

//     // Step 1: Create a new food log entry for the user
//     const newFoodLog = await FoodLog.create({
//       userId,
//       food_name: foodName,
//       calories,
//     });

//     // Return success response with the created food log data
//     return NextResponse.json({ foodLog: newFoodLog }, { status: 201 });
//   } catch (error) {
//     console.error('Error creating food log entry:', error);
//     return NextResponse.json({ error: 'Failed to create food log entry' }, { status: 500 });
//   }
// }
