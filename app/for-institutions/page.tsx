import Link from 'next/link';
import Footer from '@/components/Footer';

export default function ForInstitutions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Career Guidance for Schools & Universities
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Partner with MENTIS to provide your students with data-driven career guidance. Our institutional dashboards offer actionable insights into student aspirations, skill gaps, and alignment with market demand.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-all font-semibold"
          >
            Inquire About a Pilot Program
          </Link>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Who This Is For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Universities & Higher Education</h3>
              <p className="text-gray-300">
                Equip your career services with tools to guide students, align curriculum with job market needs, and track career interests at scale.
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">High Schools & Colleges</h3>
              <p className="text-gray-300">
                Provide early-stage career exploration tools to help students make informed decisions about their future fields of study.
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Government & Policy Bodies</h3>
              <p className="text-gray-300">
                Utilize anonymized data to understand workforce trends, identify skill gaps, and inform educational policy.
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Educational Boards</h3>
              <p className="text-gray-300">
                Gain insights into how curriculum standards align with skills demanded by high-growth industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pilot Program */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-8">Pilot Program Structure</h2>
          <p className="text-center text-gray-300 mb-12">
            We partner through a structured, low-risk pilot program designed to demonstrate value and ensure successful long-term partnership.
          </p>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-2">1. Scoping & Onboarding (2 Weeks)</h3>
              <p className="text-gray-300">Define pilot goals, identify student cohorts, and configure the dashboard.</p>
            </div>
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-2">2. Student Deployment (4-8 Weeks)</h3>
              <p className="text-gray-300">Students access MENTIS to complete assessments and receive career reports.</p>
            </div>
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-2">3. Data Aggregation (2 Weeks)</h3>
              <p className="text-gray-300">Analyze anonymized data and present key findings on your institutional dashboard.</p>
            </div>
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-2">4. Feedback Session (1 Week)</h3>
              <p className="text-gray-300">Review outcomes and discuss long-term implementation strategies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Data Ethics */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-8">Data Responsibility & Ethics</h2>
          <p className="text-center text-gray-300 mb-12">
            We are committed to the highest standards of data privacy and ethical AI.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">✓ Anonymization</h3>
              <p className="text-gray-300 text-sm">All institutional data is aggregated and fully anonymized.</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">✓ User Consent</h3>
              <p className="text-gray-300 text-sm">Students provide explicit consent for data usage.</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">✓ Ethical AI</h3>
              <p className="text-gray-300 text-sm">Algorithms regularly audited for bias.</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">✓ Data Security</h3>
              <p className="text-gray-300 text-sm">Secure cloud infrastructure protects all data.</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/privacy-policy" className="text-blue-400 hover:underline">
              Read Our Full Privacy Policy
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/contact"
            className="inline-block px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
          >
            Contact Us About a Pilot Program
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
