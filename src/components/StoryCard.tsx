'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface StoryCardProps {
  name: string;
  image: string;
  excerpt: string;
  link?: string;
  index?: number;
}

export default function StoryCard({ name, image, excerpt, link = '#', index = 0 }: StoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
    >
      <div className="relative h-64 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-primary mb-2 uppercase tracking-wide">
          {name}
        </h3>
        <p className="text-secondary text-sm mb-4 line-clamp-3">
          {excerpt}
        </p>
        <Link
          href={link}
          className="inline-block text-accent font-semibold text-sm uppercase tracking-wide hover:text-accent-hover transition-colors"
        >
          Read More
        </Link>
      </div>
    </motion.div>
  );
}
