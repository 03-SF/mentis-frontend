import Link from 'next/link';

export default function Features() {
  const features = [
    {
      title: 'AI-Powered Assessment',
      description: 'Advanced psychometric analysis using artificial intelligence to understand your unique strengths, interests, and aptitudes.',
      icon: '🤖',
    },
    {
      title: 'Personalized Recommendations',
      description: 'Get tailored career suggestions based on your assessment results, academic background, and career preferences.',
      icon: '🎯',
    },
    {
      title: 'Comprehensive Career Database',
      description: 'Access detailed information about hundreds of career paths, including requirements, growth prospects, and salary ranges.',
      icon: '📚',
    },
    {
      title: 'Learning Pathways',
      description: 'Discover step-by-step educational roadmaps to achieve your career goals, from degrees to certifications.',
      icon: '🛤️',
    },
    {
      title: 'Real-Time Analysis',
      description: 'Instant results and insights powered by cutting-edge machine learning algorithms.',
      icon: '⚡',
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor your career exploration journey and revisit your assessment as you grow and evolve.',
      icon: '📈',
    },
    {
      title: 'Expert-Validated Content',
      description: 'All career information is reviewed and validated by industry professionals and career counselors.',
      icon: '✅',
    },
    {
      title: 'Accessible Anywhere',
      description: 'Cloud-based platform accessible from any device - desktop, tablet, or mobile.',
      icon: '🌐',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Platform Features
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Discover how MENTIS uses cutting-edge technology to guide you toward your ideal career path
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500 transition-all duration-300 card-hover"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Explore Your Future?</h2>
            <p className="text-gray-300 mb-8">
              Start your career discovery journey today with our comprehensive assessment
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/auth/signup"
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
              >
                Get Started
              </Link>
              <Link
                href="/how-to-use"
                className="px-8 py-3 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500/10 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
