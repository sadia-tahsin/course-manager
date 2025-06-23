import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Course } from '@/models/Course';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const id = params.id;
  const body = await request.json();

  try {
    const course = await Course.findByIdAndUpdate(id, body, { new: true });
    if (!course) return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    return NextResponse.json(course);
  } catch (err) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
