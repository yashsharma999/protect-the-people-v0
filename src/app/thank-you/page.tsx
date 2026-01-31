'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';

const contentMap: Record<string, { title: string; message: string }> = {
  contact: {
    title: 'Message Received!',
    message: "We'll respond within 24-48 hours.",
  },
  donate: {
    title: 'Thank You for Your Generosity!',
    message: 'Your contribution supports our programs and the communities we serve.',
  },
  volunteer: {
    title: 'Application Received!',
    message: "We'll be in touch within 1-2 business days.",
  },
  partner: {
    title: 'Inquiry Received!',
    message: "We'll respond within 2-3 business days.",
  },
};

const defaultContent = {
  title: 'Thank You!',
  message: "We've received your submission. Our team will follow up soon.",
};

function ThankYouContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || '';
  const content = contentMap[type] || defaultContent;

  return (
    <AnimatedSection className="py-24 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle className="w-12 h-12 text-emerald-600" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#222120] mb-4">
            {content.title}
          </h2>
          <p className="text-[#8D8B9C] text-lg mb-10 max-w-md mx-auto">
            {content.message}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-[#222120] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#333] transition-colors"
            >
              Return to Homepage
            </Link>
            <Link
              href="/our-work"
              className="border border-[#222120] text-[#222120] px-8 py-3 rounded-full font-semibold hover:bg-[#222120] hover:text-white transition-colors"
            >
              Explore Our Work
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

export default function ThankYouPage() {
  return (
    <>
      <PageHero title="Thank You" subtitle="Your support means the world to us." />
      <Suspense fallback={null}>
        <ThankYouContent />
      </Suspense>
    </>
  );
}
