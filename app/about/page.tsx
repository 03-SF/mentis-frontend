import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About MENTIS
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Empowering the next generation to make informed career decisions through AI-powered guidance
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                MENTIS is a career guidance and decision-support platform that helps students move from confusion to clear, actionable career direction.
              </p>
              <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                We believe every student deserves access to quality career guidance that&apos;s personalized, data-driven, and accessible. Our mission is to democratize career counseling through technology.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                By combining psychometric assessment, artificial intelligence, and comprehensive career data, we help students discover paths that align with their unique strengths and aspirations.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Our Values</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Student-Centric</h4>
                    <p className="text-gray-300 text-sm">Every feature is designed with students&apos; needs at the forefront</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Evidence-Based</h4>
                    <p className="text-gray-300 text-sm">Our recommendations are grounded in scientific research and data</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Accessible</h4>
                    <p className="text-gray-300 text-sm">Quality career guidance should be available to everyone, everywhere</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Innovative</h4>
                    <p className="text-gray-300 text-sm">We continuously evolve to provide the best possible experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-8">Our Story</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-gray-300 mb-4 leading-relaxed">
              MENTIS was born from a simple observation: too many talented students struggle with career decisions not because they lack ability, but because they lack guidance.
            </p>
            <p className="text-lg text-gray-300 mb-4 leading-relaxed">
              Traditional career counseling is often limited by availability, cost, and scalability. Schools may have one counselor for hundreds of students. Private counseling can be expensive and inconsistent in quality.
            </p>
            <p className="text-lg text-gray-300 mb-4 leading-relaxed">
              We saw an opportunity to leverage technology - specifically artificial intelligence and psychometric assessment - to provide personalized career guidance at scale.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Today, MENTIS serves thousands of students across Pakistan, helping them discover careers they never knew existed and giving them the confidence to pursue their dreams.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
                10,000+
              </div>
              <div className="text-gray-300 text-lg">Students Guided</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
                500+
              </div>
              <div className="text-gray-300 text-lg">Career Paths</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
                50+
              </div>
              <div className="text-gray-300 text-lg">Partner Institutions</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
                95%
              </div>
              <div className="text-gray-300 text-lg">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Developed by MENTISERA</h2>
          <p className="text-lg text-gray-300 mb-8">
            MENTIS is an early-stage career guidance and decision-support platform developed by{' '}
            <a
              href="https://mentisera.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              MENTISERA (SMC-Private) Limited
            </a>
            , a technology company focused on educational innovation and career development solutions.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/team"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all font-semibold"
            >
              Meet Our Team
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500/10 transition-all font-semibold"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
