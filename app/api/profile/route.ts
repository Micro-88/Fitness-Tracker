//api for profile editing and deleting

import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '../../models/user';
import sequelize from '../../db_connection.mjs';

const SECRET_KEY = 'your-secret-key';
  
export async function PUT(req: NextRequest) {
  const { userId, username, age, gender, password } = await req.json();

  try {
    await sequelize.authenticate();

    const user = await User.findByPk(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    user.username = username;
    user.age = age;
    user.gender = gender;
    if (password) {
      user.password = password; 
    }

    await user.save();

    // Generates a new token with the updated profile data
    const updatedProfile = {
      id: user.id,
      username: user.username,
      age: user.age,
      gender: user.gender,
      password: user.password
    };
    const newToken = jwt.sign(updatedProfile, SECRET_KEY);

    return NextResponse.json({ token: newToken, profile: updatedProfile }, { status: 200 });
  } catch (error) {
    console.error('Error Updating profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { userId } = await req.json();

  try {
    await sequelize.authenticate();

    const user = await User.findByPk(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    await user.destroy(); // Permanently delete the user

    return NextResponse.json({ message: 'Profile deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error Deleting profile:', error);
    return NextResponse.json({ error: 'Failed to delete profile' }, { status: 500 });
  }
}