'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';

export default function MapPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Survivor Memory Archive
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl"
          >
            An interactive map documenting survivor stories and memories from around the world.
          </motion.p>
        </div>
      </section>

      {/* Map Placeholder Section */}
      <AnimatedSection className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-[600px] rounded-2xl overflow-hidden bg-muted">
            <Image
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1920&q=80"
              alt="World map"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center text-white">
                <svg className="w-16 h-16 mx-auto mb-6 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <h2 className="text-3xl font-bold mb-4">Interactive Map Coming Soon</h2>
                <p className="text-xl text-gray-200 max-w-md mx-auto mb-8">
                  We are building an interactive map to document and preserve survivor memories.
                </p>
                <Link
                  href="/our-stories"
                  className="inline-block bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  View Our Stories Instead
                </Link>
              </div>
            </div>

            {/* Map Markers Placeholder */}
            <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-accent rounded-full animate-pulse" />
            <div className="absolute top-1/3 left-1/2 w-4 h-4 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="absolute top-2/5 left-2/5 w-4 h-4 bg-accent rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </AnimatedSection>

      {/* Archive Info Section */}
      <AnimatedSection className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Preserving Memories for Future Generations
              </h2>
              <p className="text-secondary text-lg leading-relaxed mb-6">
                Our digital archive is a living memorial to genocide survivors. Through photographs,
                testimonies, and documents, we preserve their stories so that future generations may
                learn from the past.
              </p>
              <p className="text-secondary text-lg leading-relaxed mb-8">
                The interactive map will allow visitors to explore survivor stories by location,
                connecting the global community with the personal experiences of those affected.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <p className="text-sm text-secondary">Testimonies</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">2,000+</div>
                  <p className="text-sm text-secondary">Photographs</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">300+</div>
                  <p className="text-sm text-secondary">Documents</p>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&q=80"
                alt="Archive documentation"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Contribute Section */}
      <AnimatedSection className="py-24 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Contribute to the Archive</h2>
          <p className="text-xl text-gray-300 mb-8">
            Are you a survivor or have materials to contribute? Help us preserve history.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Us to Contribute
          </Link>
        </div>
      </AnimatedSection>
    </>
  );
}
