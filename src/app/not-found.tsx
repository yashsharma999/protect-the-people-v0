'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';

export default function NotFound() {
  return (
    <>
      <PageHero title="Page Not Found" subtitle="The page you're looking for doesn't exist or has been moved." />

      <AnimatedSection className="py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="text-[120px] md:text-[180px] font-bold text-[#222120]/10 leading-none mb-8"
          >
            404
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-[#8D8B9C] text-lg mb-10">
              Don&apos;t worry, it happens to the best of us. Here are some helpful links to get you back on track:
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/"
                className="bg-[#222120] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#333] transition-colors"
              >
                Return Home
              </Link>
              <Link
                href="/contact"
                className="border border-[#222120] text-[#222120] px-8 py-3 rounded-full font-semibold hover:bg-[#222120] hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 justify-center text-sm">
              <Link href="/how-to-help" className="text-[#8D8B9C] hover:text-[#222120] transition-colors underline underline-offset-4">
                How to Help
              </Link>
              <Link href="/our-work" className="text-[#8D8B9C] hover:text-[#222120] transition-colors underline underline-offset-4">
                Our Work
              </Link>
              <Link href="/about-us" className="text-[#8D8B9C] hover:text-[#222120] transition-colors underline underline-offset-4">
                About Us
              </Link>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>
    </>
  );
}
