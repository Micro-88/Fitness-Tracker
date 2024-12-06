import { NextRequest, NextResponse } from 'next/server';
import User from '../../models/user';
import sequelize from '../../db_connection';

export async function PUT(req: NextRequest) {
  try {
    const { userId, currentBodyweight } = await req.json();

    await sequelize.authenticate();

    const user = await User.findByPk(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    user.currentBodyWeight = currentBodyweight;
    await user.save();

    return NextResponse.json({ message: 'Body weight updated successfully', user }, { status: 200 });
  } catch (error) {
    console.error('Error updating body weight:', error);
    return NextResponse.json({ error: 'Failed to update body weight' }, { status: 500 });
  }
}