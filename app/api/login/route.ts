import { NextRequest, NextResponse } from 'next/server';
import User from '../../models/user';
import sequelize from '../../db_connection';
import jwt from 'jsonwebtoken';

const secretKey = 'your_secret_key';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    await sequelize.authenticate();
    const user = await User.findOne({ where: { username, password } });

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign({ id: user.id, username: user.username, gender: user.gender, age: user.age  }, secretKey, { expiresIn: '1h' });

    console.log(jwt.decode(token));
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json({ error: 'Failed to log in' }, { status: 500 });
  }
}