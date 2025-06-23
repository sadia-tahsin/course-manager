'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    setRole(localStorage.getItem('role') || '');
    setName(localStorage.getItem('name') || '');
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-700">🎓 Course Manager</h1>
        <nav className="flex gap-4 items-center text-gray-700 font-medium">
          {role === 'admin' && (
            <>
              <Link href="/" className="hover:text-indigo-600">Home</Link>
            </>
          )}
          {role === 'user' && (
            <>
              <Link href="/dashboard/user" className="hover:text-indigo-600">All Courses</Link>
              <Link href="/dashboard/user/my-courses" className="hover:text-indigo-600">My Courses</Link>
            </>
          )}
          <button onClick={handleLogout} className="text-red-600 hover:underline">
            Logout
          </button>
        </nav>
      </header>

      <main className="p-6">{children}</main>
    </div>
  );
}
