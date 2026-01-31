'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { generatePrivacyPolicyPDF } from '@/lib/pdfGenerator';

export default function PrivacyPolicyPage() {
  const router = useRouter();
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPDF = () => {
    setDownloading(true);
    try {
      generatePrivacyPolicyPDF();
    } catch (error) {
      console.error('PDF generation error:', error);
    } finally {
      setTimeout(() => setDownloading(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center text-teal-400 hover:text-teal-300 mb-8 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Privacy Policy
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Last Updated: January 31, 2026
            </p>
            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-teal-500/50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {downloading ? 'Generating...' : 'Download Privacy Policy PDF'}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50 space-y-8 text-gray-300">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p className="leading-relaxed">
              Welcome to MENTIS ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our career guidance and psychometric assessment platform.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
            
            <h3 className="text-lg font-semibold text-teal-400 mb-3">2.1 Personal Information</h3>
            <p className="mb-4 leading-relaxed">We collect personal information that you voluntarily provide to us when you:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Register for an account (name, email, password)</li>
              <li>Complete your student profile (education level, grade, stream, location)</li>
              <li>Contact us through our contact form</li>
              <li>Subscribe to newsletters or communications</li>
            </ul>

            <h3 className="text-lg font-semibold text-teal-400 mb-3">2.2 Assessment Data</h3>
            <p className="mb-4 leading-relaxed">When you take our psychometric assessments, we collect:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Your responses to assessment questions</li>
              <li>Test completion data and timestamps</li>
              <li>Results and career recommendations generated</li>
              <li>Progress tracking information</li>
            </ul>

            <h3 className="text-lg font-semibold text-teal-400 mb-3 mt-4">2.3 Automatically Collected Information</h3>
            <p className="mb-4 leading-relaxed">We automatically collect certain information when you use our platform:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Device information (browser type, operating system)</li>
              <li>IP address and location data</li>
              <li>Usage data (pages visited, time spent, features used)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
            <p className="mb-4 leading-relaxed">We use your information to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide and maintain our career guidance services</li>
              <li>Process your psychometric assessments and generate personalized recommendations</li>
              <li>Create and manage your account</li>
              <li>Send you important updates and notifications</li>
              <li>Improve our platform and user experience</li>
              <li>Analyze trends and user behavior for research purposes</li>
              <li>Detect and prevent fraud or security issues</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Sharing Your Information</h2>
            <p className="mb-4 leading-relaxed">We do not sell your personal information. We may share your information with:</p>
            
            <h3 className="text-lg font-semibold text-teal-400 mb-3">4.1 Educational Institutions</h3>
            <p className="mb-4 leading-relaxed">
              With your explicit consent, we may share aggregated assessment results with your educational institution to help them provide better career guidance services.
            </p>

            <h3 className="text-lg font-semibold text-teal-400 mb-3">4.2 Service Providers</h3>
            <p className="mb-4 leading-relaxed">
              We may share your information with third-party service providers who assist us in operating our platform, such as hosting providers, analytics services, and email communication tools.
            </p>

            <h3 className="text-lg font-semibold text-teal-400 mb-3">4.3 Legal Requirements</h3>
            <p className="leading-relaxed">
              We may disclose your information if required by law or in response to valid requests by public authorities.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
            <p className="leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security audits and assessments</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Secure backup and disaster recovery procedures</li>
            </ul>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Data Retention</h2>
            <p className="leading-relaxed">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. Assessment data and career recommendations are retained to track your progress and provide ongoing guidance.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Your Privacy Rights</h2>
            <p className="mb-4 leading-relaxed">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              <li><strong>Object:</strong> Object to processing of your personal information</li>
            </ul>
            <p className="mt-4 leading-relaxed">
              To exercise these rights, please contact us at <a href="mailto:privacy@mentisera.pk" className="text-teal-400 hover:underline">privacy@mentisera.pk</a>
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Children's Privacy</h2>
            <p className="leading-relaxed">
              Our services are designed for students aged 13 and above. If we discover that we have collected personal information from a child under 13 without parental consent, we will take steps to delete that information promptly.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Cookies and Tracking</h2>
            <p className="mb-4 leading-relaxed">
              We use cookies and similar tracking technologies to enhance your experience. You can control cookies through your browser settings. However, disabling cookies may limit your ability to use certain features of our platform.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Changes to This Policy</h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Contact Us</h2>
            <p className="mb-4 leading-relaxed">
              If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
              <p className="mb-2"><strong className="text-white">Email:</strong> <a href="mailto:privacy@mentisera.pk" className="text-teal-400 hover:underline">privacy@mentisera.pk</a></p>
              <p className="mb-2"><strong className="text-white">Phone:</strong> <a href="tel:+923001234567" className="text-teal-400 hover:underline">+92 300 123 4567</a></p>
              <p><strong className="text-white">Address:</strong> Street 11, Ghuari Town, 5-B, Islamabad, Pakistan</p>
            </div>
          </section>

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-400">
            Powered by{' '}
            <a href="https://mentisera.pk" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">
              MENTISERA
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
