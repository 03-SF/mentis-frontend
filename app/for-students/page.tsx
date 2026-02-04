import Link from 'next/link';
import Footer from '@/components/Footer';

export default function ForStudents() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Stop Guessing. Start Building.
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              You have limitless potential, but the path forward isn&apos;t always clear. MENTIS is built for students like you who are ready to move from confusion to a confident, actionable career plan.
            </p>
            <Link
              href="/assessment"
              className="inline-block px-8 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-all font-semibold"
            >
              Start Your Career Analysis
            </Link>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Does This Sound Familiar?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-gray-300">
                Generic career tests give you abstract labels, not an actionable plan.
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">📊</div>
              <p className="text-gray-300">
                You&apos;re unsure which skills are actually in demand in the local job market.
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">😰</div>
              <p className="text-gray-300">
                Social pressure and too many options lead to confusion and analysis paralysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">A Smarter Way to Plan Your Future</h2>
          <p className="text-center text-gray-300 mb-12 text-lg">
            MENTIS replaces ambiguity with data-driven clarity. Here&apos;s how we help you take control of your career journey.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8">
              <div className="text-4xl mb-4">🧭</div>
              <h3 className="text-2xl font-bold text-white mb-3">Discover Your Path</h3>
              <p className="text-gray-300">
                Our AI Pathfinding Engine matches your unique profile to real careers, showing you paths you might not have considered.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-xl p-8">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-2xl font-bold text-white mb-3">See the Reality</h3>
              <p className="text-gray-300">
                Get real-time market data on salary expectations and growth projections for careers in Pakistan.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-2xl font-bold text-white mb-3">Get a Plan</h3>
              <p className="text-gray-300">
                Receive a personalized 90-day roadmap that tells you exactly what skills to learn to bridge your gap.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Path?</h2>
            <p className="text-gray-300 mb-8">
              Your free career analysis is the first step towards a future you can be excited about. It&apos;s quick, insightful, and designed for you.
            </p>
            <Link
              href="/auth/signup"
              className="inline-block px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              Create Your Free Account
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
