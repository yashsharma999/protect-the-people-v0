'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, Suspense } from 'react';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCard from '@/components/AnimatedCard';
import TeamMember from '@/components/TeamMember';
import DonationForm from '@/components/forms/DonationForm';
import VolunteerForm from '@/components/forms/VolunteerForm';
import PartnershipForm from '@/components/forms/PartnershipForm';

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

const donorLogos = [
  { name: 'Bhagwati', placeholder: 'B' },
  { name: 'TDI', placeholder: 'T' },
  { name: 'Mohindra', placeholder: 'M' },
  { name: 'Organic Medical', placeholder: 'O' },
  { name: 'Ayur', placeholder: 'A' },
];

const latestUpdates = [
  {
    title: 'Best Physiotherapists in Rohini',
    description: 'Get expert physiotherapy treatment in Rohini for pain relief, injury recovery, and rehabilitation.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80',
  },
  {
    title: 'First Step Toward Animal Welfare',
    description: 'Discover how Saviour Foundation is taking its first step toward animal welfare – rescuing stray & injured animals.',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80',
  },
  {
    title: 'Water Brings Happiness and Prosperity',
    description: 'Clean water means fewer illnesses, better education, and stronger communities. Safe Water, Safe Lives.',
    image: 'https://images.unsplash.com/photo-1541544741600-7d91f43f9292?w=600&q=80',
  },
];

// Loading fallback for forms
function FormFallback() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-1/3"></div>
      <div className="h-4 bg-gray-100 rounded w-2/3"></div>
      <div className="space-y-3 mt-6">
        <div className="h-12 bg-gray-100 rounded-xl"></div>
        <div className="h-12 bg-gray-100 rounded-xl"></div>
        <div className="h-12 bg-gray-100 rounded-xl"></div>
      </div>
    </div>
  );
}

export default function GetInvolvedPage() {
  // Handle smooth scrolling with header offset
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    // Handle initial hash on page load
    if (window.location.hash) {
      setTimeout(handleHashChange, 100);
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Donate & Create Impact
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Your donation directly supports <strong>education, healthcare, and community programs</strong>. Every contribution, big or small, helps us create meaningful and lasting change.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#donate"
                className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Donate for a cause
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Donate Section */}
      <AnimatedSection id="donate" className="py-24 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <Suspense fallback={<FormFallback />}>
                <DonationForm />
              </Suspense>
            </div>
            <div className="relative h-[500px] lg:h-[700px] rounded-2xl overflow-hidden lg:sticky lg:top-32">
              <Image
                src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80"
                alt="Helping hands"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Volunteer Section */}
      <AnimatedSection id="volunteer" className="py-24 bg-muted scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="order-2 lg:order-1 relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden lg:sticky lg:top-32">
              <Image
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80"
                alt="Volunteers working together"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <Suspense fallback={<FormFallback />}>
                <VolunteerForm />
              </Suspense>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Partnerships Section */}
      <AnimatedSection id="partnerships" className="py-24 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <Suspense fallback={<FormFallback />}>
                <PartnershipForm />
              </Suspense>
            </div>
            <div className="relative h-[500px] lg:h-[650px] rounded-2xl overflow-hidden lg:sticky lg:top-32">
              <Image
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80"
                alt="Business partnership"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Our Donors Section */}
      <AnimatedSection className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">Our Donors</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {donorLogos.map((donor) => (
              <div
                key={donor.name}
                className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-xl shadow-sm flex items-center justify-center"
              >
                <span className="text-2xl md:text-3xl font-bold text-secondary">{donor.placeholder}</span>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Our Team Section */}
      <AnimatedSection className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Meet The Team</h2>
            <div className="w-16 h-1 bg-accent mx-auto mb-4"></div>
            <p className="text-secondary max-w-2xl mx-auto">
              We&apos;re a dedicated and diverse team of people working tirelessly to make millions smile.
            </p>
          </div>
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
        </div>
      </AnimatedSection>

      {/* Our Team Description */}
      <AnimatedSection className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Our Team</h2>
          <p className="text-secondary text-lg leading-relaxed">
            PTP Foundation is powered by passionate professionals, volunteers, and advisors who share a common goal — creating positive social change through action, not just intention.
          </p>
        </div>
      </AnimatedSection>

      {/* Latest Updates Section */}
      <AnimatedSection className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold uppercase tracking-wide">Latest Updates</span>
            <p className="text-secondary mt-2">Stay informed with the newest stories of hope and change.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestUpdates.map((update, index) => (
              <AnimatedCard key={update.title} delay={index * 0.1}>
                <Link href="/our-stories" className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={update.image}
                      alt={update.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-primary mb-2">{update.title}</h3>
                    <p className="text-secondary text-sm mb-4">{update.description}</p>
                    <span className="inline-block bg-primary text-white text-sm px-4 py-2 rounded-full hover:bg-primary-hover transition-colors">
                      Read more
                    </span>
                  </div>
                </Link>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
