import { NextRequest, NextResponse } from 'next/server';
import PersonalRecord from '../../models/personalRecord';
import sequelize from '../../db_connection.mjs';

export async function POST(req: NextRequest) {
  try {
    const { userId, workoutType, record } = await req.json();
    await sequelize.authenticate();
    const newPersonalRecord = await PersonalRecord.create({ userId, workoutType, record });
    return NextResponse.json(newPersonalRecord, { status: 201 });
  } catch (error) {
    console.error('Error creating personal record:', error);
    return NextResponse.json({ error: 'Failed to create personal record' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  try {
    await sequelize.authenticate();
    const personalRecords = await PersonalRecord.findAll({ where: { userId } });
    return NextResponse.json(personalRecords, { status: 200 });
  } catch (error) {
    console.error('Error fetching personal records:', error);
    return NextResponse.json({ error: 'Failed to fetch personal records' }, { status: 500 });
  }
}