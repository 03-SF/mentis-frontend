import Link from 'next/link';
import Footer from '@/components/Footer';

export default function ForProfessionals() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Reinvent Your Career Path.
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Feeling stuck or considering a change? MENTIS provides the clarity and structure you need to pivot your career with confidence. Leverage your existing experience and build a data-driven plan for your next move.
            </p>
            <Link
              href="/assessment"
              className="inline-block px-8 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-all font-semibold"
            >
              Analyze Your Career Pivot
            </Link>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-4">Is It Time for a Change?</h2>
          <p className="text-center text-gray-300 mb-12 text-lg">
            Career transitions are daunting. Many professionals feel trapped because the path forward is unclear.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">😔</div>
              <p className="text-gray-300">
                Your current career path feels stagnant or unfulfilling.
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">🤔</div>
              <p className="text-gray-300">
                You&apos;re unsure how your existing skills translate to new, in-demand roles.
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">😰</div>
              <p className="text-gray-300">
                The thought of a career change is overwhelming, and you don&apos;t know where to start.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">From Uncertainty to Actionable Strategy</h2>
          <p className="text-center text-gray-300 mb-12 text-lg">
            MENTIS is your personal career strategist, helping you navigate your professional journey with data, not doubt.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-2xl font-bold text-white mb-3">Map Your Skills</h3>
              <p className="text-gray-300">
                Our AI analyzes your current skillset and maps it to high-growth industries, revealing new opportunities you haven&apos;t considered.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-xl p-8">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-white mb-3">Identify the Gaps</h3>
              <p className="text-gray-300">
                Get a clear, data-driven analysis of the exact skills you need to acquire to successfully make a career pivot.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-2xl font-bold text-white mb-3">Get a Reskilling Roadmap</h3>
              <p className="text-gray-300">
                Receive a personalized 90-day plan with actionable steps to learn the necessary skills and make your career transition a reality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Plan Your Next Chapter?</h2>
            <p className="text-gray-300 mb-8">
              Your career analysis is the first step towards a future that leverages your strengths and aligns with market opportunities. It&apos;s fast, insightful, and built for professionals like you.
            </p>
            <Link
              href="/auth/signup"
              className="inline-block px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              Start Your Career Analysis
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
