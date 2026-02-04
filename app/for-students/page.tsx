import Link from 'next/link';

export default function ForStudents() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Discover Your Perfect Career Path
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Stop feeling overwhelmed by career choices. MENTIS helps you discover careers that match your unique strengths, interests, and aspirations.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link
                  href="/auth/signup"
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all font-semibold"
                >
                  Start Your Journey
                </Link>
                <Link
                  href="/how-to-use"
                  className="px-8 py-3 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500/10 transition-all font-semibold"
                >
                  See How It Works
                </Link>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🎓</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">For O/A Level Students</h3>
                    <p className="text-gray-300 text-sm">Choose the right A Level subjects and university programs</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🎯</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">For Matric/FSc Students</h3>
                    <p className="text-gray-300 text-sm">Find the perfect field of study and career direction</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🚀</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">For University Students</h3>
                    <p className="text-gray-300 text-sm">Explore specializations and career opportunities in your field</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">How MENTIS Helps You Succeed</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-blue-500 transition-all">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold text-white mb-3">Understand Yourself</h3>
              <p className="text-gray-400">
                Take a scientifically-designed assessment that reveals your strengths, aptitudes, and interests
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-blue-500 transition-all">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-white mb-3">Get Personalized Guidance</h3>
              <p className="text-gray-400">
                Receive tailored career recommendations based on your unique profile and preferences
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-blue-500 transition-all">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-white mb-3">Plan Your Education</h3>
              <p className="text-gray-400">
                Discover the educational pathways, degrees, and certifications you&apos;ll need
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-blue-500 transition-all">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-semibold text-white mb-3">Explore Career Options</h3>
              <p className="text-gray-400">
                Access detailed information about hundreds of careers, including growth prospects and salaries
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-blue-500 transition-all">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold text-white mb-3">Track Your Progress</h3>
              <p className="text-gray-400">
                Monitor your career exploration journey and update your goals as you grow
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-blue-500 transition-all">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-white mb-3">Make Confident Decisions</h3>
              <p className="text-gray-400">
                Move forward with clarity and confidence, backed by data-driven insights
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Find Your Path?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of students who have discovered their ideal careers with MENTIS
          </p>
          <Link
            href="/auth/signup"
            className="inline-block px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
}
