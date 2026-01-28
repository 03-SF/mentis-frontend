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

interface CareerHighlight {
  career: string;
  status: 'not-started' | 'in-progress' | 'completed';
  progress: number;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [assessmentCount, setAssessmentCount] = useState(0);
  const [topCareers, setTopCareers] = useState<string[]>([]);
  const [careerHighlights, setCareerHighlights] = useState<CareerHighlight[]>([]);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/login');
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
          
          // Create career highlights (mock progress for now)
          const highlights = careers.slice(0, 3).map((career: string, idx: number) => ({
            career,
            status: idx === 0 ? 'in-progress' : 'not-started',
            progress: idx === 0 ? 40 : 0
          }));
          setCareerHighlights(highlights as CareerHighlight[]);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      default: return 'Not Started';
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
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-gray-600 mb-1">{user?.email}</p>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize">
                {user?.role}
              </span>
              <p className="text-sm text-gray-500 mt-3">
                Member since {new Date(user?.createdAt || '').toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            </div>

            {/* Action Button */}
            <button
              onClick={() => router.push('/settings')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition"
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Stats</h2>
              
              <div className="space-y-4">
                {/* Assessments */}
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg mr-3">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Assessments</p>
                      <p className="text-2xl font-bold text-gray-800">{assessmentCount}</p>
                    </div>
                  </div>
                </div>

                {/* Career Matches */}
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-3 rounded-lg mr-3">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Career Matches</p>
                      <p className="text-2xl font-bold text-gray-800">{topCareers.length}</p>
                    </div>
                  </div>
                </div>

                {/* Learning Paths */}
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-3 rounded-lg mr-3">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Paths Started</p>
                      <p className="text-2xl font-bold text-gray-800">{careerHighlights.filter(c => c.status !== 'not-started').length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            {user?.studentInfo && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Education Info</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Education Level</p>
                    <p className="text-base font-medium text-gray-800 capitalize">{user.studentInfo.currentEducationLevel}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Grade/Year</p>
                    <p className="text-base font-medium text-gray-800">{user.studentInfo.grade}</p>
                  </div>
                  {user.studentInfo.stream && (
                    <div>
                      <p className="text-sm text-gray-600">Stream</p>
                      <p className="text-base font-medium text-gray-800 capitalize">{user.studentInfo.stream.replace('-', ' ')}</p>
                    </div>
                  )}
                  {user.studentInfo.city && (
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="text-base font-medium text-gray-800">
                        {user.studentInfo.city}{user.studentInfo.province && `, ${user.studentInfo.province}`}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Career Highlights & Navigation */}
          <div className="lg:col-span-2 space-y-6">
            {/* Career Highlights */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Career Highlights</h2>
              
              {careerHighlights.length > 0 ? (
                <div className="space-y-4">
                  {careerHighlights.map((highlight, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{highlight.career}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(highlight.status)}`}>
                          {getStatusText(highlight.status)}
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{highlight.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all"
                            style={{ width: `${highlight.progress}%` }}
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => router.push(`/learning-path?career=${encodeURIComponent(highlight.career)}`)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        {highlight.status === 'not-started' ? 'Start Learning Path →' : 'Continue Learning Path →'}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <p className="text-gray-600 mb-4">No career recommendations yet</p>
                  <button
                    onClick={() => router.push('/assessment')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition"
                  >
                    Take Assessment
                  </button>
                </div>
              )}
            </div>

            {/* Quick Navigation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => router.push('/results')}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition text-left border border-gray-100"
              >
                <div className="text-blue-600 mb-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 mb-1">Assessment Results</h3>
                <p className="text-sm text-gray-600">View your test scores</p>
              </button>

              <button
                onClick={() => router.push('/results')}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition text-left border border-gray-100"
              >
                <div className="text-purple-600 mb-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 mb-1">Learning Paths</h3>
                <p className="text-sm text-gray-600">Explore career pathways</p>
              </button>

              <button
                onClick={() => router.push('/settings')}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition text-left border border-gray-100"
              >
                <div className="text-green-600 mb-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 mb-1">Settings</h3>
                <p className="text-sm text-gray-600">Manage your account</p>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
