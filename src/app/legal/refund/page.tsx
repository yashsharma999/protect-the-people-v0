'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function RefundPolicyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/legal"
              className="inline-flex items-center text-secondary hover:text-primary mb-6 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Legal
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Refund Policy
            </h1>
            <p className="text-sm text-secondary">
              Last updated: January 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-sm"
          >
            <div className="prose prose-lg max-w-none text-secondary">
              <h2 className="text-2xl font-semibold text-primary mb-4">Our Refund Policy</h2>
              <p className="mb-6">
                PTP Foundation is grateful for every donation we receive. We understand that
                sometimes circumstances change, and we have established this refund policy
                to address such situations fairly and transparently.
              </p>

              <h2 className="text-2xl font-semibold text-primary mb-4">General Policy</h2>
              <p className="mb-6">
                All donations made to PTP Foundation are generally non-refundable as they are
                used to support our ongoing charitable programs. However, we consider refund
                requests on a case-by-case basis under specific circumstances.
              </p>

              <h2 className="text-2xl font-semibold text-primary mb-4">Eligible for Refund</h2>
              <p className="mb-4">Refunds may be considered in the following situations:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Duplicate donations:</strong> If you accidentally made the same donation twice</li>
                <li><strong>Incorrect amount:</strong> If you were charged an amount different from what you intended</li>
                <li><strong>Technical errors:</strong> If there was a website error that resulted in an unintended donation</li>
                <li><strong>Unauthorized transaction:</strong> If the donation was made without your authorization</li>
              </ul>

              <h2 className="text-2xl font-semibold text-primary mb-4">Refund Request Timeline</h2>
              <p className="mb-6">
                Refund requests must be submitted within 30 days of the original donation date.
                Requests made after this period may not be eligible for a refund.
              </p>

              <h2 className="text-2xl font-semibold text-primary mb-4">How to Request a Refund</h2>
              <p className="mb-4">To request a refund, please:</p>
              <ol className="list-decimal pl-6 mb-6 space-y-2">
                <li>Email us at <a href="mailto:info@cdu.org" className="text-accent hover:underline">info@cdu.org</a></li>
                <li>Include your name, donation date, and donation amount</li>
                <li>Provide the reason for your refund request</li>
                <li>Include any relevant transaction or receipt numbers</li>
              </ol>

              <h2 className="text-2xl font-semibold text-primary mb-4">Processing Time</h2>
              <p className="mb-6">
                If your refund request is approved, the refund will be processed within 7-14
                business days. The refund will be credited to the original payment method used
                for the donation.
              </p>

              <h2 className="text-2xl font-semibold text-primary mb-4">Contact Us</h2>
              <p>
                If you have any questions about our Refund Policy, please contact us at:{' '}
                <a href="mailto:info@cdu.org" className="text-accent hover:underline">
                  info@cdu.org
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
