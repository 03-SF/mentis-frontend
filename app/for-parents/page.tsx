import Link from 'next/link';
import Footer from '@/components/Footer';

export default function ForParents() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Support Their Future with Confidence.
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              As a parent, you want the best for your child. MENTIS is a tool that helps you support their career journey with data-driven insights and a practical plan, replacing uncertainty with clarity and confidence.
            </p>
            <Link
              href="/how-to-use"
              className="inline-block px-8 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-all font-semibold"
            >
              Learn How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-4">Navigating the Future Together</h2>
          <p className="text-center text-gray-300 mb-12 text-lg">
            It&apos;s natural to have questions and concerns about your child&apos;s career path. MENTIS is designed to address them.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">🎯</div>
              <p className="text-gray-300">
                You want your child to have a successful and fulfilling future.
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">😟</div>
              <p className="text-gray-300">
                You worry about them choosing a degree that won&apos;t lead to a good job.
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">🤝</div>
              <p className="text-gray-300">
                You want to support them but aren&apos;t sure what the best advice is.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">A Partner in Their Success</h2>
          <p className="text-center text-gray-300 mb-12 text-lg">
            MENTIS provides a structured and transparent framework that you and your child can use to explore and plan for the future together.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-white mb-3">Data-Driven Guidance</h3>
              <p className="text-gray-300">
                Our recommendations are based on real market data and a student&apos;s unique strengths, not just social trends or guesswork.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-xl p-8">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-white mb-3">Focus on Action</h3>
              <p className="text-gray-300">
                MENTIS provides a clear, step-by-step roadmap, giving your child a tangible plan to follow and build momentum.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-white mb-3">Transparent & Trustworthy</h3>
              <p className="text-gray-300">
                We are clear about what our tool does and does not do. Our goal is to empower informed decisions, not make them for your child.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">Encourage Their First Step</h2>
            <p className="text-gray-300 mb-8">
              Invite your child to take the free career assessment. It&apos;s a productive and insightful way to start a conversation about their future, grounded in their own unique potential.
            </p>
            <Link
              href="/auth/signup"
              className="inline-block px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
