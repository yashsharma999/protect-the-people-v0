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

const principles = [
  {
    number: '01',
    title: 'Value localized solutions',
    description: 'by engaging local resources, wisdom, and efforts.',
  },
  {
    number: '02',
    title: 'Improve before we Change',
    description: 'always value and explore the potential of what the world already has, focusing on circularity – material, people, relationships, talent or resources.',
  },
  {
    number: '03',
    title: 'Value collaboration',
    description: 'in every sphere to increase effectiveness and scale.',
  },
  {
    number: '04',
    title: 'See every entity as a stakeholder',
    description: 'in the process of development.',
  },
  {
    number: '05',
    title: 'Focus on the missed-out',
    description: 'people, material, needs, issues, geographies and relationships.',
  },
];

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

const stories = [
  {
    name: 'Debasmita',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=800&fit=crop',
    excerpt: "In the slum where I live, many parents are worried about their children's education.",
  },
  {
    name: 'Lavanaya',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=800&fit=crop',
    excerpt: 'Some people say I am unlucky. My father went away when I was born, and later my mother died in an accident.',
  },
  {
    name: 'Neha',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop',
    excerpt: 'My father used to sell vegetables, but during the pandemic everything closed down.',
  },
];

const teamMembers = [
  {
    name: 'Sarang Bobade',
    role: 'CEO & Co-Founder',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    name: 'Anil Kumar Reddy',
    role: 'Co-Founder',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  },
  {
    name: 'Sandeep Sharma',
    role: 'Co-Founder',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
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

      {/* Values & Guiding Principles Section */}
      <AnimatedSection className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1594708767771-a7502f8ab28a?w=800&h=1000&fit=crop"
                alt="Values and Guiding Principles"
                fill
                className="object-cover"
              />
            </div>
            <div className="lg:pl-8">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Values & Guiding Principles
              </h2>
              <p className="text-secondary mb-8">
                Human dignity and the world&apos;s surplus are at the core of our idea, ensuring that our actions never undermine the dignity of self, those we work with, and, most importantly, those we stand with. Besides that, we:
              </p>
              <div className="space-y-6">
                {principles.map((principle) => (
                  <div key={principle.number} className="flex gap-4">
                    <span className="text-accent font-bold">{principle.number}.</span>
                    <p className="text-secondary">
                      <span className="text-primary font-medium">{principle.title}</span> {principle.description}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                href="/about-us"
                className="inline-block mt-8 border border-[#222120] text-primary px-6 py-3 rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Program Categories Section */}
      <AnimatedSection className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center"
          >
            Empowering Communities Through Education, Healthcare & Support
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programCategories.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm"
              >
                <h3 className="text-xl font-bold text-primary mb-4">{program.title}</h3>
                <p className="text-secondary">{program.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/how-to-help"
              className="inline-block bg-primary text-white px-8 py-4 rounded-full hover:bg-[#333] transition-colors"
            >
              Support Us
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* Food & Justice Section */}
      <AnimatedSection className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Our battle against hunger is humanity&apos;s war for equality
              </h2>
              <p className="text-secondary mb-4">
                A country cannot progress if most of its people are hungry. Today, 14% of our population is undernourished and needs our undivided attention. The only way to ensure a healthy and happy country is by nourishing the ones who need it the most. Annamrita Foundation is an NGO working with an aim to provide food relief and nourishment to the underprivileged communities of India.
              </p>
              <p className="text-secondary mb-6">
                Your charity in the form of generous donations can help Annamrita provide nutritious mid-day meals and food relief to the children and underprivileged sections of our society.
              </p>
              <Link
                href="/how-to-help"
                className="inline-block bg-primary text-white px-6 py-3 rounded hover:bg-primary-hover transition-colors"
              >
                Know More
              </Link>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop"
                alt="Food Distribution"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Professional Services Section */}
      <AnimatedSection className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center"
          >
            Professional Legal, Tax, and Financial Advisory Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {professionalServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm"
              >
                <h3 className="text-xl font-bold text-primary mb-4">{service.title}</h3>
                <p className="text-secondary">{service.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/how-to-help"
              className="inline-block bg-primary text-white px-8 py-4 rounded-full hover:bg-[#333] transition-colors"
            >
              Support Us
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* Food & Human Rights Section */}
      <AnimatedSection className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center"
          >
            Empowering Lives Through Food and Justice
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-muted rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-primary mb-4">Food for needy people</h3>
              <p className="text-secondary">
                As part of Protect the People Foundation, we strive to secure a hunger-free future for children in India by providing nutritious meals, fostering health, and nourishing the potential of every child.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-muted rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-primary mb-4">Human rights in India</h3>
              <p className="text-secondary">
                Championing human rights in India, Protect the People Foundation stands dedicated to ensuring dignity, and justice for all, fostering a society where every individual&apos;s rights are respected and protected.
              </p>
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
