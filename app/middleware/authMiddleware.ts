import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const secretKey = 'your_secret_key';

export async function verifyToken(req: NextRequest) {
  const token = req.headers.get('authorization');

  if (!token) {
    return NextResponse.json({ error: 'Access denied. No token provided.' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    (req as any).user = decoded; // Attach the user payload to the request
    return NextResponse.next(); // Proceed to the next middleware/route handler
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token.' }, { status: 403 });
  }
}