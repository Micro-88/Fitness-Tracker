import { NextRequest, NextResponse } from 'next/server';
import User from '../../models/user';
import { verifyToken } from '../../middleware/authMiddleware';

export async function GET(req: NextRequest) {
  const tokenResponse = await verifyToken(req);
  if (tokenResponse.status !== 200) {
    return tokenResponse; // Return the error response if the token is invalid
  }

  const { user } = tokenResponse as unknown as { user: { id: string } };
  const userId = user.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }
}