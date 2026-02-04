import Footer from '@/components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
            About MENTIS: Our Purpose and Principles
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Empowering informed career decisions through AI-driven guidance and data transparency
          </p>
        </div>
      </section>

      {/* Why MENTIS Exists */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Why MENTIS Exists</h2>
          <p className="text-lg text-gray-300 mb-4">
            Pakistan faces a significant education-to-employment gap. Millions of students and professionals make life-altering career decisions based on social pressure, outdated advice, or incomplete information.
          </p>
          <p className="text-lg text-gray-300 mb-4">
            MENTIS was created to address this challenge by replacing ambiguity with clarity. We provide data-driven career guidance that combines psychometric assessment with real-world labor market insights to help individuals make informed decisions about their futures.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Who We Are</h2>
          <p className="text-lg text-gray-300 mb-8">
            We are a team of educators, AI specialists, psychometric experts, and engineers with extensive experience in the EdTech sector. Our diverse backgrounds allow us to approach career guidance from multiple perspectives, ensuring our platform is both technically sophisticated and pedagogically sound.
          </p>
        </div>
      </section>

      {/* Responsible AI */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Our Responsible AI Stance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Transparency</h3>
              <p className="text-gray-300">We use interpretable AI models and clearly communicate how recommendations are generated</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Fairness</h3>
              <p className="text-gray-300">Our algorithms are regularly audited for bias to ensure equitable guidance across all demographics</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Data Privacy</h3>
              <p className="text-gray-300">Users maintain control over their data with robust security measures and consent protocols</p>
            </div>
          </div>
        </div>
      </section>

      {/* Limitations */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">What MENTIS Does Not Claim</h2>
          <div className="space-y-4">
            <div className="bg-slate-800/30 border-l-4 border-blue-500 p-4">
              <p className="text-gray-300"><strong className="text-white">No Job Placement Guarantees:</strong> MENTIS provides guidance and insights, not guaranteed employment outcomes.</p>
            </div>
            <div className="bg-slate-800/30 border-l-4 border-purple-500 p-4">
              <p className="text-gray-300"><strong className="text-white">Not Deterministic Predictions:</strong> Our AI offers informed recommendations based on data patterns, not absolute predictions.</p>
            </div>
            <div className="bg-slate-800/30 border-l-4 border-blue-500 p-4">
              <p className="text-gray-300"><strong className="text-white">Not a Replacement for Human Counselors:</strong> MENTIS complements professional guidance but does not replace personalized human counseling.</p>
            </div>
            <div className="bg-slate-800/30 border-l-4 border-purple-500 p-4">
              <p className="text-gray-300"><strong className="text-white">Not a Clinical Tool:</strong> Our assessments are for career exploration, not clinical psychological diagnosis.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Info */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Legal & Corporate Information</h2>
          <p className="text-lg text-gray-300 mb-4">
            MENTIS is powered by <strong className="text-white">MENTISERA.PK</strong>
          </p>
          <p className="text-gray-300 mb-2">
            <strong className="text-white">SECP Registration No:</strong> 0312201
          </p>
          <p className="text-gray-300 mb-2">
            <strong className="text-white">Legal Entity:</strong> MENTISERA (SMC-Private) Limited
          </p>
          <p className="text-gray-300 mb-2">
            <strong className="text-white">Registration:</strong> Registered with FBR under the Companies Act, 2017
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
