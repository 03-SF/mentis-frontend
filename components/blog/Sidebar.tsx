import NewsletterCTA from './NewsletterCTA';

export default function Sidebar() {
  return (
    <div className="space-y-6">
      {/* Newsletter Signup */}
      <NewsletterCTA />

      {/* About Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">About MENTIS</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          MENTIS is an AI-powered career guidance platform helping students and
          professionals discover their ideal career paths through comprehensive
          assessments and personalized recommendations.
        </p>
        <a
          href="/about"
          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          Learn More →
        </a>
      </div>

      {/* Topics/Categories - Placeholder for Phase 2 */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Popular Topics
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            'Career Guidance',
            'Assessment',
            'Professional Development',
            'Education',
            'Student Success',
          ].map((topic) => (
            <span
              key={topic}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-blue-50 hover:text-blue-600 transition cursor-pointer"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* CTA Card */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-md p-6 text-white">
        <h3 className="text-xl font-bold mb-3">Ready to Get Started?</h3>
        <p className="text-white/90 text-sm mb-4">
          Take our comprehensive career assessment and discover your perfect
          career path today.
        </p>
        <a
          href="/assessment"
          className="block w-full bg-white text-blue-600 text-center font-semibold py-3 rounded-lg hover:bg-gray-50 transition"
        >
          Start Assessment
        </a>
      </div>
    </div>
  );
}
