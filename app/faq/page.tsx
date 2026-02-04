import Link from 'next/link';

export default function FAQ() {
  const faqs = [
    {
      category: 'General',
      questions: [
        {
          q: 'What is MENTIS?',
          a: 'MENTIS is an AI-powered career guidance platform that helps students discover suitable career paths through psychometric assessment and personalized recommendations.',
        },
        {
          q: 'How does MENTIS work?',
          a: 'You take a comprehensive assessment that evaluates your interests, aptitudes, and preferences. Our AI analyzes your responses and provides personalized career recommendations with detailed information about each path.',
        },
        {
          q: 'Who can use MENTIS?',
          a: 'MENTIS is designed for O/A Level students, Matric/FSc students, university students, professionals considering career changes, and anyone seeking career guidance.',
        },
      ],
    },
    {
      category: 'Assessment',
      questions: [
        {
          q: 'How long does the assessment take?',
          a: 'The assessment typically takes 30-45 minutes to complete. We recommend taking it in a quiet environment where you can focus without distractions.',
        },
        {
          q: 'Can I retake the assessment?',
          a: 'Yes! With a student plan, you can retake the assessment as many times as you like. Your interests and goals may evolve, and your assessment results should reflect that.',
        },
        {
          q: 'Is the assessment scientifically validated?',
          a: 'Yes, our assessment is based on established psychometric principles and validated career assessment frameworks used by professional career counselors.',
        },
      ],
    },
    {
      category: 'Results & Recommendations',
      questions: [
        {
          q: 'How accurate are the recommendations?',
          a: 'Our recommendations are data-driven and based on your assessment results. However, they should be used as guidance alongside your own research and conversations with educators, parents, and counselors.',
        },
        {
          q: 'Can I download my results?',
          a: 'Yes, student plan users can download their assessment results and career recommendations as a PDF report.',
        },
        {
          q: 'What information do I get about each career?',
          a: 'For each recommended career, you receive: job description, required education, skills needed, salary ranges, growth prospects, and a learning pathway to get there.',
        },
      ],
    },
    {
      category: 'Pricing & Plans',
      questions: [
        {
          q: 'Is there a free trial?',
          a: 'Yes! We offer a free trial that includes one complete assessment and basic career recommendations. You can upgrade anytime for unlimited access and advanced features.',
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept major credit/debit cards and bank transfers for Pakistani customers. All payments are processed securely.',
        },
        {
          q: 'Do you offer institutional pricing?',
          a: 'Yes, we offer special pricing for schools, colleges, and universities. Contact our sales team for a custom quote.',
        },
      ],
    },
    {
      category: 'Technical',
      questions: [
        {
          q: 'What devices can I use MENTIS on?',
          a: 'MENTIS is a web-based platform accessible from any device with an internet connection - desktop, laptop, tablet, or smartphone.',
        },
        {
          q: 'Do I need to install anything?',
          a: 'No installation required! Simply visit our website, create an account, and start your assessment.',
        },
        {
          q: 'Is my data secure?',
          a: 'Yes, we take data security seriously. All your information is encrypted and stored securely. We never share your personal data with third parties. Read our Privacy Policy for details.',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about MENTIS
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-3xl font-bold text-white mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => (
                  <div
                    key={faqIndex}
                    className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-blue-500 transition-all"
                  >
                    <h3 className="text-lg font-semibold text-white mb-3">{faq.q}</h3>
                    <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Still Have Questions?</h2>
            <p className="text-gray-300 mb-8">
              Can&apos;t find the answer you&apos;re looking for? Our support team is here to help.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all font-semibold"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
