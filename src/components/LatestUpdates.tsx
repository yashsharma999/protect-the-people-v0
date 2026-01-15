'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const updates = [
  {
    title: 'Best Physiotherapists in Rohini',
    description: 'Get expert physiotherapy treatment in Rohini for pain relief, injury recovery, and rehabilitation. Certified physiotherapists and home-visit support available.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop',
    link: '#',
  },
  {
    title: 'First Step Toward Animal Welfare Through Saviour Foundation',
    description: 'Discover how Saviour Foundation is taking its first step toward animal welfare — rescuing stray & injured animals, providing medical care and shelter.',
    image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&h=400&fit=crop',
    link: '#',
  },
  {
    title: 'Water Bring Happiness and Prosperity',
    description: 'Clean water means fewer illnesses, better education, and stronger communities. With your support, Safe Water, Safe Lives.',
    image: 'https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=600&h=400&fit=crop',
    link: '#',
  },
];

interface LatestUpdatesProps {
  title?: string;
  subtitle?: string;
}

export default function LatestUpdates({
  title = "LATEST UPDATES",
  subtitle = "Stay informed with the newest stories of hope and change."
}: LatestUpdatesProps) {
  return (
    <section className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-accent text-sm font-bold uppercase tracking-wider mb-2">
            {title}
          </h2>
          <p className="text-primary text-lg">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {updates.map((update, index) => (
            <motion.div
              key={update.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={update.image}
                  alt={update.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-primary mb-2">
                  {update.title}
                </h3>
                <p className="text-secondary text-sm mb-4 line-clamp-3">
                  {update.description}
                </p>
                <Link
                  href={update.link}
                  className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary-hover transition-colors"
                >
                  Read more
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
