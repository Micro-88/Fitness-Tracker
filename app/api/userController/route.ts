import { NextRequest, NextResponse } from 'next/server';
import User from '../../models/user';
import sequelize from '../../db_connection';

// GET /api/userController?id={id} (Single user) or GET /api/userController (All users)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('id');

  try {
    await sequelize.authenticate();

    if (userId) {
      const user = await User.findByPk(userId as string);
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      return NextResponse.json(user, { status: 200 });
    } else {
      const users = await User.findAll();
      return NextResponse.json(users, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// POST /api/userController (Create user) (REGISTER)
export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    await sequelize.authenticate();
    const newUser = await User.create({ username, password });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

// PUT /api/userController 
export async function PUT(req: NextRequest) {
  try {
    const { id, username, password } = await req.json();
    await sequelize.authenticate();
    const user = await User.findByPk(id as string);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    user.username = username;
    user.password = password;
    await user.save();
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

// DELETE /api/userController?id={id}
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('id');

  try {
    await sequelize.authenticate();
    const user = await User.findByPk(userId as string);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    await user.destroy();
    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}