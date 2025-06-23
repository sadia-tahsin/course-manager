// app/api/courses/route.ts (or wherever you defined it)
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Course } from '@/models/Course';

export async function GET(request: Request) {
  await connectDB();
  const courses = await Course.find({});
  return NextResponse.json(courses);
}
