import Link from 'next/link';

export default function CancellationPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Cancellation Policy
          </h1>
          <p className="text-gray-400 mb-4">Last Updated: February 2026</p>
          <p className="text-lg text-gray-300">
            This policy explains how you can cancel your MENTIS subscription and what happens when you do.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Cancellation Overview</h2>
            <p className="text-gray-300 mb-4">
              You can cancel your MENTIS subscription at any time with no cancellation fees or penalties. We believe in making it as easy to leave as it is to join.
            </p>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-300 text-sm">
                <strong>Good News:</strong> No cancellation fees, no questions asked, no hassle.
              </p>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">How to Cancel</h2>
            <div className="space-y-4 text-gray-300">
              <p className="font-semibold text-white">Method 1: Cancel from Your Account</p>
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                    1
                  </span>
                  <span>Log in to your MENTIS account</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                    2
                  </span>
                  <span>Go to Settings → Subscription</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                    3
                  </span>
                  <span>Click &quot;Cancel Subscription&quot;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                    4
                  </span>
                  <span>Confirm your cancellation</span>
                </li>
              </ol>

              <p className="font-semibold text-white mt-6">Method 2: Contact Support</p>
              <p>Email us at <a href="mailto:support@mentisera.pk" className="text-blue-400 hover:underline">support@mentisera.pk</a> with your account email and request cancellation. We&apos;ll process it within 24 hours.</p>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">What Happens After Cancellation</h2>
            <div className="space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Immediate Effects:</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>No further charges will be made</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Auto-renewal is disabled</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>You&apos;ll receive a cancellation confirmation email</span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Access Retention:</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>You keep full access until the end of your current billing period</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>All your data and assessment results remain accessible during this time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>You can download any reports before your access expires</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">After Subscription Ends:</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1">•</span>
                    <span>Your account reverts to free tier</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1">•</span>
                    <span>Premium features become unavailable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1">•</span>
                    <span>Your data is retained but access is limited</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1">•</span>
                    <span>You can resubscribe anytime to regain full access</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Refunds and Cancellation</h2>
            <div className="space-y-4 text-gray-300">
              <p><strong className="text-white">Within 7 Days of Purchase:</strong></p>
              <p>If you cancel within 7 days of your initial purchase, you&apos;re eligible for a full refund under our money-back guarantee. See our <Link href="/refund-policy" className="text-blue-400 hover:underline">Refund Policy</Link> for details.</p>

              <p className="pt-4"><strong className="text-white">After 7 Days:</strong></p>
              <p>If you cancel after 7 days, no refund will be issued for the current billing period. You&apos;ll maintain access until the period ends.</p>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Reactivating Your Subscription</h2>
            <p className="text-gray-300 mb-4">Changed your mind? You can reactivate anytime:</p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Log in to your account</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Go to Settings → Subscription</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Click &quot;Reactivate Subscription&quot;</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>All your previous data and results will be instantly accessible</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Institutional Account Cancellations</h2>
            <p className="text-gray-300 mb-4">
              For institutional plans (schools, universities), cancellation terms may differ based on your contract:
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Review your institutional agreement for specific cancellation terms</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Contact your account manager for cancellation assistance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Student access may be managed according to academic calendar terms</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Data Retention After Cancellation</h2>
            <p className="text-gray-300 mb-4">We respect your data. Here&apos;s what happens:</p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span><strong className="text-white">Your account data:</strong> Retained indefinitely (free tier access)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span><strong className="text-white">Assessment results:</strong> Kept for your reference even after cancellation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span><strong className="text-white">Complete account deletion:</strong> Available on request via <Link href="/contact" className="text-blue-400 hover:underline">support</Link></span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Need Help with Cancellation?</h2>
            <p className="text-gray-300 mb-4">
              Before you cancel, let us know if there&apos;s anything we can do to improve your experience. We&apos;re always here to help!
            </p>
            <div className="space-y-2 text-gray-300">
              <p>Email: <a href="mailto:support@mentisera.pk" className="text-blue-400 hover:underline">support@mentisera.pk</a></p>
              <p>Phone: <a href="tel:+923001234567" className="text-blue-400 hover:underline">+92 300 123 4567</a></p>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
            <p className="text-blue-300 text-sm">
              <strong>Note:</strong> This cancellation policy is subject to change. Changes will be posted on this page with an updated date. Your continued use after changes constitutes acceptance of the new policy.
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
