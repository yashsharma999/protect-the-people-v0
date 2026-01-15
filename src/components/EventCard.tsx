'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface EventCardProps {
  type: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink?: string;
  index?: number;
}

export default function EventCard({
  type,
  title,
  description,
  buttonText,
  buttonLink = '#',
  index = 0
}: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
    >
      <span className="text-xs text-secondary uppercase tracking-wide mb-2 block">
        {type}
      </span>
      <h3 className="text-lg font-bold text-primary mb-3">
        {title}
      </h3>
      <p className="text-secondary text-sm mb-4">
        {description}
      </p>
      <Link
        href={buttonLink}
        className="inline-block bg-primary text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-primary-hover transition-colors"
      >
        {buttonText}
      </Link>
    </motion.div>
  );
}
