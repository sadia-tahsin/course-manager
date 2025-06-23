'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UserDashboard() {
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/courses', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch courses');
      const data = await res.json();
      setCourses(data);

      // extract enrolled courses for the user
      const myCourses = data.filter((course: any) => course.enrolledUsers?.includes(email));
      setEnrolledCourses(myCourses.map((c: any) => c._id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEnroll = async (courseId: string) => {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/courses/enroll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ courseId }),
    });
    const data = await res.json();
    alert(data.message || data.error);
    fetchCourses(); // refresh after enrollment
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const userName = localStorage.getItem('name');
    const userEmail = localStorage.getItem('email');

    if (!token || role !== 'user') {
      router.push('/login');
    } else {
      setName(userName || '');
      setEmail(userEmail || '');
      fetchCourses();
    }
  }, []);

  useEffect(() => {
    const onFocus = () => {
      fetchCourses();
    };
    window.addEventListener('focus', onFocus);
    return () => {
      window.removeEventListener('focus', onFocus);
    };
  }, [email]);

  const myCourses = courses.filter((c) => enrolledCourses.includes(c._id));
  const otherCourses = courses.filter((c) => !enrolledCourses.includes(c._id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 p-8">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-2">Welcome, {name} 🎓</h1>
      <p className="text-center text-gray-600 mb-10">Browse and enroll in available courses</p>

      {myCourses.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-green-800 mb-4 text-center">📘 My Enrolled Courses</h2>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {myCourses.map((course) => (
              <div key={course._id} className="bg-white shadow-md rounded-2xl p-6">
                <h2 className="text-xl font-bold text-indigo-800 mb-1">{course.title}</h2>
                <p className="text-sm text-gray-500 mb-2">Instructor: {course.instructor}</p>
                <p className="text-gray-700 text-sm">{course.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <h2 className="text-2xl font-semibold text-indigo-800 mb-4 text-center">🆕 Other Courses</h2>
      {otherCourses.length === 0 ? (
        <p className="text-center text-gray-500">No new courses to enroll.</p>
      ) : (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {otherCourses.map((course) => (
            <div key={course._id} className="bg-white shadow-md hover:shadow-lg rounded-2xl p-6 transition">
              <h2 className="text-xl font-bold text-indigo-800 mb-1">{course.title}</h2>
              <p className="text-sm text-gray-500 mb-2">Instructor: {course.instructor}</p>
              <p className="text-gray-700 mb-4 text-sm">{course.description}</p>
              <button
                onClick={() => handleEnroll(course._id)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
