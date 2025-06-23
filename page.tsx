'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => setCourses(data.slice(0, 3))) // preview first 3 courses
      .catch(console.error);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-indigo-700 py-20 text-center text-white shadow-md">
        <h1 className="text-4xl font-bold">Welcome to Course Manager</h1>
        <p className="mt-4 text-lg">Learn and manage online courses with ease.</p>
        <Link
          href="/login"
          className="mt-6 inline-block bg-white text-indigo-700 font-semibold px-6 py-3 rounded hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </section>

      {/* Featured Courses */}
      <section className="bg-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">🔥 Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {courses.map(course => (
            <div key={course._id} className="bg-gray-50 p-5 rounded shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-indigo-800">{course.title}</h3>
              <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
              <p className="text-gray-700 mt-2">{course.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-100 py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">🚀 Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          <div>
            <h3 className="text-xl font-semibold text-indigo-700">Simple Dashboard</h3>
            <p className="text-gray-600 mt-2">Separate views for students and admins with intuitive features.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-indigo-700">Instant Enrollment</h3>
            <p className="text-gray-600 mt-2">Join any course with one click and start learning immediately.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-indigo-700">Secure Access</h3>
            <p className="text-gray-600 mt-2">Your data is protected with secure login using JWT tokens.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">🛠️ How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-center">
          <div>
            <h4 className="font-semibold text-lg text-indigo-600">1. Create Account</h4>
            <p className="text-gray-600 mt-2">Register easily with your name, email, and password.</p>
          </div>
          <div>
            <h4 className="font-semibold text-lg text-indigo-600">2. Browse Courses</h4>
            <p className="text-gray-600 mt-2">Explore a wide range of courses curated by experts.</p>
          </div>
          <div>
            <h4 className="font-semibold text-lg text-indigo-600">3. Enroll & Learn</h4>
            <p className="text-gray-600 mt-2">Enroll in courses and start learning at your own pace.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-indigo-700 py-16 text-center text-white">
        <h2 className="text-3xl font-bold">🎉 Ready to Start Learning?</h2>
        <p className="mt-4 text-lg">Join thousands of learners today!</p>
        <Link
          href="/register"
          className="mt-6 inline-block bg-white text-indigo-700 font-semibold px-6 py-3 rounded hover:bg-gray-100 transition"
        >
          Sign Up Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Course Manager. Built with ❤️ using Next.js & MongoDB.
      </footer>
    </div>
  );
}
