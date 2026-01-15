'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  index?: number;
}

export default function TeamMember({ name, role, image, index = 0 }: TeamMemberProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center"
    >
      <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-4">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover rounded-full"
        />
      </div>
      <h3 className="text-lg font-semibold text-primary">{name}</h3>
      <p className="text-accent text-sm">{role}</p>
    </motion.div>
  );
}
