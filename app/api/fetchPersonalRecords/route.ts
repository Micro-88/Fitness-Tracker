import { NextRequest, NextResponse } from 'next/server';
import PersonalRecord from '../../models/personalRecord';
import sequelize from '../../db_connection';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  try {
    await sequelize.authenticate();
    const personalRecord = await PersonalRecord.findOne({ where: { userId } });
    if (!personalRecord) {
      return NextResponse.json({ error: 'Personal record not found' }, { status: 404 });
    }
    return NextResponse.json(personalRecord, { status: 200 });
  } catch (error) {
    console.error('Error fetching personal records:', error);
    return NextResponse.json({ error: 'Failed to fetch personal records' }, { status: 500 });
  }
}