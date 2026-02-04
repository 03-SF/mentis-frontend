import Link from 'next/link';

export default function ForParents() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Help Your Child Find Their Path
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Support your child&apos;s future with data-driven career guidance. MENTIS helps parents understand their child&apos;s strengths and guide them toward fulfilling careers.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/auth/signup"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all font-semibold"
            >
              Get Started
            </Link>
            <Link
              href="/how-to-use"
              className="px-8 py-3 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500/10 transition-all font-semibold"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Common Concerns */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Common Parent Concerns</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">❓</div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">&quot;My child is confused about their career&quot;</h3>
                  <p className="text-gray-400">
                    MENTIS helps clarify your child&apos;s strengths and interests through scientific assessment, providing clear direction for their future.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">💭</div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">&quot;How do I guide without pressuring?&quot;</h3>
                  <p className="text-gray-400">
                    Our objective assessment removes bias and pressure, allowing your child to discover careers that genuinely match their profile.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🎓</div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">&quot;Which field should they choose?&quot;</h3>
                  <p className="text-gray-400">
                    Get recommendations based on aptitude, interests, and market demand - not just family tradition or peer pressure.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">💼</div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">&quot;What about job prospects?&quot;</h3>
                  <p className="text-gray-400">
                    Our recommendations include career growth prospects, salary ranges, and market demand to help you make informed decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Helps Parents */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">How MENTIS Supports Parents</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-6">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-white mb-3">Understand Your Child</h3>
              <p className="text-gray-400">
                Get objective insights into your child&apos;s strengths, aptitudes, and interests beyond what you observe at home.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-xl p-6">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-white mb-3">Have Informed Discussions</h3>
              <p className="text-gray-400">
                Use assessment results as a foundation for meaningful conversations about your child&apos;s future.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-6">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-white mb-3">Make Smart Investments</h3>
              <p className="text-gray-400">
                Choose the right educational path and avoid costly mistakes or wasted time in unsuitable fields.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Discover */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">What You&apos;ll Discover About Your Child</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4 bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Natural Aptitudes & Talents</h3>
                <p className="text-gray-400">Discover their innate abilities in areas like logical reasoning, creativity, verbal skills, and more</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Interest Areas & Passions</h3>
                <p className="text-gray-400">Understand what truly motivates and engages them beyond surface-level hobbies</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Suitable Career Paths</h3>
                <p className="text-gray-400">Get specific career recommendations that align with their unique profile</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">4</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Educational Requirements</h3>
                <p className="text-gray-400">Learn what degrees, certifications, and training they&apos;ll need for their chosen path</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">Give Your Child the Gift of Clarity</h2>
            <p className="text-gray-300 mb-8">
              Help them make confident decisions about their future with MENTIS
            </p>
            <Link
              href="/auth/signup"
              className="inline-block px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              Start Their Assessment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
