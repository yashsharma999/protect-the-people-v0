'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import PageHero from '@/components/PageHero';
import StoryCard from '@/components/StoryCard';
import TeamMember from '@/components/TeamMember';
import DonorLogos from '@/components/DonorLogos';
import LatestUpdates from '@/components/LatestUpdates';

const programCategories = [
  {
    title: 'Education Support Programs',
    description: 'We provide educational assistance to children from underserved backgrounds through school support, learning materials, digital access, and mentorship initiatives. Our goal is to ensure that financial limitations never become a barrier to learning.',
  },
  {
    title: 'Healthcare Initiatives',
    description: 'Our healthcare programs focus on improving access to medical services, health camps, preventive care awareness, and emergency medical support for vulnerable populations.',
  },
  {
    title: 'Community Development Programs',
    description: 'We work at the community level to promote self-reliance through skill development, awareness programs, and livelihood initiatives that create long-term stability for families.',
  },
  {
    title: 'Emergency & Relief Support',
    description: 'During emergencies and crisis situations, PTP Foundation responds with timely relief efforts, including medical aid, food distribution, and essential support.',
  },
];

const professionalServices = [
  {
    title: 'Legal Consultants',
    description: 'Legal consultants provide expert advice and guidance on legal matters, helping individuals and businesses understand laws, manage risks, and make informed decisions.',
  },
  {
    title: 'Taxation Assistance',
    description: 'Taxation assistance helps individuals and businesses manage taxes efficiently by ensuring legal compliance, accurate filing, and optimized tax planning.',
  },
  {
    title: 'Finance Advisor',
    description: 'A finance advisor provides professional guidance on financial planning, investments, budgeting, and wealth management to help clients achieve their financial goals.',
  },
];

const foodAndJustice = [
  {
    title: 'Food for needy people',
    description: 'As part of Protect the People Foundation, we strive to secure a hunger-free future for children in India by providing nutritious meals, fostering health, and nourishing the potential of every child.',
  },
  {
    title: 'Human rights in India',
    description: 'Championing human rights in India, Protect the People Foundation stands dedicated to ensuring dignity, and justice for all, fostering a society where every individual\'s rights are respected and protected.',
  },
];

const stories = [
  {
    name: 'Debasmita',
    image: '/images/story-debasmita-v2.jpg',
    excerpt: "In the slum where I live, many parents are worried about their children's education.",
  },
  {
    name: 'Lavanaya',
    image: '/images/story-lavanaya-v2.jpg',
    excerpt: 'Some people say I am unlucky. My father went away when I was born, and later my mother died in an accident.',
  },
  {
    name: 'Neha',
    image: '/images/beneficiary-neha.jpg',
    excerpt: 'My father used to sell vegetables, but during the pandemic everything closed down.',
  },
];

const teamMembers = [
  {
    name: 'Sarang Bobade',
    role: 'CEO & Co-Founder',
    image: '/images/team-sarang.jpg',
  },
  {
    name: 'Anil Kumar Reddy',
    role: 'Co-Founder',
    image: '/images/team-anil.jpg',
  },
  {
    name: 'Sandeep Sharma',
    role: 'Co-Founder',
    image: '/images/team-sandeep.jpg',
  },
];

export default function ProgramsPage() {
  return (
    <>
      {/* Hero Section */}
      <PageHero
        title="Our Work / Programs"
        subtitle="Empowering communities through sustainable programs and initiatives"
      />

      {/* Section 1: Image Left / Text Right — Education, Healthcare & Support */}
      <AnimatedSection className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/empowering-education.jpg"
                alt="Education and community support programs for Indian students"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
                Empowering Communities Through Education, Healthcare & Support
              </h2>
              <div className="space-y-6">
                {programCategories.map((item) => (
                  <div key={item.title}>
                    <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                    <p className="text-secondary">{item.description}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/how-to-help"
                className="inline-block mt-8 bg-primary text-white px-8 py-4 rounded-full hover:bg-[#333] transition-colors"
              >
                Support Us
              </Link>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Section 2: Text Left / Image Right — Professional Services */}
      <AnimatedSection className="py-24 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
                Professional Legal, Tax, and Financial Advisory Services
              </h2>
              <div className="space-y-6">
                {professionalServices.map((item) => (
                  <div key={item.title}>
                    <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                    <p className="text-secondary">{item.description}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/how-to-help"
                className="inline-block mt-8 bg-primary text-white px-8 py-4 rounded-full hover:bg-[#333] transition-colors"
              >
                Support Us
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/volunteers-community.jpg"
                alt="Community volunteers and advisory collaboration"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Section 3: Image Left / Text Right — Food & Human Rights */}
      <AnimatedSection className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/nutrition-meal.jpg"
                alt="Nutritional food support and children welfare"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
                Empowering Lives Through Food and Justice
              </h2>
              <div className="space-y-6">
                {foodAndJustice.map((item) => (
                  <div key={item.title}>
                    <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                    <p className="text-secondary">{item.description}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/how-to-help"
                className="inline-block mt-8 bg-primary text-white px-8 py-4 rounded-full hover:bg-[#333] transition-colors"
              >
                Support Us
              </Link>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Stories of Change Preview */}
      <AnimatedSection className="py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              STORIES OF CHANGE
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <StoryCard
                key={story.name}
                name={story.name}
                image={story.image}
                excerpt={story.excerpt}
                link="/our-stories"
                index={index}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/our-stories"
              className="inline-block bg-accent text-primary px-8 py-4 rounded-full font-semibold hover:bg-accent-hover transition-colors"
            >
              VIEW ALL
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* Our Donors Section */}
      <DonorLogos />

      {/* Meet The Team Section */}
      <AnimatedSection className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Meet The Team
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto"></div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
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
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center text-secondary mt-12 max-w-2xl mx-auto"
          >
            We&apos;re a dedicated and diverse team of people working tirelessly to make millions smile.
          </motion.p>
        </div>
      </AnimatedSection>

      {/* Latest Blogs/News Section */}
      <LatestUpdates title="Latest Blogs / News" />

      {/* Donate CTA Banner */}
      <section className="py-8 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
            <p className="text-white text-lg md:text-xl font-medium">
              The Best Way to Make a Difference in the Lives of Others
            </p>
            <Link
              href="/how-to-help"
              className="inline-block bg-accent text-primary px-8 py-3 rounded-full font-semibold hover:bg-accent-hover transition-colors"
            >
              DONATE NOW
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
