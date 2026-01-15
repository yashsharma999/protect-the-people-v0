'use client';

import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import PageHero from '@/components/PageHero';
import StoryCard from '@/components/StoryCard';

const stories = [
  {
    name: 'Debasmita',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=800&fit=crop',
    excerpt: "In the slum where I live, many parents are worried about their children's education. Thanks to PTP Foundation, I now have access to quality education and a brighter future.",
  },
  {
    name: 'Lavanaya',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=800&fit=crop',
    excerpt: 'Some people say I am unlucky. My father went away when I was born, and later my mother died in an accident. But the foundation gave me hope and support.',
  },
  {
    name: 'Neha',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop',
    excerpt: 'My father used to sell vegetables, but during the pandemic everything closed down. The foundation helped our family get back on our feet.',
  },
  {
    name: 'Priya',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=800&fit=crop',
    excerpt: 'Education was a distant dream for me until PTP Foundation stepped in. Now I am pursuing my studies and dreaming of becoming a teacher.',
  },
  {
    name: 'Ravi',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop',
    excerpt: 'The healthcare camp organized by PTP Foundation saved my mother\'s life. We are forever grateful for their support and care.',
  },
  {
    name: 'Sunita',
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=600&h=800&fit=crop',
    excerpt: 'Through the skill development program, I learned tailoring and now run my own small business. My family\'s life has transformed completely.',
  },
];

export default function ImpactStoriesPage() {
  return (
    <>
      {/* Hero Section */}
      <PageHero
        title="Impact & Stories"
        subtitle="Real stories of hope, resilience, and transformation from the communities we serve"
      />

      {/* Our Impact Section */}
      <AnimatedSection className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Our Impact
            </h2>
            <p className="text-secondary text-lg leading-relaxed">
              Every program we run is designed with measurable outcomes. We track progress, analyze results, and continuously improve our approach to ensure real, meaningful change.
            </p>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Stories of Change Section */}
      <AnimatedSection className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Stories of Change
            </h2>
            <p className="text-secondary max-w-3xl mx-auto">
              Behind every number is a real story. From a child returning to school to a family receiving critical medical support, these stories reflect the true impact of your support.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <StoryCard
                key={story.name}
                name={story.name}
                image={story.image}
                excerpt={story.excerpt}
                index={index}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-24 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Be Part of These Stories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-100 mb-8"
          >
            Your support can help create more stories of hope and transformation. Join us in making a difference.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            href="/how-to-help"
            className="inline-block bg-accent text-primary px-8 py-4 rounded-full font-semibold hover:bg-accent-hover transition-colors"
          >
            Support Our Mission
          </motion.a>
        </div>
      </AnimatedSection>
    </>
  );
}
