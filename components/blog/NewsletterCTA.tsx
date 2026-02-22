'use client';

import { useState } from 'react';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // TODO: Implement newsletter subscription logic
    // For now, simulate a successful subscription
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-md p-6 border border-blue-100">
      <div className="text-center mb-4">
        <svg
          className="w-12 h-12 text-blue-600 mx-auto mb-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Stay Updated
        </h3>
        <p className="text-gray-600 text-sm">
          Get the latest career insights and tips delivered to your inbox.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={status === 'loading' || status === 'success'}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-100"
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {status === 'loading' && 'Subscribing...'}
          {status === 'success' && '✓ Subscribed!'}
          {status !== 'loading' && status !== 'success' && 'Subscribe'}
        </button>
      </form>

      {status === 'error' && (
        <p className="text-red-600 text-sm text-center mt-2">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
