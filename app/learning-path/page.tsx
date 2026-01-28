'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface SkillsGrouped {
  core_skills?: string[];
  technical_tools?: string[];
  business_skills?: string[];
}

interface LearningPath {
  path_name: string;
  summary: string;
  intermediate_duration: string;
  degree_duration: string;
  intermediate_phase: string[];
  degree_or_diploma_options: string[];
  skills_grouped: SkillsGrouped;
  entry_level_roles: string[];
  // Legacy support
  total_duration?: string;
  skills_to_build?: string[];
}

interface LearningPathData {
  career: string;
  location?: string;
  disclaimer?: string;
  paths: LearningPath[];
  userLevel?: string;
  countryContext?: string;
  note?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

function LearningPathContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const career = searchParams.get('career');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [learningPathData, setLearningPathData] = useState<LearningPathData | null>(null);

  useEffect(() => {
    if (!career) {
      setError('No career specified');
      setLoading(false);
      return;
    }

    const fetchLearningPath = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/auth/login');
          return;
        }

        console.log('Fetching learning path for:', career);
        console.log('API_BASE_URL:', API_BASE_URL);
        console.log('Full URL:', `${API_BASE_URL}/learning-path/generate`);
        console.log('Token:', token);
        
        const requestBody = {
          career,
          userLevel: 'Grade 10 / O Levels',
          countryContext: 'Pakistan'
        };
        console.log('Request body:', requestBody);
        
        const response = await fetch(`${API_BASE_URL}/learning-path/generate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(requestBody)
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        const data = await response.json();
        console.log('Response data:', data);

        if (!response.ok) {
          // Check for rate limit error (429)
          if (response.status === 429) {
            setError('AI Service Limit Reached: The learning path generator has reached its daily limit of 20 requests. Please try again tomorrow or contact support for increased access.');
            setLoading(false);
            return;
          }
          
          // Check for authentication errors
          if (response.status === 401) {
            setError('Session expired. Please login again.');
            setTimeout(() => router.push('/auth/login'), 2000);
            return;
          }
          throw new Error(data.message || 'Failed to generate learning path');
        }

        if (data.success && data.data) {
          setLearningPathData(data.data);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err: any) {
        console.error('Error fetching learning path:', err);
        
        // Only handle non-401 errors here (401 is handled above)
        setError(err.message || 'Failed to load learning path');
      } finally {
        setLoading(false);
      }
    };

    fetchLearningPath();
  }, [career, router]);

  const getPathIcon = (type: string) => {
    if (type.includes('Academic')) {
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      );
    } else if (type.includes('Skill')) {
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    } else if (type.includes('Hybrid')) {
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    } else {
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    }
  };

  const getPathColor = (type: string): string => {
    if (type.includes('Academic') || type.includes('Theoretical')) return 'academic';
    if (type.includes('Skill') || type.includes('Vocational') || type.includes('Practical')) return 'skill';
    if (type.includes('Hybrid') || type.includes('Digital') || type.includes('Entrepreneurial')) return 'hybrid';
    return 'alternative';
  };

  const getColorClasses = (colorType: string) => {
    switch (colorType) {
      case 'academic':
        return {
          header: 'bg-gradient-to-r from-blue-500 to-blue-600',
          badge: 'bg-blue-100 text-blue-600',
          step: 'bg-blue-100 text-blue-600'
        };
      case 'skill':
        return {
          header: 'bg-gradient-to-r from-purple-500 to-purple-600',
          badge: 'bg-purple-100 text-purple-600',
          step: 'bg-purple-100 text-purple-600'
        };
      case 'hybrid':
        return {
          header: 'bg-gradient-to-r from-green-500 to-green-600',
          badge: 'bg-green-100 text-green-600',
          step: 'bg-green-100 text-green-600'
        };
      default:
        return {
          header: 'bg-gradient-to-r from-orange-500 to-orange-600',
          badge: 'bg-orange-100 text-orange-600',
          step: 'bg-orange-100 text-orange-600'
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating your personalized learning path...</p>
          <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.back()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-6 rounded-lg hover:shadow-lg transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!learningPathData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Gradient Header Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
          <div className="relative">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4">
                <svg className="w-12 h-12 text-white" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-2">Your Personalized Learning Path</h1>
              <div className="inline-block bg-white px-6 py-3 rounded-full shadow-lg mt-4">
                <p className="text-xl font-semibold text-blue-700">{learningPathData.career}</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm mt-6">
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="font-medium text-gray-700">{learningPathData.userLevel}</span>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium text-gray-700">{learningPathData.countryContext}</span>
              </div>
            </div>
            {learningPathData.disclaimer && (
              <div className="mt-6 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 text-sm shadow-sm">
                <strong className="block mb-1 text-yellow-800">Note:</strong>
                <p className="text-yellow-700">{learningPathData.disclaimer}</p>
              </div>
            )}
            {learningPathData.note && (
              <div className="mt-4 bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-sm shadow-sm">
                <strong className="block mb-1 text-blue-800">Note:</strong>
                <p className="text-blue-700">{learningPathData.note}</p>
              </div>
            )}
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6 mb-8 shadow-md">
          <div className="flex items-start">
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white p-3 rounded-xl mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2 text-lg">Multiple Pathways Available</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                We've generated <span className="font-bold text-blue-600">{learningPathData.paths.length}</span> different pathways to help you achieve your career goal. 
                Each path is equally valid — choose the one that fits your circumstances, resources, and preferences best.
                <strong className="block mt-3 text-purple-700">These are advisory suggestions, not ranked recommendations.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Learning Paths */}
        <div className="space-y-8">
          {learningPathData.paths.map((path, index) => {
            const colorType = getPathColor(path.path_name);
            const colors = getColorClasses(colorType);
            return (
              <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-100 hover:border-blue-200 hover:shadow-2xl transition-all transform hover:scale-[1.01]">
                {/* Path Header */}
                <div className={`${colors.header} p-8 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
                  <div className="flex items-start justify-between relative">
                    <div className="flex items-start flex-1">
                      <div className="bg-white p-3 rounded-xl mr-4 shadow-lg flex-shrink-0">
                        <div className="text-blue-600">
                          {getPathIcon(path.path_name)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2">{path.path_name}</h3>
                        <p className="text-sm opacity-90 leading-relaxed mb-3">{path.summary}</p>
                        <div className="flex flex-wrap gap-3 text-xs font-medium">
                          {path.intermediate_duration && (
                            <span className="bg-white px-3 py-1.5 rounded-full shadow-md flex items-center text-blue-700">
                              <span className="mr-1.5">📚</span> Intermediate: {path.intermediate_duration}
                            </span>
                          )}
                          {path.degree_duration && (
                            <span className="bg-white px-3 py-1.5 rounded-full shadow-md flex items-center text-purple-700">
                              <span className="mr-1.5">🎓</span> Degree: {path.degree_duration}
                            </span>
                          )}
                          {path.total_duration && !path.intermediate_duration && (
                            <span className="bg-white px-3 py-1.5 rounded-full shadow-md flex items-center text-gray-700">
                              <span className="mr-1.5">⏱️</span> Total: {path.total_duration}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Path Content */}
                <div className="p-8 space-y-8 bg-gradient-to-b from-white to-gray-50">
                  {/* Intermediate Phase */}
                  {path.intermediate_phase && path.intermediate_phase.length > 0 && (
                    <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-100">
                      <h4 className="font-bold text-gray-800 mb-3 text-lg flex items-center">
                        <span className="text-2xl mr-2">📚</span> Intermediate Phase (Post-Grade 10)
                      </h4>
                      <ul className="space-y-2 ml-10">
                        {path.intermediate_phase.map((phase, idx) => (
                          <li key={idx} className="text-gray-700 flex items-start">
                            <span className="text-blue-500 mr-2 mt-1">•</span>
                            <span>{phase}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Degree/Diploma Options */}
                  {path.degree_or_diploma_options && path.degree_or_diploma_options.length > 0 && (
                    <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-100">
                      <h4 className="font-bold text-gray-800 mb-3 text-lg flex items-center">
                        <span className="text-2xl mr-2">🎓</span> Degree/Diploma Options
                      </h4>
                      <ul className="space-y-2 ml-10">
                        {path.degree_or_diploma_options.map((option, idx) => (
                          <li key={idx} className="text-gray-700 flex items-start">
                            <span className="text-purple-500 mr-2 mt-1">•</span>
                            <span>{option}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Skills to Build */}
                  {path.skills_grouped && (
                    <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-100">
                      <h4 className="font-bold text-gray-800 mb-4 text-lg flex items-center">
                        <span className="text-2xl mr-2">💡</span> Skills to Build
                      </h4>
                      <div className="space-y-4">
                        {path.skills_grouped.core_skills && path.skills_grouped.core_skills.length > 0 && (
                          <div>
                            <h5 className="text-sm font-semibold text-gray-700 mb-2 ml-10">Core Skills</h5>
                            <div className="flex flex-wrap gap-2 ml-10">
                              {path.skills_grouped.core_skills.map((skill, idx) => (
                                <span key={idx} className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition ${colors.badge}`}>
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {path.skills_grouped.technical_tools && path.skills_grouped.technical_tools.length > 0 && (
                          <div>
                            <h5 className="text-sm font-semibold text-gray-700 mb-2 ml-10">Technical Tools</h5>
                            <div className="flex flex-wrap gap-2 ml-10">
                              {path.skills_grouped.technical_tools.map((tool, idx) => (
                                <span key={idx} className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition ${colors.badge}`}>
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {path.skills_grouped.business_skills && path.skills_grouped.business_skills.length > 0 && (
                          <div>
                            <h5 className="text-sm font-semibold text-gray-700 mb-2 ml-10">Business & Marketing Skills</h5>
                            <div className="flex flex-wrap gap-2 ml-10">
                              {path.skills_grouped.business_skills.map((skill, idx) => (
                                <span key={idx} className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition ${colors.badge}`}>
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {/* Legacy Skills Support */}
                  {!path.skills_grouped && path.skills_to_build && path.skills_to_build.length > 0 && (
                    <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-100">
                      <h4 className="font-bold text-gray-800 mb-3 text-lg flex items-center">
                        <span className="text-2xl mr-2">💡</span> Skills to Build
                      </h4>
                      <div className="flex flex-wrap gap-2 ml-10">
                        {path.skills_to_build.map((skill, idx) => (
                          <span key={idx} className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition ${colors.badge}`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Entry Level Roles */}
                  {path.entry_level_roles && path.entry_level_roles.length > 0 && (
                    <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-100">
                      <h4 className="font-bold text-gray-800 mb-3 text-lg flex items-center">
                        <span className="text-2xl mr-2">🚀</span> Entry Level Roles
                      </h4>
                      <ul className="space-y-2 ml-10">
                        {path.entry_level_roles.map((role, idx) => (
                          <li key={idx} className="text-gray-700 flex items-start">
                            <span className="text-green-500 mr-2 mt-1">•</span>
                            <span>{role}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-10 rounded-xl hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}

export default function LearningPathPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading learning path...</p>
        </div>
      </div>
    }>
      <LearningPathContent />
    </Suspense>
  );
}
