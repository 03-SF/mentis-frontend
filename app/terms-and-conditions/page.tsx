import Footer from '@/components/Footer';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
          Terms of Use
        </h1>
        <p className="text-gray-400 mb-12">Last Updated: August 1, 2024</p>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Service Disclaimers</h2>
            <div className="bg-slate-800/50 border-l-4 border-purple-500 p-4 mb-4">
              <p className="font-semibold text-white mb-2">Important: Please Read Carefully</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>MENTIS provides <strong>guidance, not guarantees</strong>. Career outcomes depend on many factors beyond our control.</li>
                <li>Our AI-generated recommendations are <strong>informational only</strong> and should not replace professional career counseling or mental health services.</li>
                <li>MENTIS is designed for <strong>educational and exploratory purposes</strong>, not as a clinical or diagnostic tool.</li>
                <li>Career recommendations are based on data patterns and algorithms, not deterministic predictions.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. User Accounts</h2>
            <p className="mb-3">When you create an account, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your password and account</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized access</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Intellectual Property</h2>
            <p>
              All content, features, and functionality of MENTIS, including but not limited to text, graphics, logos, software, and AI models, are the exclusive property of MENTISERA (SMC-Private) Limited and are protected by international copyright and trademark laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Prohibited Uses</h2>
            <p className="mb-3">You may not:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the platform for any unlawful purpose or in violation of these Terms</li>
              <li>Attempt to reverse-engineer, decompile, or extract the source code of our AI models</li>
              <li>Use automated systems (bots, scrapers) to access the platform without written permission</li>
              <li>Interfere with or disrupt the platform's operation or security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Termination</h2>
            <p>
              We reserve the right to terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, MENTISERA shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of Pakistan, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Significant changes will be communicated with at least 30 days' notice. Continued use of the platform after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Contact</h2>
            <p>
              For questions about these Terms, contact us at:{' '}
              <a href="mailto:legal@mentis.app" className="text-blue-400 hover:underline">
                legal@mentis.app
              </a>
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
