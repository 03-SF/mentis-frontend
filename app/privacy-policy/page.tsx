export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        <p className="text-gray-400 mb-12">Last Updated: August 1, 2024</p>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
            <p className="mb-3">We collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-white">Account Information:</strong> Name, email address, and demographic details when you create an account</li>
              <li><strong className="text-white">Assessment Data:</strong> Your responses to psychometric assessments and career questionnaires</li>
              <li><strong className="text-white">Profile Information:</strong> Educational background, work experience, and career preferences</li>
              <li><strong className="text-white">Usage Data:</strong> Logs, analytics, and interaction patterns within the platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
            <p className="mb-3">Your data is used to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide personalized career recommendations and guidance</li>
              <li>Generate assessment reports and career roadmaps</li>
              <li>Improve our AI models and platform features</li>
              <li>Understand usage patterns and develop new features</li>
              <li>Communicate important updates and platform improvements</li>
              <li>Comply with legal and regulatory requirements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Data Sharing and Disclosure</h2>
            <p className="mb-3"><strong className="text-white">We do not sell your personal data.</strong></p>
            <p className="mb-3">We may share data in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-white">Service Providers:</strong> Trusted third-party services that help us operate the platform (e.g., cloud hosting, analytics)</li>
              <li><strong className="text-white">Institutional Partners:</strong> Only anonymized, aggregate data is shared with educational institutions, and only with explicit user consent</li>
              <li><strong className="text-white">Legal Requirements:</strong> When required by law or to protect our legal rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
            <p className="mb-3">
              We employ industry-standard security measures including encryption, secure cloud infrastructure (Google Cloud Platform), and access controls to protect your data. While we strive to protect your information, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Your Rights</h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-white">Access:</strong> Request a copy of your personal data</li>
              <li><strong className="text-white">Rectification:</strong> Correct inaccurate or incomplete information</li>
              <li><strong className="text-white">Erasure:</strong> Request deletion of your data, subject to legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Children's Privacy</h2>
            <p>
              MENTIS is not intended for users under 15 years of age without parental or guardian consent. We do not knowingly collect personal information from children under 15 without such consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify users of significant changes by updating the "Last Updated" date and posting the revised policy on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Contact Us</h2>
            <p>
              For questions or concerns about this Privacy Policy, please contact us at:{' '}
              <a href="mailto:privacy@mentis.app" className="text-blue-400 hover:underline">
                privacy@mentis.app
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
