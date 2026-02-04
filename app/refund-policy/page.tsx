import Footer from '@/components/Footer';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
          Refund Policy
        </h1>
        <p className="text-gray-400 mb-12">Last Updated: August 1, 2024</p>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. B2C (Individual Users) Services</h2>
            
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-4">
              <h3 className="text-xl font-semibold text-white mb-3">General Policy</h3>
              <p className="mb-3">
                <strong className="text-white">No refunds are provided for digital products and services</strong> once a purchase is completed and AI-generated career analysis begins. This is because:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Our AI systems immediately begin processing your assessment data upon purchase</li>
                <li>Computational resources and API costs are incurred instantly</li>
                <li>Digital content is delivered immediately and cannot be "returned"</li>
              </ul>
            </div>

            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Exceptional Circumstances</h3>
              <p className="mb-3">Refunds may be considered only in the following situations:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-white">Technical Failure:</strong> If our system fails to generate your report due to a platform error (not user error)</li>
                <li><strong className="text-white">Duplicate Charges:</strong> If you were charged twice for the same service</li>
              </ul>
              <p className="mt-3 text-sm">
                <em>Note: Dissatisfaction with AI recommendations or career guidance outcomes is not grounds for a refund, as results are based on the data you provide and market conditions at the time of analysis.</em>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. B2B (Institutional) Services</h2>
            <p>
              Refund terms for schools, universities, and organizational partnerships are governed by the signed Master Service Agreement (MSA) or Pilot Agreement. Please refer to your contract or contact your account manager for specific refund provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. How to Request a Refund</h2>
            <p className="mb-3">
              If you believe you qualify for a refund under exceptional circumstances:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Email us at <a href="mailto:support@mentis.app" className="text-blue-400 hover:underline">support@mentis.app</a> within 7 days of purchase</li>
              <li>Include your transaction ID, account email, and detailed explanation</li>
              <li>Our team will respond within 3-5 business days with a decision</li>
            </ol>
          </section>

          <section className="bg-slate-800/30 border-l-4 border-purple-500 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Questions?</h3>
            <p>
              Contact our support team at{' '}
              <a href="mailto:support@mentis.app" className="text-blue-400 hover:underline">
                support@mentis.app
              </a>
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
