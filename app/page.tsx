import Link from 'next/link';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <main className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 tracking-tight">
              From Confusion to{' '}
              <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Career Clarity
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed">
              MENTIS is a lifelong AI career navigator that maps your unique potential to real-world opportunity. 
              Navigate your educational and career journey with data-driven guidance designed specifically for Pakistani students.
            </p>
            <div className="flex gap-6 justify-center flex-wrap">
              <Link
                href="/auth/signup"
                className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold px-10 py-5 rounded-full hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-lg"
              >
                Find Your Career Path
              </Link>
              <Link
                href="/auth/login"
                className="border-2 border-gray-400 text-gray-200 font-bold px-10 py-5 rounded-full hover:bg-slate-800 transition-all duration-300 transform hover:scale-105 text-lg hover:border-gray-300"
              >
                Sign In
              </Link>
            </div>
          </div>
        </main>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Mission and Vision</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border border-teal-100">
              <h3 className="text-3xl font-bold text-teal-600 mb-6">Our Mission</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                To empower every learner in Pakistan to make intelligent, data-driven career decisions that prevent wasted time, energy, and resources.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border border-cyan-100">
              <h3 className="text-3xl font-bold text-cyan-600 mb-6">Our Vision</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                To build South Asia&apos;s largest AI career ecosystem that connects individual potential with real-world opportunity, eliminating the risk of misaligned careers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">The Problem: A National Crisis of Wasted Potential</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Pakistan faces a deep education-to-employment crisis. Millions of students lack proper guidance and enter educational programs without a clear plan.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-5xl font-bold text-red-600 mb-3">64%</div>
              <div className="text-gray-700 font-semibold text-lg">Youth under 30</div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-5xl font-bold text-orange-600 mb-3">16-17%</div>
              <div className="text-gray-700 font-semibold text-lg">Graduate Unemployment</div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-5xl font-bold text-amber-600 mb-3">70%</div>
              <div className="text-gray-700 font-semibold text-lg">Degree–Job Mismatch</div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">The Solution: An AI Co-Pilot for Informed Decisions</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              MENTIS provides the data and guidance you need to choose the right path from the start.
            </p>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-teal-100 transform hover:-translate-y-2">
              <div className="text-teal-600 mb-4">
                <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">AI Pathfinding Engine</h3>
              <p className="text-gray-600">
                Matches your personality, skills, and goals to the right career path, preventing costly mistakes.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-cyan-100 transform hover:-translate-y-2">
              <div className="text-cyan-600 mb-4">
                <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Real-Time Market Intelligence</h3>
              <p className="text-gray-600">
                Provides live data on salaries, demand, and growth so you can make informed, not emotional, decisions.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-teal-100 transform hover:-translate-y-2">
              <div className="text-teal-600 mb-4">
                <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Dynamic Skill Gap Analysis</h3>
              <p className="text-gray-600">
                Shows you exactly what skills you need for your chosen career and how to get them.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-cyan-100 transform hover:-translate-y-2">
              <div className="text-cyan-600 mb-4">
                <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Integrated Learning Ecosystem</h3>
              <p className="text-gray-600">
                Connects you directly to courses to fill your skill gaps efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to Shape Your Future?</h3>
          <p className="text-2xl mb-10 text-teal-100">
            Join thousands of Pakistani students making informed career decisions
          </p>
          <Link
            href="/auth/signup"
            className="inline-block bg-white text-teal-600 font-bold px-12 py-5 rounded-full hover:shadow-2xl transition-all duration-300 text-xl transform hover:scale-105"
          >
            Start Your Informed Journey
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
