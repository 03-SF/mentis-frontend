'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { generateHowToUsePDF } from '@/lib/pdfGenerator';
import Footer from '@/components/Footer';

interface Step {
  number: number;
  title: string;
  description: string;
  details: string[];
  icon: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: 'Create Your Account',
    description: 'Sign up with your email and basic information',
    details: [
      'Visit the signup page and enter your details',
      'Choose a strong password for security',
      'Verify your email address',
      'Complete your student profile with education info'
    ],
    icon: 'user-plus'
  },
  {
    number: 2,
    title: 'Complete Assessment',
    description: 'Take the comprehensive psychometric test',
    details: [
      'Navigate to the Assessment section from your dashboard',
      'Answer all questions honestly - there are no wrong answers',
      'Take your time - the assessment takes 15-20 minutes',
      'Questions cover aptitude, personality, and interests'
    ],
    icon: 'clipboard'
  },
  {
    number: 3,
    title: 'Review Your Results',
    description: 'Get personalized career recommendations',
    details: [
      'View your detailed assessment results',
      'Explore career matches based on your strengths',
      'See percentage compatibility for each career',
      'Understand your personality profile and aptitudes'
    ],
    icon: 'chart'
  },
  {
    number: 4,
    title: 'Explore Learning Paths',
    description: 'Access tailored educational resources',
    details: [
      'Browse recommended learning paths for your career goals',
      'Access curated courses, tutorials, and resources',
      'Track your progress and skill development',
      'Get certificates upon completion'
    ],
    icon: 'book'
  },
  {
    number: 5,
    title: 'Plan Your Journey',
    description: 'Create your personalized career roadmap',
    details: [
      'Set short-term and long-term career goals',
      'Identify skill gaps and development areas',
      'Access mentorship opportunities',
      'Connect with universities and employers'
    ],
    icon: 'map'
  }
];

export default function HowToUsePage() {
  const router = useRouter();
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPDF = () => {
    setDownloading(true);
    try {
      generateHowToUsePDF();
    } catch (error) {
      console.error('PDF generation error:', error);
    } finally {
      setTimeout(() => setDownloading(false), 500);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'user-plus':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        );
      case 'clipboard':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        );
      case 'chart':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        );
      case 'book':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        );
      case 'map':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        );
      default:
        return null;
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
                How to Use MENTIS
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Your step-by-step guide to discovering the perfect career path
            </p>
            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-teal-500/50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {downloading ? 'Generating...' : 'Download User Guide PDF'}
            </button>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-teal-500/50 transition-all"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Step Number & Icon */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/50">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {getIcon(step.icon)}
                      </svg>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-teal-600 flex items-center justify-center font-bold text-sm shadow-lg">
                      {step.number}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-lg text-teal-400 mb-6">{step.description}</p>
                  
                  {/* Details */}
                  <div className="space-y-3">
                    {step.details.map((detail, dIndex) => (
                      <div key={dIndex} className="flex items-start">
                        <svg className="w-5 h-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-gray-300">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress Connector (except for last item) */}
              {index < steps.length - 1 && (
                <div className="flex justify-center mt-6 mb-0">
                  <svg className="w-6 h-6 text-teal-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Tips */}
        <div className="mt-16 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <svg className="w-7 h-7 text-teal-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Quick Tips
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <h4 className="font-semibold text-white mb-2 flex items-center">
                <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>
                Be Honest
              </h4>
              <p className="text-gray-300 text-sm">Answer assessment questions truthfully for accurate career matches</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <h4 className="font-semibold text-white mb-2 flex items-center">
                <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                Take Your Time
              </h4>
              <p className="text-gray-300 text-sm">Don't rush - thoughtful responses lead to better recommendations</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <h4 className="font-semibold text-white mb-2 flex items-center">
                <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>
                Explore Options
              </h4>
              <p className="text-gray-300 text-sm">Review all suggested careers, not just the top matches</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <h4 className="font-semibold text-white mb-2 flex items-center">
                <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                Stay Updated
              </h4>
              <p className="text-gray-300 text-sm">Revisit your profile regularly to track progress and discover new paths</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => router.push('/auth/signup')}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-teal-500/50 transition-all transform hover:scale-105"
          >
            Get Started Now
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
