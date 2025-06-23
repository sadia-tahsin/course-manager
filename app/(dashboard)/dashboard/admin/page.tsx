'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [form, setForm] = useState({ title: '', description: '', instructor: '' });
  const [courses, setCourses] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [editingCourse, setEditingCourse] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const userName = localStorage.getItem('name');

    if (!token || role !== 'admin') {
      router.push('/login');
    } else {
      setName(userName || '');
      fetchCourses(token);
    }
  }, []);

  const fetchCourses = async (token: string) => {
    const res = await fetch('/api/courses', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setCourses(data);
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const res = await fetch(
      editingCourse ? `/api/courses/${editingCourse._id}` : '/api/courses',
      {
        method: editingCourse ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();
    setMessage(res.ok ? (editingCourse ? '✅ Course updated!' : '✅ Course created!') : `❌ ${data.error}`);
    setForm({ title: '', description: '', instructor: '' });
    setEditingCourse(null);
    fetchCourses(token!);
  };

  const handleEdit = (course: any) => {
    setEditingCourse(course);
    setForm({
      title: course.title,
      description: course.description,
      instructor: course.instructor,
    });
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`/api/courses/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    alert(data.message || data.error);
    fetchCourses(token!);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-700 mb-2">🛠️ Admin Dashboard</h1>
      <p className="text-gray-800 mb-6 text-lg">
        Welcome, <strong>{name}</strong>! {editingCourse ? 'Update' : 'Create'} a course below:
      </p>

      <form onSubmit={handleSubmit} className="mb-10 bg-white p-6 rounded shadow max-w-xl">
        <label className="block mb-2 font-semibold text-gray-700">Course Title</label>
        <input
          name="title"
          placeholder="Course Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <label className="block mb-2 font-semibold text-gray-700">Instructor Name</label>
        <input
          name="instructor"
          placeholder="Instructor Name"
          value={form.instructor}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <label className="block mb-2 font-semibold text-gray-700">Description</label>
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded"
        >
          {editingCourse ? 'Update Course' : 'Add Course'}
        </button>

        {message && <p className="mt-4 text-green-600">{message}</p>}
      </form>

      <hr className="my-8" />

      <h2 className="text-2xl font-semibold text-indigo-800 mb-6">📋 All Courses</h2>
      <div className="grid gap-6">
        {courses.map((course) => (
          <div key={course._id} className="bg-white p-5 rounded shadow">
            <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
            <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
            <p className="text-gray-700 mt-2">{course.description}</p>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleEdit(course)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(course._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
