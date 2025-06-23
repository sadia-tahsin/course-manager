import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Course } from '@/models/Course';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  await connectDB();

  const auth = req.headers.get('authorization');
  const token = auth?.split(' ')[1];

  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const { courseId } = await req.json();

    const course = await Course.findById(courseId);
    if (!course) return NextResponse.json({ error: 'Course not found' }, { status: 404 });

    // prevent double enroll
    if (!course.enrolledUsers.includes(decoded.email)) {
      course.enrolledUsers.push(decoded.email);
      await course.save();
    }

    return NextResponse.json({ message: 'Enrolled successfully' });
  }  catch (err: any) {
  console.error('Enroll error:', err);  // ✅ add this
  return NextResponse.json({ error: err.message || 'Enrollment failed' }, { status: 400 });
}

}