import Footer from '@/components/Footer';

export default function CancellationPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
          Cancellation Policy
        </h1>
        <p className="text-gray-400 mb-12">Last Updated: August 1, 2024</p>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. B2C (Individual Users) Services</h2>
            
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-4">
              <h3 className="text-xl font-semibold text-white mb-3">No Cancellation After Purchase</h3>
              <p className="mb-3">
                <strong className="text-white">Once you complete a purchase, cancellation is not available.</strong> This policy exists because:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>AI-powered career analysis begins immediately upon payment confirmation</li>
                <li>Computational resources and API costs are consumed instantly</li>
                <li>Your personalized report is generated within minutes, making the service non-refundable</li>
              </ul>
            </div>

            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Before You Purchase</h3>
              <p className="mb-3">
                You are <strong className="text-white">free to abandon your cart</strong> or exit the platform at any time before completing payment. No charges will be applied until you finalize the transaction.
              </p>
              <p className="text-sm">
                <em>We recommend reviewing all details, understanding our services, and exploring our free features before making a purchase decision.</em>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. B2B (Institutional) Services</h2>
            <p className="mb-3">
              Cancellation policies for schools, universities, and organizational partnerships are governed by the signed Master Service Agreement (MSA) or Pilot Agreement. Institutional clients should:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Review cancellation terms in your specific contract</li>
              <li>Contact your dedicated account manager for cancellation requests</li>
              <li>Refer to notice periods and conditions outlined in your agreement</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Subscription Services (If Applicable)</h2>
            <p>
              For any recurring subscription services, users may cancel their subscription at any time to prevent future charges. However:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Cancellation does not entitle users to a refund for the current billing period</li>
              <li>Access to premium features continues until the end of the paid period</li>
              <li>No partial refunds are provided for unused time within a billing cycle</li>
            </ul>
          </section>

          <section className="bg-slate-800/30 border-l-4 border-purple-500 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Questions About Cancellation?</h3>
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
