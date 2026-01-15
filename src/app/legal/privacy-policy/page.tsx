'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
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
              Privacy Policy
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
              <h2 className="text-2xl font-semibold text-primary mb-4">Introduction</h2>
              <p className="mb-6">
                PTP Foundation (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                when you visit our website or make a donation.
              </p>

              <h2 className="text-2xl font-semibold text-primary mb-4">Information We Collect</h2>
              <p className="mb-4">We may collect information about you in a variety of ways:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Personal Data:</strong> Name, email address, phone number, and mailing address when you make a donation or contact us.</li>
                <li><strong>Financial Data:</strong> Payment information processed securely through our payment partners.</li>
                <li><strong>Usage Data:</strong> Information about how you use our website, including IP address and browser type.</li>
              </ul>

              <h2 className="text-2xl font-semibold text-primary mb-4">How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Process your donations and send tax receipts</li>
                <li>Send you updates about our programs and impact</li>
                <li>Respond to your inquiries and provide support</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-semibold text-primary mb-4">Data Security</h2>
              <p className="mb-6">
                We implement appropriate technical and organizational security measures to protect
                your personal information. However, no method of transmission over the Internet
                is 100% secure, and we cannot guarantee absolute security.
              </p>

              <h2 className="text-2xl font-semibold text-primary mb-4">Your Rights</h2>
              <p className="mb-6">
                You have the right to access, correct, or delete your personal information.
                You may also opt out of receiving marketing communications from us at any time
                by contacting us or using the unsubscribe link in our emails.
              </p>

              <h2 className="text-2xl font-semibold text-primary mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:{' '}
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
