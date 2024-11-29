import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const secretKey = 'your_secret_key';

export async function middleware(req: NextRequest) {
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.redirect('/loginpage');
  }

  try {
    jwt.verify(token, secretKey);
    return NextResponse.next();
  } catch (error) {
    console.error('Invalid token:', error);
    return NextResponse.redirect('/loginpage');
  }
}