import Link from 'next/link';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Refund Policy
          </h1>
          <p className="text-gray-400 mb-4">Last Updated: February 2026</p>
          <p className="text-lg text-gray-300">
            At MENTIS, we want you to be completely satisfied with our service. This policy outlines our refund terms and conditions.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">7-Day Money-Back Guarantee</h2>
            <p className="text-gray-300 mb-4">
              We offer a 7-day money-back guarantee for all paid plans. If you&apos;re not satisfied with MENTIS within 7 days of your purchase, you can request a full refund.
            </p>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-blue-300 text-sm">
                <strong>Note:</strong> The 7-day period starts from the date of purchase, not the date you start using the service.
              </p>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Eligibility for Refund</h2>
            <p className="text-gray-300 mb-4">To be eligible for a refund, you must meet the following conditions:</p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Request must be made within 7 days of purchase</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>You must provide a reason for the refund request</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Your account must not have violated our Terms of Service</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>No previous refunds have been issued for your account</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">How to Request a Refund</h2>
            <div className="space-y-4 text-gray-300">
              <p>To request a refund, follow these steps:</p>
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                    1
                  </span>
                  <span>Contact our support team at <a href="mailto:support@mentisera.pk" className="text-blue-400 hover:underline">support@mentisera.pk</a></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                    2
                  </span>
                  <span>Include your account email and order/transaction ID</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                    3
                  </span>
                  <span>Provide a brief reason for your refund request</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                    4
                  </span>
                  <span>Our team will review and respond within 2-3 business days</span>
                </li>
              </ol>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Refund Processing</h2>
            <p className="text-gray-300 mb-4">Once your refund is approved:</p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Refunds will be processed within 5-7 business days</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>The amount will be credited to your original payment method</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>It may take an additional 3-5 business days for the refund to appear in your account depending on your bank</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Your access to premium features will be revoked once the refund is processed</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Non-Refundable Items</h2>
            <p className="text-gray-300 mb-4">The following are not eligible for refunds:</p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">✕</span>
                <span>Requests made after the 7-day period</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">✕</span>
                <span>Free trial accounts (no payment made)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">✕</span>
                <span>Institutional plans with custom agreements (subject to contract terms)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">✕</span>
                <span>Accounts that have been banned for Terms of Service violations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">✕</span>
                <span>Second or subsequent refund requests from the same user</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Subscription Cancellations</h2>
            <p className="text-gray-300 mb-4">
              If you cancel your subscription within the refund period, you&apos;ll receive a full refund. After the refund period:
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>You can cancel anytime, but no refund will be provided for the current billing period</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>You&apos;ll retain access until the end of your paid period</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>No automatic renewal will occur after cancellation</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Questions About Refunds?</h2>
            <p className="text-gray-300 mb-4">
              If you have any questions about our refund policy or need assistance with a refund request, please contact us:
            </p>
            <div className="space-y-2 text-gray-300">
              <p>Email: <a href="mailto:support@mentisera.pk" className="text-blue-400 hover:underline">support@mentisera.pk</a></p>
              <p>Phone: <a href="tel:+923001234567" className="text-blue-400 hover:underline">+92 300 123 4567</a></p>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
            <p className="text-blue-300 text-sm">
              <strong>Important:</strong> This refund policy is subject to change. Any changes will be posted on this page with an updated &quot;Last Updated&quot; date. Your continued use of MENTIS after changes constitutes acceptance of the new policy.
            </p>
          </div>

          <div className="text-center pt-8">
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
