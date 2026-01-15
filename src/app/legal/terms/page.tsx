'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TermsPage() {
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
              Terms & Conditions
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
              <h2 className="text-2xl font-semibold text-primary mb-4">Agreement to Terms</h2>
              <p className="mb-6">
                By accessing or using the PTP Foundation website, you agree to be bound by these
                Terms and Conditions. If you do not agree with any part of these terms, you may
                not access the website.
              </p>

              <h2 className="text-2xl font-semibold text-primary mb-4">Use of Website</h2>
              <p className="mb-4">You agree to use this website only for lawful purposes and in a way that:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Does not infringe on the rights of others</li>
                <li>Does not restrict or inhibit anyone else&apos;s use of the website</li>
                <li>Does not contain harmful, offensive, or inappropriate content</li>
                <li>Complies with all applicable laws and regulations</li>
              </ul>

              <h2 className="text-2xl font-semibold text-primary mb-4">Donations</h2>
              <p className="mb-6">
                All donations made through our website are voluntary and non-refundable unless
                otherwise specified in our Refund Policy. Donations are used to support our
                charitable programs and operations.
              </p>

              <h2 className="text-2xl font-semibold text-primary mb-4">Intellectual Property</h2>
              <p className="mb-6">
                All content on this website, including text, graphics, logos, and images, is the
                property of PTP Foundation or its content suppliers and is protected by intellectual
                property laws. You may not reproduce, distribute, or create derivative works without
                our express written permission.
              </p>

              <h2 className="text-2xl font-semibold text-primary mb-4">Limitation of Liability</h2>
              <p className="mb-6">
                PTP Foundation shall not be liable for any indirect, incidental, special, or
                consequential damages arising from your use of the website or inability to access it.
              </p>

              <h2 className="text-2xl font-semibold text-primary mb-4">Changes to Terms</h2>
              <p className="mb-6">
                We reserve the right to modify these Terms and Conditions at any time. Changes
                will be effective immediately upon posting to the website. Your continued use of
                the website constitutes acceptance of the modified terms.
              </p>

              <h2 className="text-2xl font-semibold text-primary mb-4">Contact Us</h2>
              <p>
                If you have any questions about these Terms and Conditions, please contact us at:{' '}
                <a href="mailto:info@ptpfoundation.org" className="text-accent hover:underline">
                  info@ptpfoundation.org
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
