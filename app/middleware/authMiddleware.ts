import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
 // updated authMiddleware to handle new token validation for profile editing
const secretKey = 'your_secret_key';

export async function middleware(req: NextRequest) {
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    console.log(decoded);
    return NextResponse.next();
  } catch (error) {
    console.error('Invalid token:', error);
    return NextResponse.redirect('/login');
  }
}