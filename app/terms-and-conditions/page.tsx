'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { generateTermsAndConditionsPDF } from '@/lib/pdfGenerator';

export default function TermsAndConditionsPage() {
  const router = useRouter();
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPDF = () => {
    setDownloading(true);
    try {
      generateTermsAndConditionsPDF();
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
                Terms & Conditions
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
              {downloading ? 'Generating...' : 'Download Terms & Conditions PDF'}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50 space-y-8 text-gray-300">
          
          {/* Agreement */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
            <p className="leading-relaxed">
              By accessing or using the MENTIS platform ("Service"), you agree to be bound by these Terms and Conditions ("Terms"). If you disagree with any part of these terms, you may not access the Service. These Terms apply to all visitors, users, and others who access or use the Service.
            </p>
          </section>

          {/* Use License */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Use License</h2>
            <p className="mb-4 leading-relaxed">
              Permission is granted to temporarily access and use the Service for personal, non-commercial purposes. This license does not include:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Modifying or copying Service materials</li>
              <li>Using materials for commercial purposes or public display</li>
              <li>Attempting to decompile or reverse engineer any software</li>
              <li>Removing copyright or proprietary notations</li>
              <li>Transferring materials to another person or "mirroring" materials on another server</li>
            </ul>
            <p className="mt-4 leading-relaxed">
              This license shall automatically terminate if you violate any of these restrictions and may be terminated by MENTIS at any time.
            </p>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts</h2>
            
            <h3 className="text-lg font-semibold text-teal-400 mb-3">3.1 Registration</h3>
            <p className="mb-4 leading-relaxed">
              To use certain features of the Service, you must register for an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.
            </p>

            <h3 className="text-lg font-semibold text-teal-400 mb-3">3.2 Account Security</h3>
            <p className="mb-4 leading-relaxed">
              You are responsible for safeguarding your password and for all activities under your account. You agree to notify us immediately of any unauthorized access to or use of your account.
            </p>

            <h3 className="text-lg font-semibold text-teal-400 mb-3">3.3 Account Termination</h3>
            <p className="leading-relaxed">
              We reserve the right to terminate or suspend your account immediately, without prior notice, for any reason, including breach of these Terms.
            </p>
          </section>

          {/* Acceptable Use */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Acceptable Use Policy</h2>
            <p className="mb-4 leading-relaxed">You agree not to use the Service to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Transmit harmful code, viruses, or malicious software</li>
              <li>Attempt to gain unauthorized access to the Service or related systems</li>
              <li>Impersonate any person or entity</li>
              <li>Harass, abuse, or harm another person</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Collect or track personal information of others without consent</li>
              <li>Use the Service for any illegal or unauthorized purpose</li>
            </ul>
          </section>

          {/* Assessment Services */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Psychometric Assessment Services</h2>
            
            <h3 className="text-lg font-semibold text-teal-400 mb-3">5.1 Nature of Service</h3>
            <p className="mb-4 leading-relaxed">
              Our psychometric assessments and career recommendations are provided for guidance purposes only. They do not constitute professional career counseling, psychological evaluation, or guarantee of career success.
            </p>

            <h3 className="text-lg font-semibold text-teal-400 mb-3">5.2 Assessment Accuracy</h3>
            <p className="mb-4 leading-relaxed">
              While we strive to provide accurate and helpful assessments, results may vary based on individual circumstances. We recommend using our assessments as one of many tools in your career planning process.
            </p>

            <h3 className="text-lg font-semibold text-teal-400 mb-3">5.3 User Responsibility</h3>
            <p className="leading-relaxed">
              You are responsible for providing honest and accurate responses to assessment questions. The quality and relevance of your results depend on the accuracy of your responses.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Intellectual Property Rights</h2>
            <p className="mb-4 leading-relaxed">
              The Service and its original content, features, and functionality are owned by MENTIS and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <p className="leading-relaxed">
              Our trademarks and trade dress may not be used without our prior written permission. All assessment methodologies, algorithms, and recommendation engines are proprietary to MENTIS.
            </p>
          </section>

          {/* User Content */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. User-Generated Content</h2>
            <p className="mb-4 leading-relaxed">
              By submitting content to the Service (including assessment responses, profile information, and feedback), you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, and analyze such content for the purpose of providing and improving the Service.
            </p>
            <p className="leading-relaxed">
              You retain all rights to your personal content, but you represent and warrant that you have all necessary rights to grant us this license.
            </p>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Disclaimer of Warranties</h2>
            <p className="mb-4 leading-relaxed">
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, either express or implied, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Implied warranties of merchantability</li>
              <li>Fitness for a particular purpose</li>
              <li>Non-infringement</li>
              <li>Accuracy, reliability, or completeness of content</li>
              <li>Uninterrupted or error-free service</li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Limitation of Liability</h2>
            <p className="leading-relaxed">
              To the maximum extent permitted by law, MENTIS shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, use, or goodwill, arising out of or related to your use of the Service, whether based on warranty, contract, tort, or any other legal theory.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Indemnification</h2>
            <p className="leading-relaxed">
              You agree to defend, indemnify, and hold harmless MENTIS and its affiliates, officers, directors, employees, and agents from any claims, damages, obligations, losses, liabilities, costs, or expenses arising from your use of the Service or violation of these Terms.
            </p>
          </section>

          {/* Third Party Services */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Third-Party Services</h2>
            <p className="leading-relaxed">
              The Service may contain links to third-party websites or services that are not owned or controlled by MENTIS. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
            </p>
          </section>

          {/* Payment Terms */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Payment and Fees</h2>
            <p className="mb-4 leading-relaxed">
              Certain features of the Service may require payment. You agree to pay all fees according to the pricing and payment terms presented to you. All fees are non-refundable unless otherwise stated.
            </p>
            <p className="leading-relaxed">
              We reserve the right to change our pricing at any time. Price changes will be communicated in advance and will not affect existing subscriptions until renewal.
            </p>
          </section>

          {/* Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">13. Privacy</h2>
            <p className="leading-relaxed">
              Your use of the Service is also governed by our Privacy Policy. Please review our <a href="/privacy-policy" className="text-teal-400 hover:underline">Privacy Policy</a> to understand how we collect, use, and protect your personal information.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">14. Changes to Terms</h2>
            <p className="leading-relaxed">
              We reserve the right to modify or replace these Terms at any time at our sole discretion. Material changes will be notified by posting a notice on the Service or via email. Your continued use of the Service after such changes constitutes acceptance of the new Terms.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">15. Governing Law</h2>
            <p className="leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of Pakistan, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of the Service shall be subject to the exclusive jurisdiction of the courts of Islamabad, Pakistan.
            </p>
          </section>

          {/* Severability */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">16. Severability</h2>
            <p className="leading-relaxed">
              If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will remain in full force and effect. The invalid provision will be modified to the minimum extent necessary to make it valid and enforceable.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">17. Contact Information</h2>
            <p className="mb-4 leading-relaxed">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
              <p className="mb-2"><strong className="text-white">Email:</strong> <a href="mailto:legal@mentisera.pk" className="text-teal-400 hover:underline">legal@mentisera.pk</a></p>
              <p className="mb-2"><strong className="text-white">Phone:</strong> <a href="tel:+923001234567" className="text-teal-400 hover:underline">+92 300 123 4567</a></p>
              <p><strong className="text-white">Address:</strong> Street 11, Ghuari Town, 5-B, Islamabad, Pakistan</p>
            </div>
          </section>

          {/* Acceptance */}
          <section className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 rounded-xl p-6">
            <p className="text-center text-white font-semibold">
              By using the MENTIS Service, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
            </p>
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
