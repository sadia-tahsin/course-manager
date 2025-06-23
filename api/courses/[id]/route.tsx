import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Course } from '@/models/Course';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const token = req.headers.get('authorization')?.split(' ')[1];

  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    if (decoded.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    await Course.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Course deleted' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 400 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const token = req.headers.get('authorization')?.split(' ')[1];

  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    if (decoded.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const updateData = await req.json();
    await Course.findByIdAndUpdate(params.id, updateData);

    return NextResponse.json({ message: 'Course updated' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update course' }, { status: 400 });
  }
}
