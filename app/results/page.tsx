'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { assessmentApi, recommendationApi } from '../lib/api';

interface Scores {
  A: number;
  C: number;
  S: number;
  P: number;
}

interface ResultData {
  _id: string;
  userId: string;
  normalizedScores: Scores;
  createdAt: string;
}

interface RecommendationData {
  topCategories: string[];
  categoryNames: string[];
  recommendedCareers: string[];
  normalizedScores: Scores;
  detailedRecommendations?: Array<{
    career: string;
    confidence: string;
    reason: string;
    environment: string[];
    pace: string[];
  }>;
}

const CATEGORY_INFO = {
  A: { name: 'Analytical', color: 'blue', description: 'You excel at logical thinking, problem-solving, and data analysis' },
  C: { name: 'Creative', color: 'purple', description: 'You thrive in artistic expression, innovation, and creative thinking' },
  S: { name: 'Social', color: 'green', description: 'You are strong in communication, empathy, and working with people' },
  P: { name: 'Practical', color: 'orange', description: 'You prefer hands-on work, building things, and practical solutions' }
};

function ResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resultId = searchParams.get('id');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [allResults, setAllResults] = useState<ResultData[]>([]);
  const [selectedResult, setSelectedResult] = useState<ResultData | null>(null);
  const [recommendation, setRecommendation] = useState<RecommendationData | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchAllResults();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (resultId && allResults.length > 0) {
      const result = allResults.find(r => r._id === resultId);
      if (result) {
        handleSelectResult(result);
      }
    } else if (!resultId && allResults.length > 0) {
      // Auto-select latest result
      handleSelectResult(allResults[0]);
    }
  }, [resultId, allResults]);

  const fetchAllResults = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/login');
        return;
      }

      const response = await assessmentApi.getAllResults();
      
      if (response.success && response.data) {
        setAllResults(response.data);
      }
    } catch (err: any) {
      console.error('Error fetching results:', err);
      
      if (err.response?.status === 401) {
        setError('Session expired. Please login again.');
        setTimeout(() => router.push('/auth/login'), 2000);
      } else {
        setError(err.response?.data?.message || 'Failed to load results');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelectResult = async (result: ResultData) => {
    setSelectedResult(result);
    setLoading(true);
    try {
      // Fetch recommendation for this result
      const response = await recommendationApi.getRecommendation();
      if (response.success && response.data) {
        setRecommendation(response.data);
      }
    } catch (err: any) {
      console.error('Error fetching recommendation:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteResult = async (resultIdToDelete: string) => {
    try {
      await assessmentApi.deleteResult(resultIdToDelete);
      
      // Refresh results list
      const updatedResults = allResults.filter(r => r._id !== resultIdToDelete);
      setAllResults(updatedResults);
      
      // Clear selection if deleted result was selected
      if (selectedResult?._id === resultIdToDelete) {
        if (updatedResults.length > 0) {
          handleSelectResult(updatedResults[0]);
        } else {
          setSelectedResult(null);
          setRecommendation(null);
        }
      }
      
      setShowDeleteConfirm(null);
    } catch (err: any) {
      console.error('Error deleting result:', err);
      alert('Failed to delete result: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading && allResults.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your results...</p>
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
          <div className="space-x-3">
            <button
              onClick={() => router.push('/assessment')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-6 rounded-lg hover:shadow-lg transition"
            >
              Take Assessment
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-white text-blue-600 border-2 border-blue-600 font-semibold py-2 px-6 rounded-lg hover:bg-blue-50 transition"
            >
              Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (allResults.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-blue-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Results Found</h2>
          <p className="text-gray-600 mb-6">You haven't taken any assessments yet. Take your first assessment to discover your career path!</p>
          <button
            onClick={() => router.push('/assessment')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-6 rounded-lg hover:shadow-lg transition"
          >
            Take Assessment
          </button>
        </div>
      </div>
    );
  }

  const topCategories = selectedResult ? 
    Object.entries(selectedResult.normalizedScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(entry => entry[0]) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Gradient Header Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
          <div className="relative">
            <div className="flex items-center justify-center mb-4">
              <div className="p-4">
                <svg className="w-12 h-12 text-white" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-center mb-2">Your Assessment Results</h1>
            <p className="text-center text-blue-100">View career insights matching your strengths</p>
            <div className="flex justify-center mt-6">
              <div className="px-6 py-2">
                <span className="text-sm font-semibold text-white">Total Results: {allResults.length}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Results List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">All Results</h2>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {allResults.length}
                </span>
              </div>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {allResults.map((result) => (
                  <div
                    key={result._id}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all transform hover:scale-[1.02] ${
                      selectedResult?._id === result._id
                        ? 'border-blue-600 bg-gradient-to-r from-blue-50 to-purple-50 shadow-md'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 hover:shadow-sm'
                    }`}
                    onClick={() => handleSelectResult(result)}
                  >
                    <div className="text-sm font-semibold text-gray-800 mb-1">
                      {new Date(result.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="text-xs text-gray-600 mb-2">
                      {new Date(result.createdAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex gap-2">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">
                          A:{result.normalizedScores.A}%
                        </span>
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded font-medium">
                          C:{result.normalizedScores.C}%
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDeleteConfirm(result._id);
                        }}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Selected Result Details */}
          <div className="lg:col-span-3">
            {selectedResult ? (
              <>
                {/* Result Info Banner */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-l-4 border-blue-600 hover:shadow-xl transition">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Assessment taken on</p>
                      <p className="text-lg font-bold text-gray-800 mt-1">
                        {new Date(selectedResult.createdAt).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold text-sm">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Complete
                      </span>
                    </div>
                  </div>
                </div>

                {/* Top Strengths */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white mb-6">
                  <h2 className="text-2xl font-bold mb-4">Your Top Strengths</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {topCategories.map((cat, index) => {
                      const info = CATEGORY_INFO[cat as keyof typeof CATEGORY_INFO];
                      return (
                        <div key={cat} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                          <div className="flex items-center mb-2">
                            <span className="text-3xl font-bold mr-3">#{index + 1}</span>
                            <h3 className="text-xl font-bold">{info.name}</h3>
                          </div>
                          <p className="text-blue-100 text-sm">{info.description}</p>
                          <div className="mt-3">
                            <div className="text-2xl font-bold">{selectedResult.normalizedScores[cat as keyof Scores]}%</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Score Breakdown */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border-2 border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-xl mr-3">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Score Breakdown</h2>
                  </div>
                  <div className="space-y-5">
                    {Object.entries(selectedResult.normalizedScores).map(([category, score]) => {
                      const info = CATEGORY_INFO[category as keyof typeof CATEGORY_INFO];
                      const isTop = topCategories.includes(category);
                      return (
                        <div key={category} className="group">
                          <div className="flex justify-between mb-3">
                            <div className="flex items-center">
                              <span className="font-semibold text-gray-800 text-lg">
                                {info.name}
                              </span>
                              {isTop && (
                                <span className="ml-3 text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full font-semibold">
                                  ★ Top Strength
                                </span>
                              )}
                            </div>
                            <span className="font-bold text-gray-800 text-xl">{score}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                            <div
                              className={`bg-gradient-to-r from-${info.color}-500 to-${info.color}-600 h-4 rounded-full transition-all duration-1000 shadow-lg group-hover:shadow-xl`}
                              style={{ width: `${score}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">{info.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Career Recommendations */}
                {recommendation && (
                  <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border-2 border-gray-100">
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-3 rounded-xl mr-3">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">Careers Matching Your Strengths</h2>
                        <p className="text-sm text-gray-500">Top 5 careers aligned with your assessment results</p>
                      </div>
                    </div>
                    
                    {recommendation.recommendedCareers && recommendation.recommendedCareers.length > 0 ? (
                      <div className="space-y-4">
                        {recommendation.recommendedCareers.slice(0, 5).map((career, index) => (
                          <div
                            key={index}
                            className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all transform hover:scale-[1.02]"
                          >
                            <div className="flex items-center justify-between flex-wrap gap-4">
                              <div className="flex items-center flex-1 min-w-0">
                                <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl w-12 h-12 flex items-center justify-center font-bold mr-4 flex-shrink-0 text-lg shadow-lg">
                                  #{index + 1}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 truncate">{career}</h3>
                              </div>
                              <button
                                onClick={() => router.push(`/learning-path?career=${encodeURIComponent(career)}`)}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-6 rounded-lg hover:shadow-lg transition-all transform hover:scale-105 flex items-center whitespace-nowrap"
                              >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                                View Path
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-gray-50 rounded-xl">
                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-gray-500">No specific career recommendations available for this result.</p>
                      </div>
                    )}

                    {/* Show more careers note */}
                    {recommendation.recommendedCareers && recommendation.recommendedCareers.length > 5 && (
                      <div className="mt-6 text-center bg-blue-50 rounded-lg p-4">
                        <p className="text-sm text-blue-700 font-medium">
                          Showing top 5 of {recommendation.recommendedCareers.length} careers matching your strengths
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <p className="text-gray-600">Select a result from the list to view details</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-10 rounded-xl hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Dashboard
          </button>
          <button
            onClick={() => router.push('/assessment')}
            className="bg-white text-blue-600 border-2 border-blue-600 font-semibold py-3 px-10 rounded-xl hover:bg-blue-50 hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Take New Assessment
          </button>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <div className="text-red-600 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">Delete Result?</h3>
            <p className="text-gray-600 mb-6 text-center">
              This action cannot be undone. This will permanently delete this assessment result and its recommendations.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteResult(showDeleteConfirm)}
                className="flex-1 bg-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-sm text-gray-500">
            Results are based on psychometric analysis • Powered by{' '}
            <a href="https://mentisera.pk" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              MENTISERA
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}
