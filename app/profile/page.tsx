'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { profileApi, assessmentApi, recommendationApi } from '../lib/api';

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

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [assessmentCount, setAssessmentCount] = useState(0);
  const [topCareers, setTopCareers] = useState<string[]>([]);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, redirecting to login');
        setTimeout(() => router.push('/auth/login'), 100);
        return;
      }

      // Fetch user profile
      const userData = localStorage.getItem('user');
      if (userData) {
        const userFromStorage = JSON.parse(userData);
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

      // Try to fetch full profile - but don't fail if it doesn't work
      try {
        const response = await profileApi.getProfile();
        if (response.success && response.data.profile) {
          setUser(response.data.profile);
        }
      } catch (err) {
        console.log('Profile API unavailable');
      }

      // Try to fetch assessment results count - but don't fail if it doesn't work
      try {
        const resultsResponse = await assessmentApi.getAllResults();
        if (resultsResponse.success && resultsResponse.data) {
          setAssessmentCount(resultsResponse.data.length);
        }
      } catch (err) {
        console.log('Assessment API unavailable');
      }

      // Try to fetch career recommendations - but don't fail if it doesn't work
      try {
        const recsResponse = await recommendationApi.getRecommendation();
        if (recsResponse.success && recsResponse.data) {
          const careers = recsResponse.data.recommendedCareers || [];
          setTopCareers(careers.slice(0, 3));
        }
      } catch (err) {
        console.log('Recommendations API unavailable');
      }

    } catch (err) {
      console.error('Profile error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-4xl font-bold border-4 border-white shadow-xl bg-gradient-to-br from-blue-400 to-purple-500">
                <span className="text-white drop-shadow-lg">{user?.firstName?.[0]}{user?.lastName?.[0]}</span>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">
                {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-blue-100 mb-2 text-lg">{user?.email}</p>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <span className="inline-block px-4 py-1.5 bg-white rounded-full text-sm font-semibold capitalize text-blue-600 shadow-md">
                  {user?.role}
                </span>
                <span className="text-sm text-blue-100">
                  Member since {new Date(user?.createdAt || '').toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => router.push('/settings')}
              className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:shadow-2xl transition-all hover:scale-105"
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Your Stats
              </h2>
              
              <div className="space-y-4">
                {/* Assessments */}
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-white p-3 rounded-xl mr-4 shadow-sm">
                        <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-700">Assessments</p>
                        <p className="text-3xl font-bold text-gray-800">{assessmentCount}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Career Matches */}
                <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-white p-3 rounded-xl mr-4 shadow-sm">
                        <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-purple-700">Career Matches</p>
                        <p className="text-3xl font-bold text-gray-800">{topCareers.length}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Age */}
                <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-200 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-white p-3 rounded-xl mr-4 shadow-sm">
                        <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-green-700">Days Active</p>
                        <p className="text-3xl font-bold text-gray-800">
                          {Math.floor((new Date().getTime() - new Date(user?.createdAt || '').getTime()) / (1000 * 60 * 60 * 24))}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            {user?.studentInfo && (
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <svg className="w-6 h-6 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Education Info
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm font-medium text-gray-500 mb-1">Education Level</p>
                    <p className="text-lg font-semibold text-gray-800 capitalize">{user.studentInfo.currentEducationLevel}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm font-medium text-gray-500 mb-1">Grade/Year</p>
                    <p className="text-lg font-semibold text-gray-800">{user.studentInfo.grade}</p>
                  </div>
                  {user.studentInfo.stream && (
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-sm font-medium text-gray-500 mb-1">Stream</p>
                      <p className="text-lg font-semibold text-gray-800 capitalize">{user.studentInfo.stream.replace('-', ' ')}</p>
                    </div>
                  )}
                  {user.studentInfo.city && (
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-sm font-medium text-gray-500 mb-1">Location</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {user.studentInfo.city}{user.studentInfo.province && `, ${user.studentInfo.province}`}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Top Careers & Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Top Career Recommendations */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Top Career Matches
              </h2>
              
              {topCareers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {topCareers.map((career, idx) => (
                    <div 
                      key={idx} 
                      className="relative group cursor-pointer"
                      onClick={() => router.push(`/learning-path?career=${encodeURIComponent(career)}`)}
                    >
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-transparent hover:border-blue-400 transition-all hover:shadow-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg p-3">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">#{idx + 1}</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{career}</h3>
                        <p className="text-sm text-gray-600 mb-4">Explore this career path</p>
                        <div className="flex items-center text-blue-600 font-medium text-sm group-hover:translate-x-2 transition-transform">
                          View Path
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">No Recommendations Yet</h3>
                  <p className="text-gray-500 mb-6">Take an assessment to discover your ideal career paths</p>
                  <button
                    onClick={() => router.push('/assessment')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-all hover:scale-105"
                  >
                    Take Assessment Now
                  </button>
                </div>
              )}
            </div>

            {/* Quick Navigation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => router.push('/results')}
                className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all text-left border-2 border-transparent hover:border-blue-400 hover:scale-105"
              >
                <div className="text-blue-600 mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 mb-2 text-lg">Assessment Results</h3>
                <p className="text-sm text-gray-600 mb-3">View your test scores and analysis</p>
                <div className="flex items-center text-blue-600 font-medium text-sm group-hover:translate-x-2 transition-transform">
                  View Results
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              <button
                onClick={() => router.push('/results')}
                className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all text-left border-2 border-transparent hover:border-purple-400 hover:scale-105"
              >
                <div className="text-purple-600 mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 mb-2 text-lg">Learning Paths</h3>
                <p className="text-sm text-gray-600 mb-3">Explore personalized career pathways</p>
                <div className="flex items-center text-purple-600 font-medium text-sm group-hover:translate-x-2 transition-transform">
                  Explore Paths
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              <button
                onClick={() => router.push('/settings')}
                className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all text-left border-2 border-transparent hover:border-green-400 hover:scale-105"
              >
                <div className="text-green-600 mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 mb-2 text-lg">Settings</h3>
                <p className="text-sm text-gray-600 mb-3">Manage your account preferences</p>
                <div className="flex items-center text-green-600 font-medium text-sm group-hover:translate-x-2 transition-transform">
                  Open Settings
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
