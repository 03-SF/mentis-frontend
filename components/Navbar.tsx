'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{ role?: string; firstName?: string; lastName?: string } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    setMobileMenuOpen(false);
    // Redirect to home
    router.push('/');
  };

  return (
    <header className="border-b border-gray-100 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent hover:opacity-80 transition tracking-tight">
            MENTIS
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-teal-600 font-semibold transition-colors"
                >
                  Dashboard
                </Link>
                {user.role === 'student' && (
                  <>
                    <Link
                      href="/profile"
                      className="text-gray-700 hover:text-teal-600 font-semibold transition-colors"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="text-gray-700 hover:text-teal-600 font-semibold transition-colors"
                    >
                      Settings
                    </Link>
                  </>
                )}
                <Link
                  href="/team"
                  className="text-gray-700 hover:text-teal-600 font-semibold transition-colors"
                >
                  Team
                </Link>
                <Link
                  href="/roadmap"
                  className="text-gray-700 hover:text-teal-600 font-semibold transition-colors"
                >
                  Roadmap
                </Link>
                <Link
                  href="/how-to-use"
                  className="text-gray-700 hover:text-teal-600 font-semibold transition-colors"
                >
                  How to Use
                </Link>
                <Link
                  href="/career-paths"
                  className="text-gray-700 hover:text-teal-600 font-semibold transition-colors"
                >
                  Career Paths
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-700 hover:text-teal-600 font-semibold transition-colors"
                >
                  Contact
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-teal-600 font-semibold px-5 py-2.5 rounded-full hover:bg-gray-100 transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/how-to-use"
                  className="text-gray-700 hover:text-teal-600 font-semibold transition-colors"
                >
                  How It Works
                </Link>
                <Link
                  href="/features"
                  className="text-gray-700 hover:text-teal-600 font-semibold transition-colors"
                >
                  Features
                </Link>
                <Link
                  href="/pricing"
                  className="text-gray-700 hover:text-teal-600 font-semibold transition-colors"
                >
                  Pricing
                </Link>
                <Link
                  href="/for-institutions"
                  className="text-gray-700 hover:text-teal-600 font-semibold transition-colors"
                >
                  For Institutions
                </Link>
                <Link
                  href="/about"
                  className="text-gray-700 hover:text-teal-600 font-semibold transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/faq"
                  className="text-gray-700 hover:text-teal-600 font-semibold transition-colors"
                >
                  FAQ
                </Link>
                <Link
                  href="/auth/login"
                  className="text-gray-700 hover:text-teal-600 font-semibold px-5 py-2.5 rounded-full hover:bg-gray-100 transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold px-6 py-2.5 rounded-full hover:shadow-lg transition-all transform hover:scale-105"
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-teal-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4 space-y-3">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-700 hover:text-teal-600 font-semibold transition-colors py-2"
                >
                  Dashboard
                </Link>
                {user.role === 'student' && (
                  <>
                    <Link
                      href="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-gray-700 hover:text-teal-600 font-semibold transition-colors py-2"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-gray-700 hover:text-teal-600 font-semibold transition-colors py-2"
                    >
                      Settings
                    </Link>
                  </>
                )}
                <Link
                  href="/team"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-700 hover:text-teal-600 font-semibold transition-colors py-2"
                >
                  Team
                </Link>
                <Link
                  href="/roadmap"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-700 hover:text-teal-600 font-semibold transition-colors py-2"
                >
                  Roadmap
                </Link>
                <Link
                  href="/how-to-use"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-700 hover:text-teal-600 font-semibold transition-colors py-2"
                >
                  How to Use
                </Link>
                <Link
                  href="/career-paths"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-700 hover:text-teal-600 font-semibold transition-colors py-2"
                >
                  Career Paths
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-700 hover:text-teal-600 font-semibold transition-colors py-2"
                >
                  Contact
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-gray-700 hover:text-teal-600 font-semibold transition-colors py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/how-to-use"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-700 hover:text-teal-600 font-semibold transition-colors py-2"
                >
                  How It Works
                </Link>
                <Link
                  href="/features"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-700 hover:text-teal-600 font-semibold transition-colors py-2"
                >
                  Features
                </Link>
                <Link
                  href="/pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-700 hover:text-teal-600 font-semibold transition-colors py-2"
                >
                  Pricing
                </Link>
                <Link
                  href="/for-institutions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-700 hover:text-teal-600 font-semibold transition-colors py-2"
                >
                  For Institutions
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-700 hover:text-teal-600 font-semibold transition-colors py-2"
                >
                  About
                </Link>
                <Link
                  href="/faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-700 hover:text-teal-600 font-semibold transition-colors py-2"
                >
                  FAQ
                </Link>
                <Link
                  href="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-700 hover:text-teal-600 font-semibold transition-colors py-2"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold px-6 py-2.5 rounded-full hover:shadow-lg transition-all text-center"
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
