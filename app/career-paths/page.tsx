'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { generateCareerPathsPDF } from '@/lib/pdfGenerator';
import { recommendationApi, assessmentApi } from '@/app/lib/api';

interface CareerPath {
  skill: string;
  roles: {
    title: string;
    description: string;
    paths: string[];
  }[];
}

const careerPaths: CareerPath[] = [
  {
    skill: 'Analytical Thinking',
    roles: [
      {
        title: 'Data Scientist',
        description: 'Analyze complex data to extract insights',
        paths: ['Statistics → Machine Learning → AI Research', 'Business Analytics → Data Engineering → Chief Data Officer']
      },
      {
        title: 'Financial Analyst',
        description: 'Evaluate financial data and market trends',
        paths: ['Accounting → Senior Analyst → Portfolio Manager', 'Economics → Investment Banking → CFO']
      }
    ]
  },
  {
    skill: 'Creative Problem Solving',
    roles: [
      {
        title: 'Software Engineer',
        description: 'Design and build software solutions',
        paths: ['Junior Developer → Senior Engineer → Tech Lead', 'Full Stack Dev → Solutions Architect → CTO']
      },
      {
        title: 'Product Designer',
        description: 'Create user-centered digital experiences',
        paths: ['UI Designer → UX Designer → Design Lead', 'Graphic Design → Product Design → Chief Design Officer']
      }
    ]
  },
  {
    skill: 'Communication & Leadership',
    roles: [
      {
        title: 'Marketing Manager',
        description: 'Develop and execute marketing strategies',
        paths: ['Marketing Coordinator → Brand Manager → CMO', 'Digital Marketing → Growth Lead → VP Marketing']
      },
      {
        title: 'Project Manager',
        description: 'Lead teams and deliver projects',
        paths: ['Coordinator → PM → Senior PM → Director', 'Business Analyst → Scrum Master → Program Manager']
      }
    ]
  },
  {
    skill: 'Scientific Reasoning',
    roles: [
      {
        title: 'Research Scientist',
        description: 'Conduct experiments and advance knowledge',
        paths: ['Lab Assistant → Researcher → Principal Investigator', 'PhD → Postdoc → Professor']
      },
      {
        title: 'Healthcare Professional',
        description: 'Provide medical care and treatment',
        paths: ['Medical Student → Resident → Specialist', 'Nursing → Nurse Practitioner → Healthcare Admin']
      }
    ]
  },
  {
    skill: 'Artistic Expression',
    roles: [
      {
        title: 'Content Creator',
        description: 'Produce engaging multimedia content',
        paths: ['Freelancer → Influencer → Brand Partner', 'Video Editor → Content Director → Creative Director']
      },
      {
        title: 'Game Designer',
        description: 'Create interactive gaming experiences',
        paths: ['Level Designer → Game Designer → Creative Director', '3D Artist → Technical Artist → Art Director']
      }
    ]
  },
  {
    skill: 'Social Intelligence',
    roles: [
      {
        title: 'Human Resources Manager',
        description: 'Manage talent and organizational culture',
        paths: ['HR Coordinator → HR Manager → CHRO', 'Recruiter → Talent Acquisition Lead → VP People']
      },
      {
        title: 'Counselor/Therapist',
        description: 'Support mental health and wellbeing',
        paths: ['Counselor → Licensed Therapist → Clinical Director', 'School Counselor → Career Coach → Private Practice']
      }
    ]
  }
];

export default function CareerPathsPage() {
  const router = useRouter();
  const [downloading, setDownloading] = useState(false);
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [assessmentScore, setAssessmentScore] = useState<number | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const response = await recommendationApi.getRecommendation();
        if (response && response.data && response.data.careers) {
          setRecommendations(response.data.careers);
        }

        // Fetch assessment result for score
        const resultResponse = await assessmentApi.getResult();
        if (resultResponse && resultResponse.data) {
          setAssessmentScore(resultResponse.data.totalScore);
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const handleDownloadPDF = () => {
    setDownloading(true);
    try {
      generateCareerPathsPDF();
    } catch (error) {
      console.error('PDF generation error:', error);
    } finally {
      setTimeout(() => setDownloading(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center text-teal-400 hover:text-teal-300 mb-8 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Career Paths Explorer
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Discover how your skills translate into careers and progression pathways
            </p>
            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-teal-500/50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {downloading ? 'Generating...' : 'Download Career Paths PDF'}
            </button>
          </div>
        </div>
      </div>

      {/* Career Path Mapping */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Assessment Results Section */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
          </div>
        ) : recommendations.length > 0 ? (
          <div className="mb-12 bg-gradient-to-br from-teal-900/30 to-cyan-900/30 rounded-2xl border-2 border-teal-500/50 overflow-hidden shadow-xl shadow-teal-500/20">
            <div className="px-8 py-6 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border-b border-teal-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mr-4 shadow-lg shadow-teal-500/50">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Your Career Recommendations</h2>
                    <p className="text-teal-300 mt-1">Based on your assessment results</p>
                  </div>
                </div>
                {assessmentScore !== null && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
                    <div className="text-xs text-teal-300 font-medium">Assessment Score</div>
                    <div className="text-3xl font-bold text-white">{assessmentScore}</div>
                  </div>
                )}
              </div>
            </div>
            <div className="px-8 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.map((career, index) => (
                  <div
                    key={index}
                    className="group cursor-pointer bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border-2 border-slate-700 hover:border-teal-500 transition-all hover:shadow-lg hover:shadow-teal-500/20 hover:scale-105"
                    onClick={() => router.push(`/learning-path?career=${encodeURIComponent(career)}`)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-lg p-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <span className="bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded-full">#{index + 1}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{career}</h3>
                    <p className="text-sm text-gray-300 mb-4">Click to explore learning path</p>
                    <div className="flex items-center text-teal-400 font-medium text-sm group-hover:translate-x-2 transition-transform">
                      <span>View Details</span>
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-12 bg-slate-700/30 rounded-2xl border-2 border-slate-600 p-12 text-center">
            <svg className="w-20 h-20 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <h3 className="text-xl font-semibold text-white mb-2">No Assessment Results</h3>
            <p className="text-gray-400 mb-6">Take an assessment to get personalized career recommendations</p>
            <button
              onClick={() => router.push('/assessment')}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl hover:shadow-teal-500/50 transition-all hover:scale-105"
            >
              Take Assessment
            </button>
          </div>
        )}

        {/* All Career Paths */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">Explore All Career Paths</h2>
          <p className="text-gray-400">Browse all available career paths by skill category</p>
        </div>
        
        <div className="space-y-8">
          {careerPaths.map((pathGroup, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden"
            >
              {/* Skill Header */}
              <button
                onClick={() => setExpandedSkill(expandedSkill === pathGroup.skill ? null : pathGroup.skill)}
                className="w-full px-8 py-6 flex items-center justify-between hover:bg-slate-700/30 transition-all"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mr-4 shadow-lg shadow-teal-500/30">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white">{pathGroup.skill}</h2>
                </div>
                <svg
                  className={`w-6 h-6 text-teal-400 transition-transform ${expandedSkill === pathGroup.skill ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Roles & Paths */}
              {expandedSkill === pathGroup.skill && (
                <div className="px-8 pb-8 space-y-6">
                  {pathGroup.roles.map((role, roleIndex) => (
                    <div
                      key={roleIndex}
                      className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50"
                    >
                      {/* Role Info */}
                      <div className="flex items-start mb-6">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center mr-4">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{role.title}</h3>
                          <p className="text-gray-400">{role.description}</p>
                        </div>
                      </div>

                      {/* Career Paths */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-teal-400 uppercase flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                          Progression Paths
                        </h4>
                        {role.paths.map((path, pathIndex) => (
                          <div key={pathIndex} className="flex items-start">
                            <svg className="w-5 h-5 text-cyan-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                            <div className="flex-grow">
                              <div className="flex flex-wrap items-center gap-2">
                                {path.split(' → ').map((step, stepIndex, array) => (
                                  <div key={stepIndex} className="flex items-center">
                                    <span className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-gray-300 text-sm font-medium">
                                      {step}
                                    </span>
                                    {stepIndex < array.length - 1 && (
                                      <svg className="w-6 h-6 text-teal-500 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                      </svg>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="mt-16 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <svg className="w-7 h-7 text-teal-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            How to Use This Guide
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-gray-300">
            <div>
              <div className="font-semibold text-white mb-2">1. Identify Your Skills</div>
              <p className="text-sm">Take our assessment to discover your strongest skill areas</p>
            </div>
            <div>
              <div className="font-semibold text-white mb-2">2. Explore Matching Roles</div>
              <p className="text-sm">Click on skills to see related career opportunities</p>
            </div>
            <div>
              <div className="font-semibold text-white mb-2">3. Plan Your Journey</div>
              <p className="text-sm">Follow progression paths to reach your career goals</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => router.push('/assessment')}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-teal-500/50 transition-all transform hover:scale-105"
          >
            Take Assessment to Find Your Path
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-400">
            Powered by{' '}
            <a href="https://mentisera.pk" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">
              MENTISERA
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
