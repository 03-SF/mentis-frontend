import Link from 'next/link';

export default function Pricing() {
  const plans = [
    {
      name: 'Free Trial',
      price: 'Free',
      period: 'Limited Time',
      description: 'Perfect for exploring the platform',
      features: [
        'One complete assessment',
        'Basic career recommendations',
        'Access to career database',
        '24-hour support response',
      ],
      cta: 'Start Free Trial',
      highlighted: false,
    },
    {
      name: 'Student',
      price: 'PKR 2,999',
      period: 'per year',
      description: 'Ideal for individual students',
      features: [
        'Unlimited assessments',
        'Detailed career reports',
        'Learning pathway access',
        'Priority support',
        'Progress tracking',
        'PDF report downloads',
      ],
      cta: 'Choose Student Plan',
      highlighted: true,
    },
    {
      name: 'Institution',
      price: 'Custom',
      period: 'contact us',
      description: 'For schools and universities',
      features: [
        'Bulk student accounts',
        'Admin dashboard',
        'Analytics & reporting',
        'Custom branding',
        'Dedicated support',
        'Training sessions',
        'API access',
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Choose the plan that fits your needs. All plans include our core features.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 ${
                  plan.highlighted
                    ? 'bg-gradient-to-b from-blue-600/20 to-purple-600/20 border-2 border-blue-500 scale-105'
                    : 'bg-slate-800/50 border border-slate-700'
                } backdrop-blur-sm hover:border-blue-500 transition-all duration-300`}
              >
                {plan.highlighted && (
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold px-4 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="text-gray-400 ml-2">/ {plan.period}</span>}
                </div>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2 text-gray-300">
                      <svg
                        className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.price === 'Custom' ? '/contact' : '/auth/signup'}
                  className={`block w-full text-center py-3 rounded-lg font-semibold transition-all ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                      : 'bg-slate-700 text-white hover:bg-slate-600'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Can I upgrade or downgrade my plan?</h3>
              <p className="text-gray-400">Yes, you can change your plan at any time. Changes take effect immediately.</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-400">We accept all major credit cards, debit cards, and bank transfers for Pakistani customers.</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Is there a refund policy?</h3>
              <p className="text-gray-400">
                Yes, we offer a 7-day money-back guarantee. Check our{' '}
                <Link href="/refund-policy" className="text-blue-400 hover:underline">
                  refund policy
                </Link>{' '}
                for details.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
