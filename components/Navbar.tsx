'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{ role?: string; firstName?: string; lastName?: string } | null>(null);

  useEffect(() => {
    // Check if user is logged in on mount and when pathname changes
    const checkAuth = () => {
      const userData = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if (userData && token) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    };

    checkAuth();

    // Listen for storage changes (in case user logs in/out in another tab)
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, [pathname]); // Re-check on pathname change

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    // Redirect to home
    router.push('/');
  };

  return (
    <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition">
            MENTIS AI
          </Link>
          <nav className="flex gap-6 items-center">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-gray-900 font-medium transition"
                >
                  Dashboard
                </Link>
                {user.role === 'student' && (
                  <>
                    <Link
                      href="/profile"
                      className="text-gray-700 hover:text-gray-900 font-medium transition"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="text-gray-700 hover:text-gray-900 font-medium transition"
                    >
                      Settings
                    </Link>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-gray-900 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className="text-gray-700 hover:text-gray-900 font-medium transition"
                >
                  Home
                </Link>
                <Link
                  href="/auth/login"
                  className="text-gray-700 hover:text-gray-900 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
