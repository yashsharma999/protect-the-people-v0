'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCard from '@/components/AnimatedCard';
import TeamMember from '@/components/TeamMember';

const principles = [
  'Value localized solutions by engaging local resources, wisdom, and efforts.',
  'Improve before we Change; always value and explore the potential of what the world already has, focusing on circularity – material, people, relationships, talent or resources.',
  'Value collaboration in every sphere to increase effectiveness and scale.',
  'See every entity as a stakeholder in the process of development.',
  'Focus on the missed-out; people, material, needs, issues, geographies and relationships.',
];

const teamMembers = [
  {
    name: 'Sarang Bobade',
    role: 'CEO & Co-Founder',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    name: 'Anil Kumar Reddy',
    role: 'Co-Founder',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  },
  {
    name: 'Sandeep Sharma',
    role: 'Co-Founder',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
  },
];

const stories = [
  {
    title: 'Best Physiotherapists in Rohini',
    description: 'Get expert physiotherapy treatment in Rohini for pain relief, injury recovery, and rehabilitation. Certified physiotherapists and home-visit support available.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
  },
  {
    title: 'First Step Toward Animal Welfare Through Saviour Foundation',
    description: 'Discover how Saviour Foundation is taking its first step toward animal welfare — rescuing stray & injured animals, providing medical care and shelter.',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80',
  },
  {
    title: 'Water Bring Happiness and Prosperity',
    description: 'Clean water means fewer illnesses, better education, and stronger communities. With your support, Safe Water, Safe Lives.',
    image: 'https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=600&q=80',
  },
];

const partnerLogos = [
  { name: 'Partner 1', width: 120 },
  { name: 'Partner 2', width: 100 },
  { name: 'Partner 3', width: 140 },
  { name: 'Partner 4', width: 110 },
  { name: 'Partner 5', width: 100 },
];

export default function AboutPage() {
  return (
    <>
      {/* Values & Guiding Principles Section */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative h-[450px] lg:h-[550px] rounded-2xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80"
                alt="Community member portrait"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Values & Guiding Principles
              </h1>
              <p className="text-secondary leading-relaxed mb-6">
                Human dignity and the world&apos;s surplus are at the core of our idea, ensuring that our
                actions never undermine the dignity of self, those we work with, and, most importantly,
                those we stand with. Besides that, we:
              </p>
              <ol className="space-y-4 mb-8">
                {principles.map((principle, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-accent/10 text-accent rounded-full flex items-center justify-center text-sm font-semibold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-secondary text-sm leading-relaxed">{principle}</span>
                  </li>
                ))}
              </ol>
              <Link
                href="/our-work"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary-hover transition-colors"
              >
                Read More
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission & Vision Section */}
      <AnimatedSection className="py-20 lg:py-24 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Our Mission & Vision
              </h2>
              <p className="text-secondary leading-relaxed">
                We aim to build an equitable relationship of strength, sustenance, and dignity between
                the cities and villages, using under-utilized material as a tool to trigger development
                with dignity. We envision growing as an idea across regions, economies, and countries
                using urban surplus material as a tool to address basic but neglected issues of the
                financially and materially poor, involving them in designing and implementing their own
                solutions, with their own efforts, knowledge, and dignity, and material as a reward for
                their participation.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[400px] lg:h-[450px] rounded-2xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80"
                alt="Community working together"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Our Mission Text Section */}
      <AnimatedSection className="py-20 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Our Mission</h2>
          <p className="text-lg text-secondary leading-relaxed">
            To empower underserved communities through education, healthcare, and sustainable
            development initiatives that enable self-reliance and long-term growth.
          </p>
        </div>
      </AnimatedSection>

      {/* Partner Logos Section */}
      <AnimatedSection className="py-16 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
            {partnerLogos.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="grayscale hover:grayscale-0 transition-all duration-300"
              >
                <div
                  className="h-12 bg-[#8D8B9C]/20 rounded-lg flex items-center justify-center px-6"
                  style={{ width: partner.width }}
                >
                  <span className="text-secondary font-medium text-sm">{partner.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Meet The Team Section */}
      <AnimatedSection className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Meet The Team</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 max-w-4xl mx-auto mb-12">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={member.name}
                name={member.name}
                role={member.role}
                image={member.image}
                index={index}
              />
            ))}
          </div>

          <p className="text-center text-secondary max-w-2xl mx-auto">
            We&apos;re a dedicated and diverse team of people working tirelessly to make millions smile.
          </p>
        </div>
      </AnimatedSection>

      {/* Stories Section */}
      <AnimatedSection className="py-20 lg:py-24 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <AnimatedCard key={story.title} delay={index * 0.1}>
                <div className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-primary mb-3">
                      {story.title}
                    </h3>
                    <p className="text-secondary text-sm mb-4 flex-grow">
                      {story.description}
                    </p>
                    <Link
                      href="/our-stories"
                      className="inline-flex items-center gap-2 text-accent font-medium text-sm hover:text-accent-hover transition-colors"
                    >
                      Read more
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Donation CTA Banner */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xl md:text-2xl font-medium text-white text-center"
            >
              The Best Way to Make a Difference in the Lives of Others
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href="/how-to-help"
                className="inline-flex items-center gap-2 bg-accent text-primary px-8 py-3 rounded-full font-semibold hover:bg-accent-hover transition-colors uppercase tracking-wide"
              >
                Donate Now
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
