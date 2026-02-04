'use client';
import { useState } from 'react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is MENTIS?",
    answer: "MENTIS is an AI-powered career guidance platform that combines psychometric assessment with real labor market data to provide personalized career recommendations and actionable roadmaps."
  },
  {
    question: "Is this just another psychometric test?",
    answer: "No. While we do use psychometric assessments to understand your strengths and interests, MENTIS goes beyond traditional tests by integrating real-time market data, salary insights, and skill-gap analysis to provide actionable career pathways."
  },
  {
    question: "How accurate are the results?",
    answer: "Our recommendations are data-driven and based on validated psychometric models combined with current labor market trends. However, they should be used as guidance alongside your own research and professional advice, not as absolute predictions."
  },
  {
    question: "Who should use MENTIS?",
    answer: "MENTIS is designed for students exploring career options, professionals considering career transitions, parents seeking to guide their children, and counselors looking for data-driven tools to support their guidance work."
  },
  {
    question: "Is my data safe?",
    answer: "Yes. We take data privacy seriously. All personal information is encrypted and securely stored on cloud infrastructure. We do not sell your data to third parties. For institutional partners, only anonymized aggregate data is shared with explicit consent."
  },
  {
    question: "How is this different from other career tests?",
    answer: "MENTIS uniquely integrates psychometric assessment with real-time labor market data and provides personalized 90-day roadmaps with specific skills to learn, resources to use, and steps to take—not just career labels."
  },
  {
    question: "Do I need to pay to use MENTIS?",
    answer: "We offer a free trial to explore basic features. Premium features, including detailed roadmaps and ongoing market insights, require a subscription. Contact us for institutional pricing."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get answers to common questions about MENTIS and how it works
          </p>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-slate-800/70 transition-all"
              >
                <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                <span className="text-blue-400 text-2xl flex-shrink-0">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 pt-2">
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">Still have questions?</h2>
          <p className="text-gray-300 mb-6">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all font-semibold"
          >
            Contact Support
          </Link>
        </div>
      </section>
    </div>
  );
}
