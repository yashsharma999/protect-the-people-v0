'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import donors from '@/data/donors';

export default function DonorLogos() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent text-sm">❤</span>
          <h2 className="text-3xl md:text-4xl font-serif text-primary mt-2">
            Our Donors
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
        >
          {donors.map((donor) => (
            <div
              key={donor.name}
              className="grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
            >
              {donor.logo ? (
                <div className="relative w-24 h-12 md:w-32 md:h-16">
                  <Image
                    src={donor.logo}
                    alt={donor.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="w-24 h-12 md:w-32 md:h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-secondary text-sm font-medium">{donor.name}</span>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
