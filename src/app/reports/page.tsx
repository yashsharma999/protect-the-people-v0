'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';

const reportCategories = [
  {
    title: 'Annual Reports',
    description: 'A comprehensive overview of our activities, achievements, and progress throughout the year.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    buttonText: 'View Reports',
    href: '#',
  },
  {
    title: 'Impact Reports',
    description: 'Detailed insights into the real-world impact of our programs across education, healthcare, and communities.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    buttonText: 'Explore Impact',
    href: '#',
  },
  {
    title: 'Financial Transparency',
    description: 'Clear documentation on fund utilization, audits, and financial accountability.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    buttonText: 'View Financials',
    href: '#',
  },
  {
    title: 'Legal & Compliance',
    description: 'Access our legal registrations, compliance records, and governance-related information.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    buttonText: 'View Documents',
    href: '#',
  },
];

const donors = [
  { name: 'Bhagwati', logo: '/donors/bhagwati.png' },
  { name: 'TDI', logo: '/donors/tdi.png' },
  { name: 'Mohindra Fasteners', logo: '/donors/mohindra.png' },
  { name: 'Degamo Medical', logo: '/donors/degamo.png' },
  { name: 'Ayur Market', logo: '/donors/ayur.png' },
];

const teamMembers = [
  {
    name: 'Rajesh Kumar',
    role: 'CEO & Co-Founder',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    name: 'Priya Sharma',
    role: 'Co-Founder',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
  },
  {
    name: 'Amit Patel',
    role: 'Co-Founder',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  },
];

export default function ReportsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Resources & Reports
            </h1>
            <p className="text-lg text-secondary max-w-3xl mx-auto leading-relaxed">
              We believe accountability builds trust, and we are committed to complete transparency.
              Explore our reports and documents to understand how we operate, manage funds, and create impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Report Categories Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reportCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
              >
                <div className="text-secondary mb-4">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">
                  {category.title}
                </h3>
                <p className="text-sm text-secondary mb-6 flex-grow">
                  {category.description}
                </p>
                <Link
                  href={category.href}
                  className="inline-flex items-center justify-center px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors duration-200"
                >
                  {category.buttonText}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Donors Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="text-accent text-sm font-medium tracking-wider uppercase">
                Our Partners
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2">
                Our Donors
              </h2>
            </div>
          </AnimatedSection>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {donors.map((donor, index) => (
              <motion.div
                key={donor.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="grayscale hover:grayscale-0 transition-all duration-300"
              >
                <div className="h-16 w-32 relative flex items-center justify-center">
                  <span className="text-secondary font-medium text-sm">{donor.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet The Team Section */}
      <section className="py-16 lg:py-20 bg-[#F9F8F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="text-accent text-sm font-medium tracking-wider uppercase">
                Our Leadership
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2">
                Meet The Team
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="text-center"
              >
                <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-primary">{member.name}</h3>
                <p className="text-sm text-secondary">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
