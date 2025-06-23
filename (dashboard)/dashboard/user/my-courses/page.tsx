'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: string;
}

export default function MyCoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'user') {
      router.push('/login');
    } else {
      fetchMyCourses(token);
    }
  }, []);

  const fetchMyCourses = async (token: string) => {
    const res = await fetch('/api/courses/my-courses', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setCourses(data);
    setLoading(false);
  };

  if (loading) return <p className="p-4 text-gray-600 text-center">Loading your courses...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 p-8">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-6">📚 My Enrolled Courses</h1>

      {courses.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">You have not enrolled in any courses yet.</p>
      ) : (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white shadow-md hover:shadow-lg rounded-2xl p-6 transition border-t-4 border-indigo-500"
            >
              <h2 className="text-xl font-bold text-indigo-800 mb-1">{course.title}</h2>
              <p className="text-sm text-gray-500 mb-2">Instructor: {course.instructor}</p>
              <p className="text-gray-700 text-sm">{course.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
