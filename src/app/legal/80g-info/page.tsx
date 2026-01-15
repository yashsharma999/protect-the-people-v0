'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TaxInfoPage() {
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
              Registration & Tax Information
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
              <h2 className="text-2xl font-semibold text-primary mb-4">About 80G Tax Exemption</h2>
              <p className="mb-6">
                PTP Foundation is registered under Section 80G of the Income Tax Act, 1961.
                This means that all donations made to our organization are eligible for tax
                deduction under Indian tax laws.
              </p>

              <h2 className="text-2xl font-semibold text-primary mb-4">Registration Details</h2>
              <div className="bg-muted rounded-xl p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-secondary">Organization Name</p>
                    <p className="font-semibold text-primary">PTP Foundation</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary">Registration Number</p>
                    <p className="font-semibold text-primary">XXXXXXX</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary">80G Registration</p>
                    <p className="font-semibold text-primary">80G/XXXXX/XXXXX</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary">PAN Number</p>
                    <p className="font-semibold text-primary">XXXXXXXXXX</p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-primary mb-4">Tax Benefits</h2>
              <p className="mb-4">Donors can claim the following tax benefits:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>50% of the donation amount is deductible from taxable income</li>
                <li>Applicable to both individual and corporate donors</li>
                <li>Valid for donations made through any payment method (online, cheque, bank transfer)</li>
              </ul>

              <h2 className="text-2xl font-semibold text-primary mb-4">How to Claim Tax Deduction</h2>
              <ol className="list-decimal pl-6 mb-6 space-y-2">
                <li>Make a donation to PTP Foundation</li>
                <li>Receive your donation receipt with 80G certificate details</li>
                <li>Include the donation amount in your tax return under Section 80G</li>
                <li>Attach the donation receipt as proof when filing</li>
              </ol>

              <h2 className="text-2xl font-semibold text-primary mb-4">Important Notes</h2>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Donations must be made through banking channels for amounts exceeding Rs. 2,000</li>
                <li>Keep your donation receipt safe for tax filing purposes</li>
                <li>The tax benefit is subject to income tax rules and may change</li>
              </ul>

              <h2 className="text-2xl font-semibold text-primary mb-4">Need a Donation Receipt?</h2>
              <p className="mb-6">
                If you have made a donation and need a receipt or 80G certificate, please
                contact us with your donation details.
              </p>

              <h2 className="text-2xl font-semibold text-primary mb-4">Contact Us</h2>
              <p>
                For any queries regarding tax exemption or registration, please contact us at:{' '}
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
