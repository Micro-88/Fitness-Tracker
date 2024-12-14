import { NextResponse, NextRequest } from 'next/server';
import sequelize from '../../db_connection';
import Chart from '@/app/models/chart';

export async function POST(req: NextRequest) {
    const { userId } = await req.json();
    
    try {

      await sequelize.authenticate();

      // Step 1: Fetch all generated workouts for the user
      const chartData = await Chart.findAll({
        where: { userId },
        attributes: [
          'date', 
          'progress'
        ], // Fetch specific columns from the generatedWorkouts table
    });

    // Convert Sequelize instances to plain objects
    const serializedData = chartData.map(entry => entry.get({ plain: true }));

    //   console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    //   console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    //   console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    //   console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    //   console.log(serializedData);
    //   console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    //   console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    //   console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    //   console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

      return NextResponse.json({ serializedData }, { status: 200 });
    } catch (error) {
      console.error('Error fetching Line Data:', error);
      return NextResponse.json({ error: 'Failed to fetch Line Data' }, { status: 500 });
    }
  }