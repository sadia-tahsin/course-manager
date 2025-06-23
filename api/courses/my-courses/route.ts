import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Course } from '@/models/Course';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {
  await connectDB();

  const auth = req.headers.get('authorization');
  const token = auth?.split(' ')[1];

  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const email = decoded.email;

    const courses = await Course.find({ enrolledUsers: email }).sort({ createdAt: -1 });

    return NextResponse.json(courses);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 400 });
  }
}
