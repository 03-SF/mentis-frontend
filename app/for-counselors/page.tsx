import Link from 'next/link';

export default function ForCounselors() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Amplify Your Guidance.
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              As an educator or counselor, your time is your most valuable asset. MENTIS is a decision-support platform designed to augment your expertise, scale your reach, and empower you to deliver data-driven, impactful career guidance.
            </p>
            <Link
              href="/for-institutions"
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all font-semibold"
            >
              Explore Institutional Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-4">The Counselor&apos;s Dilemma</h2>
          <p className="text-center text-gray-300 mb-12 text-lg">
            You&apos;re dedicated to helping students succeed, but systemic challenges make it difficult to provide the personalized attention each one deserves.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">⏰</div>
              <p className="text-gray-300">
                Managing a large caseload of students with limited time for each one.
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">📈</div>
              <p className="text-gray-300">
                Struggling to keep up with rapidly changing job market trends and skill demands.
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">📋</div>
              <p className="text-gray-300">
                Lacking a standardized, data-driven framework to ground your counseling sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Your AI-Powered Assistant</h2>
          <p className="text-center text-gray-300 mb-12 text-lg">
            MENTIS doesn&apos;t replace you. It empowers you by handling the heavy lifting of data analysis, so you can focus on what you do best: mentoring students.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold text-white mb-3">A Powerful Co-pilot</h3>
              <p className="text-gray-300">
                MENTIS acts as your decision-support tool. It handles the initial data-gathering and analysis, freeing you up for high-impact, personalized guidance.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-xl p-8">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-white mb-3">Data-Driven Insights</h3>
              <p className="text-gray-300">
                Access real-time market data and individual skill-gap analyses to provide advice that is both relevant and grounded in economic reality.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-2xl font-bold text-white mb-3">Scale Your Impact</h3>
              <p className="text-gray-300">
                Provide a consistent, high-quality baseline of career guidance to every student, ensuring no one falls through the cracks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">Partner With Us to Enhance Your Impact</h2>
            <p className="text-gray-300 mb-8">
              Learn how our institutional partnerships can provide your school or college with a suite of tools to revolutionize your career services department.
            </p>
            <Link
              href="/contact"
              className="inline-block px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              Inquire About a Pilot Program
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
