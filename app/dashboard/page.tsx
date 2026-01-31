'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { profileApi } from '../lib/api';

interface UserProfile {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  studentInfo?: {
    currentEducationLevel: string;
    grade: string;
    city?: string;
    province?: string;
    stream?: string;
  };
  isActive: boolean;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (!token) {
          router.push('/auth/login');
          return;
        }

        // Get user from localStorage first and set it to state
        if (userData) {
          const userFromStorage = JSON.parse(userData);
          
          // Redirect admin users to admin dashboard
          if (userFromStorage.role === 'admin') {
            router.push('/dashboard/admin');
            return;
          }
          
          // Set basic user data from localStorage
          setUser({
            _id: userFromStorage._id || userFromStorage.id,
            email: userFromStorage.email,
            firstName: userFromStorage.firstName || 'User',
            lastName: userFromStorage.lastName || '',
            role: userFromStorage.role,
            isActive: true,
            createdAt: userFromStorage.createdAt || new Date().toISOString()
          } as UserProfile);
        }

        // Try to fetch full profile (optional)
        try {
          const response = await profileApi.getProfile();
          const typedResponse = response as { success?: boolean; data?: { profile?: UserProfile } };
          if (typedResponse.success && typedResponse.data?.profile) {
            const profileData = typedResponse.data.profile;
            // Update with full profile data
            setUser(profileData);
          }
        } catch (profileErr: unknown) {
          // Profile doesn't exist yet (404) - that's okay, basic user data already set
          const error = profileErr as { response?: { status?: number } };
          if (error.response?.status === 404) {
            console.log('No profile yet - showing basic user info from registration');
          } else if (error.response?.status === 401) {
            // Unauthorized - redirect to login
            localStorage.clear();
            router.push('/auth/login');
            return;
          }
        }
      } catch (err: unknown) {
        const errorObj = err as { response?: { status?: number; data?: { message?: string } }; message?: string };
        console.error('Dashboard error:', errorObj);
        // Only show error for critical failures
        if (errorObj.response?.status === 401) {
          localStorage.clear();
          router.push('/auth/login');
        } else {
          setError(errorObj.response?.data?.message || errorObj.message || 'Failed to load dashboard');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-slate-700">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => router.push('/auth/login')}
            className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold py-2 px-6 rounded-lg hover:shadow-lg transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl shadow-2xl p-8 md:p-12 text-white mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              Welcome back, {user?.firstName}! 👋
            </h2>
            <p className="text-teal-100 text-lg md:text-xl">
              Your AI-powered career co-pilot for Pakistani students
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border-2 border-slate-700 hover:border-teal-500/50 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-gradient-to-br from-teal-500 to-cyan-500 p-3 rounded-xl">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span className="text-3xl font-bold text-white">
                {user?.createdAt ? Math.floor((new Date().getTime() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)) : 0}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase">Days Active</h3>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border-2 border-slate-700 hover:border-cyan-500/50 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 p-3 rounded-xl">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${user?.isActive !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {user?.isActive !== false ? 'Active' : 'Inactive'}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase">Account Status</h3>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border-2 border-slate-700 hover:border-green-500/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-green-500 to-teal-500 p-3 rounded-xl">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-300 px-3 py-1 bg-slate-700/50 rounded-full capitalize">
                {user?.role}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase">User Role</h3>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <svg className="w-7 h-7 text-teal-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Your Profile
            </h3>
            <button
              onClick={() => router.push('/profile')}
              className="text-teal-600 hover:text-teal-800 font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all"
            >
              View Full Profile
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Info */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-400 uppercase flex items-center mb-4">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                Personal Information
              </h4>
              <div className="space-y-3">
                <div className="flex items-start p-4 bg-gradient-to-r from-teal-900/20 to-transparent rounded-xl border border-teal-500/20">
                  <svg className="w-5 h-5 text-teal-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-400">Full Name</p>
                    <p className="text-lg font-semibold text-white">{user?.firstName} {user?.lastName}</p>
                  </div>
                </div>
                <div className="flex items-start p-4 bg-gradient-to-r from-cyan-900/20 to-transparent rounded-xl border border-cyan-500/20">
                  <svg className="w-5 h-5 text-cyan-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-400">Email</p>
                    <p className="text-lg font-semibold text-white">{user?.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Education Info */}
            {user?.studentInfo && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-400 uppercase flex items-center mb-4">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></div>
                  Education Information
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start p-4 bg-gradient-to-r from-green-900/20 to-transparent rounded-xl border border-green-500/20">
                    <svg className="w-5 h-5 text-green-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-400">Education Level</p>
                      <p className="text-lg font-semibold text-white capitalize">{user.studentInfo.currentEducationLevel}</p>
                    </div>
                  </div>
                  <div className="flex items-start p-4 bg-gradient-to-r from-orange-900/20 to-transparent rounded-xl border border-orange-500/20">
                    <svg className="w-5 h-5 text-orange-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-400">Grade/Year</p>
                      <p className="text-lg font-semibold text-white">{user.studentInfo.grade}</p>
                    </div>
                  </div>
                  {user.studentInfo.stream && (
                    <div className="flex items-start p-4 bg-gradient-to-r from-pink-900/20 to-transparent rounded-xl border border-pink-500/20">
                      <svg className="w-5 h-5 text-pink-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-gray-400">Stream</p>
                        <p className="text-lg font-semibold text-white capitalize">{user.studentInfo.stream.replace('-', ' ')}</p>
                      </div>
                    </div>
                  )}
                  {user.studentInfo.city && (
                    <div className="flex items-start p-4 bg-gradient-to-r from-indigo-900/20 to-transparent rounded-xl border border-indigo-500/20">
                      <svg className="w-5 h-5 text-indigo-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-gray-400">Location</p>
                        <p className="text-lg font-semibold text-white">
                          {user.studentInfo.city}{user.studentInfo.province && `, ${user.studentInfo.province}`}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <svg className="w-7 h-7 text-teal-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div 
              onClick={() => router.push('/assessment')}
              className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all cursor-pointer border-2 border-slate-700 hover:border-teal-500 hover:scale-105"
            >
              <div className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white p-4 rounded-2xl mb-6 inline-block">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Take Assessment</h3>
              <p className="text-gray-300 mb-4">Complete psychometric tests to discover your strengths and ideal career paths</p>
              <div className="flex items-center text-teal-400 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                Start Now
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            <div 
              onClick={() => router.push('/results')}
              className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all cursor-pointer border-2 border-slate-700 hover:border-cyan-500 hover:scale-105"
            >
              <div className="bg-gradient-to-br from-cyan-500 to-teal-500 text-white p-4 rounded-2xl mb-6 inline-block">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">View Results</h3>
              <p className="text-gray-300 mb-4">See careers matching your strengths and assessment scores</p>
              <div className="flex items-center text-cyan-400 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                View Results
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-400">
            Powered by{' '}
            <a href="https://mentisera.pk" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
              MENTISERA
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}