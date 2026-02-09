'use client';

import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';

interface Phase {
  title: string;
  timeframe: string;
  status: 'completed' | 'in-progress' | 'planned';
  features: string[];
}

const roadmapPhases: Phase[] = [
  {
    title: 'MVP Launch',
    timeframe: 'Q4 2025',
    status: 'completed',
    features: [
      'Psychometric assessment engine',
      'User authentication & profiles',
      'Basic career recommendations',
      'Admin dashboard',
      'Student dashboard'
    ]
  },
  {
    title: 'Enhanced Intelligence',
    timeframe: 'Q1 2026',
    status: 'in-progress',
    features: [
      'AI-powered career matching',
      'Learning path recommendations',
      'Skill gap analysis',
      'Personalized career roadmaps',
      'Email notifications'
    ]
  },
  {
    title: 'Expanded Content',
    timeframe: 'Q2 2026',
    status: 'planned',
    features: [
      'Video tutorials & resources',
      'Industry expert interviews',
      'Career mentorship matching',
      'Live webinar integration',
      'Resource library expansion'
    ]
  },
  {
    title: 'Advanced Analytics',
    timeframe: 'Q3 2026',
    status: 'planned',
    features: [
      'Predictive career analytics',
      'Market trend integration',
      'Skills demand forecasting',
      'Success tracking & metrics',
      'Institutional reporting tools'
    ]
  },
  {
    title: 'Ecosystem Growth',
    timeframe: 'Q4 2026',
    status: 'planned',
    features: [
      'University partnership portal',
      'Employer connection platform',
      'Scholarship opportunities',
      'Internship marketplace',
      'Mobile application launch'
    ]
  }
];

export default function RoadmapPage() {
  const router = useRouter();

  const getStatusColor = (status: Phase['status']) => {
    switch (status) {
      case 'completed':
        return 'from-green-500 to-emerald-500';
      case 'in-progress':
        return 'from-teal-500 to-cyan-500';
      case 'planned':
        return 'from-slate-500 to-slate-600';
    }
  };

  const getStatusIcon = (status: Phase['status']) => {
    switch (status) {
      case 'completed':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'in-progress':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'planned':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
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
                Product Roadmap
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our journey from MVP to a comprehensive career guidance ecosystem
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-500 via-cyan-500 to-slate-700"></div>

          {/* Phases */}
          <div className="space-y-12">
            {roadmapPhases.map((phase, index) => (
              <div key={index} className="relative pl-24">
                {/* Status Icon */}
                <div className={`absolute left-0 w-16 h-16 rounded-full bg-gradient-to-br ${getStatusColor(phase.status)} flex items-center justify-center text-white shadow-lg`}>
                  {getStatusIcon(phase.status)}
                </div>

                {/* Phase Card */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-teal-500/50 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{phase.title}</h3>
                      <p className="text-teal-400 font-medium">{phase.timeframe}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${getStatusColor(phase.status)} text-white`}>
                        {phase.status === 'completed' && '✓ Completed'}
                        {phase.status === 'in-progress' && '⏳ In Progress'}
                        {phase.status === 'planned' && '📋 Planned'}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    {phase.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center text-gray-300">
                        <svg className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-16 bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <svg className="w-6 h-6 text-teal-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Status Legend
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mr-3"></div>
              <span className="text-gray-300"><strong className="text-white">Completed:</strong> Live in production</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 mr-3"></div>
              <span className="text-gray-300"><strong className="text-white">In Progress:</strong> Currently developing</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-slate-500 to-slate-600 mr-3"></div>
              <span className="text-gray-300"><strong className="text-white">Planned:</strong> Scheduled for future</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
