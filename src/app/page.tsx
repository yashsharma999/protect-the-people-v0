'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCard from '@/components/AnimatedCard';
import CountUp from '@/components/CountUp';

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80"
          alt="Community support"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          Building Hope, Creating Impact, Transforming Lives
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto"
        >
          Empower change with your generosity! Donate to Protect the People and be a beacon of hope for those in need. Your contribution makes a direct impact, helping us safeguard communities and create a better, more secure world for all.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/how-to-help"
            className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Donate Now
          </Link>
          <Link
            href="/how-to-help"
            className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors"
          >
            Get Involved
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-3 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Who We Are Section
function WhoWeAreSection() {
  return (
    <AnimatedSection className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Who We Are</h2>
            <div className="space-y-4 text-secondary text-lg leading-relaxed">
              <p>
                <strong className="text-primary">Sudan&apos;s unrelenting conflict has set off the world&apos;s largest and worst hunger crisis.</strong> Famine has been confirmed in multiple areas and could spread even further if we do not act immediately. <span className="font-semibold text-primary">Famine means people are dying from hunger.</span> Children, families, and communities are suffering — and they need our support now.
              </p>
              <p>
                PTP Foundation is a purpose-driven nonprofit organization dedicated to addressing real-world challenges faced by underserved and vulnerable communities. We operate with a clear belief that social change must be inclusive, transparent, and sustainable to create meaningful results.
              </p>
              <p>
                We work closely with communities at the grassroots level, listening to their needs, understanding their challenges, and designing programs that address root causes rather than surface symptoms. Our approach is not about charity alone; it is about empowerment. We aim to equip individuals with knowledge, tools, and confidence so they can build better lives for themselves and future generations.
              </p>
              <p>
                Transparency and accountability guide everything we do. From planning initiatives to utilizing donations, we maintain clear processes that ensure trust and credibility. We believe donors, volunteers, and communities deserve honesty, measurable impact, and clear communication.
              </p>
            </div>
          </div>
          <div className="relative h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&q=80"
              alt="Community gathering"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// Our Mission Section
function MissionSection() {
  return (
    <AnimatedSection className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Our Mission</h2>
            <p className="text-secondary text-lg leading-relaxed mb-6">
              Our mission is to empower vulnerable lives through sustainable community programs that create long-term social, educational, and health-related impact.
            </p>
            <p className="text-primary font-medium mb-4">We strive to:</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-secondary">Expand access to quality education</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-secondary">Improve healthcare availability and awareness</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-secondary">Strengthen community resilience and self-reliance</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-secondary">Promote dignity, equality, and opportunity for all</span>
              </li>
            </ul>
            <p className="text-secondary text-lg leading-relaxed mb-8">
              Through consistent efforts, partnerships, and responsible fund utilization, we aim to create social change that lasts beyond immediate intervention.
            </p>
            <Link
              href="/how-to-help"
              className="inline-block bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-hover transition-colors"
            >
              Donate Now
            </Link>
          </div>
          <div className="relative h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80"
              alt="Education support"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// Our Vision Section
function VisionSection() {
  return (
    <AnimatedSection className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 relative h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&q=80"
              alt="Children learning"
              fill
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Our Vision</h2>
            <p className="text-primary font-medium mb-4">We envision a future where:</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-secondary">Every child has access to education regardless of background</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-secondary">Every family can access basic healthcare without fear or financial distress</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-secondary">Communities are informed, empowered, and self-sustaining</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-secondary">Social support systems are inclusive and compassionate</span>
              </li>
            </ul>
            <p className="text-secondary text-lg leading-relaxed">
              Our vision extends beyond short-term goals. We work toward systemic improvements that continue to benefit communities long after programs are completed.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// Core Focus Areas Section
function FocusAreasSection() {
  const focusAreas = [
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Education for All',
      description: 'Education is the most powerful tool for breaking the cycle of poverty. Yet, for many children and young individuals, access to education remains limited due to financial constraints, social barriers, or lack of infrastructure.',
      subDescription: 'At PTP Foundation, we believe education is not just about academics — it is about empowerment, confidence, and opportunity.',
      points: [
        'Supporting school enrollment and retention',
        'Providing educational resources such as books, learning materials, and digital tools',
        'Encouraging early childhood education and foundational learning',
        'Supporting youth with mentorship and guidance',
        'Promoting awareness around the importance of education within communities',
      ],
      closing: 'By investing in education, we help young minds develop skills, critical thinking, and self-belief. Our goal is to ensure that no child is denied education due to circumstances beyond their control.',
    },
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'Healthcare & Well-Being',
      description: 'Good health is the foundation of a productive and dignified life. Unfortunately, many communities struggle with limited access to medical services, lack of health awareness, and unaffordable treatment options.',
      subDescription: 'PTP Foundation works to improve healthcare access and awareness through targeted programs that address both immediate medical needs and long-term well-being.',
      points: [
        'Medical assistance for individuals and families in need',
        'Support during health emergencies and critical treatments',
        'Health awareness programs focusing on prevention and early diagnosis',
        'Promoting hygiene, nutrition, and mental well-being',
        'Connecting communities with healthcare resources and professionals',
      ],
      closing: 'We believe healthcare should not be a privilege reserved for a few. By focusing on awareness, access, and prevention, we aim to build healthier, more resilient communities.',
    },
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Community Development',
      description: 'Sustainable change begins within communities. When people are informed, skilled, and supported, they can create long-term solutions for themselves and others.',
      subDescription: 'Our community development initiatives are designed to empower families and individuals through education, awareness, and skill-building.',
      points: [
        'Skill development and livelihood support',
        'Awareness campaigns on social, health, and educational issues',
        'Strengthening community leadership and participation',
        'Encouraging self-reliance and responsible decision-making',
        'Supporting inclusive development practices',
      ],
      closing: 'By working hand-in-hand with communities, we ensure our initiatives are culturally relevant, practical, and sustainable.',
    },
  ];

  return (
    <AnimatedSection className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Core Focus Areas</h2>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            We concentrate our efforts on three interconnected areas that create lasting impact.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {focusAreas.map((area, index) => (
            <AnimatedCard key={area.title} delay={index * 0.1}>
              <div className="bg-white rounded-2xl p-8 h-full shadow-sm hover:shadow-lg transition-shadow">
                <div className="text-primary mb-6">{area.icon}</div>
                <h3 className="text-2xl font-bold text-primary mb-4">{area.title}</h3>
                <p className="text-secondary mb-4">{area.description}</p>
                <p className="text-secondary mb-4 font-medium">{area.subDescription}</p>
                <ul className="space-y-2 mb-4">
                  {area.points.map((point, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <span className="text-primary mr-2">•</span>
                      <span className="text-secondary">{point}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-secondary text-sm italic">{area.closing}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// Our Approach Section
function ApproachSection() {
  const approaches = [
    'Identifying real community needs through on-ground engagement',
    'Designing programs with measurable objectives',
    'Implementing initiatives with local participation',
    'Monitoring progress and outcomes',
    'Ensuring transparent reporting and fund utilization',
  ];

  return (
    <AnimatedSection className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Our Approach to Impact</h2>
        <p className="text-secondary text-lg leading-relaxed mb-8">
          At PTP Foundation, impact is not measured only by numbers, but by meaningful change in people&apos;s lives. We follow a structured and transparent approach to ensure effectiveness and accountability.
        </p>
        <div className="bg-muted rounded-2xl p-8 text-left">
          <p className="text-primary font-medium mb-4">Our approach includes:</p>
          <ul className="space-y-3">
            {approaches.map((approach, index) => (
              <li key={index} className="flex items-start">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-3 flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-secondary">{approach}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-secondary text-lg leading-relaxed mt-8">
          This structured methodology allows us to continuously improve and deliver responsible social impact.
        </p>
      </div>
    </AnimatedSection>
  );
}

// Impact at a Glance Section
function ImpactSection() {
  const impactPoints = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Thousands of Lives Impacted',
      description: 'Positively impacted through education, healthcare, and social support'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Multiple Communities Supported',
      description: 'Across different regions with sustainable programs'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Ongoing Programs',
      description: 'Delivering measurable and sustainable outcomes'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: '100% Transparent',
      description: 'Utilization of all donations with full accountability'
    },
  ];

  return (
    <AnimatedSection className="py-24 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Impact at a Glance</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our impact continues to grow with the support of donors, volunteers, and partners who believe in our mission.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {impactPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4 text-white/80">{point.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
              <p className="text-sm text-gray-400">{point.description}</p>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-gray-400 text-sm mt-12">
          (Impact metrics will be updated as programs expand and new milestones are achieved.)
        </p>
      </div>
    </AnimatedSection>
  );
}

// Our Donors Section
function DonorsSection() {
  const donors = [
    { name: 'Bhagwati', placeholder: true },
    { name: 'TDI', placeholder: true },
    { name: 'Mohindra', placeholder: true },
    { name: 'Organic Medical', placeholder: true },
    { name: 'Ayur Herbal', placeholder: true },
  ];

  return (
    <AnimatedSection className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Donors</h2>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            We are grateful for the support of our generous donors and partners.
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {donors.map((donor, index) => (
            <motion.div
              key={donor.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-32 h-16 bg-gray-100 rounded-lg flex items-center justify-center"
            >
              <span className="text-secondary text-sm font-medium">{donor.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// Video Section
function VideoSection() {
  return (
    <AnimatedSection className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Our Battle Against Hunger</h2>
            <p className="text-secondary text-lg leading-relaxed mb-6">
              <span className="font-semibold text-primary">Our battle against hunger is humanity&apos;s war for equality.</span> A country cannot progress if most of its people are hungry. Today, millions of our population is undernourished and needs our undivided attention.
            </p>
            <p className="text-secondary text-lg leading-relaxed mb-6">
              The only way to ensure a healthy and happy community is by nourishing the ones who need it the most. PTP Foundation is working with an aim to provide food relief and nourishment to underprivileged communities.
            </p>
            <p className="text-secondary text-lg leading-relaxed">
              Your charity in the form of generous donations can help us provide nutritious mid-day meals and food relief to children and underprivileged sections of our society.
            </p>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-primary">
            {/* Video Placeholder - Replace with actual video embed */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto cursor-pointer hover:bg-white/30 transition-colors">
                  <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-white/60 text-sm">Video coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// Why Support Section
function WhySupportSection() {
  const trustPoints = [
    { text: 'Tax exemptions under 80G – Eligible donations provide tax benefits under applicable laws' },
    { text: 'Transparent fund usage – Every donation is tracked and used responsibly' },
    { text: 'Community-centered programs – Designed with real needs in mind' },
    { text: 'Sustainable impact – Focus on long-term solutions, not temporary relief' },
    { text: 'Real stories and social proof – Impact backed by genuine outcomes' },
  ];

  return (
    <AnimatedSection className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Why Support PTP Foundation</h2>
            <p className="text-secondary text-lg leading-relaxed mb-8">
              Supporting PTP Foundation means contributing to meaningful change driven by responsibility, transparency, and compassion.
            </p>
            <h3 className="text-xl font-semibold text-primary mb-4">Why Trust Us?</h3>
            <ul className="space-y-3 mb-8">
              {trustPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-secondary">{point.text}</span>
                </li>
              ))}
            </ul>
            <p className="text-secondary text-lg leading-relaxed">
              We prioritize donor trust and accountability because we understand that generosity deserves respect and responsibility.
            </p>
          </div>
          <div className="relative h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80"
              alt="Volunteers helping"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// Transparency Section
function TransparencySection() {
  const points = [
    'Clear documentation of programs and initiatives',
    'Responsible financial management',
    'Ethical partnerships and collaborations',
    'Honest communication with donors and stakeholders',
  ];

  return (
    <AnimatedSection className="py-24 bg-muted">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Transparency & Accountability</h2>
        <p className="text-secondary text-lg leading-relaxed mb-8">
          We believe trust is the foundation of any nonprofit organization. That&apos;s why we ensure:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {points.map((point, index) => (
            <div key={index} className="bg-white rounded-xl p-6 text-left">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-secondary">{point}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-secondary text-lg leading-relaxed mt-8">
          Our commitment to transparency builds long-term relationships with supporters who share our values.
        </p>
      </div>
    </AnimatedSection>
  );
}

// How You Can Help Section
function HelpSection() {
  const actions = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Donate',
      description: 'Your donation helps fund education programs, healthcare support, and community development initiatives. Every contribution, big or small, makes a difference.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Volunteer',
      description: 'Your time, skills, and compassion can create direct impact. Volunteers play a vital role in outreach, awareness, and program execution.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      title: 'Partner With Us',
      description: 'We collaborate with organizations, institutions, and individuals who share our vision for sustainable social change.',
    },
  ];

  return (
    <AnimatedSection className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">How You Can Help</h2>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Your support has the power to transform lives and strengthen communities. There are many ways you can contribute to our mission.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {actions.map((action, index) => (
            <AnimatedCard key={action.title} delay={index * 0.1}>
              <div className="bg-muted rounded-2xl p-8 text-center h-full flex flex-col hover:shadow-lg transition-shadow">
                <div className="text-primary mb-6 flex justify-center">{action.icon}</div>
                <h3 className="text-xl font-semibold text-primary mb-3">{action.title}</h3>
                <p className="text-secondary flex-grow">{action.description}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/how-to-help"
            className="inline-block bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-hover transition-colors"
          >
            Donate Now
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}

// Latest Blogs Section
function BlogsSection() {
  const blogs = [
    {
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
      category: 'Education',
      title: 'How Education Transforms Communities',
      date: 'January 10, 2026',
    },
    {
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
      category: 'Healthcare',
      title: 'Building Healthier Futures Together',
      date: 'January 5, 2026',
    },
    {
      image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80',
      category: 'Community',
      title: 'Stories of Resilience and Hope',
      date: 'December 28, 2025',
    },
  ];

  return (
    <AnimatedSection className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-accent text-sm uppercase tracking-wider font-semibold mb-2">LATEST UPDATES</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Stay Informed with the Newest Stories of Hope and Change</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <AnimatedCard key={blog.title} delay={index * 0.1}>
              <Link href="/blogs" className="block group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                        {blog.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-secondary mb-2">{blog.date}</p>
                    <h3 className="text-lg font-semibold text-primary group-hover:text-secondary transition-colors">
                      {blog.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </AnimatedCard>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blogs"
            className="inline-flex items-center text-primary font-semibold hover:text-secondary transition-colors"
          >
            View All Posts
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}

// Our Activities Section
function ActivitiesSection() {
  return (
    <AnimatedSection className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-accent text-sm uppercase tracking-wider font-semibold mb-2">OUR ACTIVITIES</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Working Every Day to Bring Dignity, Opportunity, and Hope to Those in Need</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Activity Image Placeholders */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: item * 0.05 }}
              className="relative aspect-square rounded-lg overflow-hidden bg-gray-100"
            >
              <Image
                src={`https://images.unsplash.com/photo-${item === 1 ? '1488521787991-ed7bbaae773c' : item === 2 ? '1509099836639-18ba1795216d' : item === 3 ? '1544717305-2782549b5136' : item === 4 ? '1531206715517-5c0ba140b2b8' : item === 5 ? '1469571486292-0ba58a3f068b' : item === 6 ? '1559027615-cd4628902d4a' : item === 7 ? '1576091160550-2173dba999ef' : '1503676260728-1c00da094a0b'}?w=400&q=80`}
                alt={`Activity ${item}`}
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Happy to donate to this organization. They always mail me and let me update about all the work which is done by the welfare for the society. I would suggest everyone please go and once feel about the greatness of this self motivated organization. Hats off to you guys for your novel work. Keep it up guys!",
      name: 'Jyoti Yadav',
      role: 'Donor',
    },
    {
      quote: "Saviour Foundation is best non-profit organization in India that are doing valuable work in the area of health, education, human rights, environment. I must say that NGO is doing a great job and making a difference in thousands of poor students who were not able to get the faculties.",
      name: 'Adarsh Bhardwaj',
      role: 'Donor',
    },
    {
      quote: "This is a NGO of very honest and supportive people who will try their best to help us. I visited their office for one help in Delhi. After talking to them got some relief that at least there are few people who can help me in rescue a girl who is kidnapped in human trafficking. I feel that this organization is really working a lot for such needy persons, and I would really like to appreciate.",
      name: 'Pavan Maurya',
      role: 'Donor',
    },
  ];

  return (
    <AnimatedSection className="py-24 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-white/80 text-sm uppercase tracking-wider mb-2">DONORS OVER THE WORLD</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Donors Over the World Are Saying</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedCard key={testimonial.name} delay={index * 0.1}>
              <div className="bg-white rounded-2xl p-8 h-full">
                <svg className="w-10 h-10 text-accent mb-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-secondary leading-relaxed mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-primary">{testimonial.name}</p>
                  <p className="text-sm text-secondary">{testimonial.role}</p>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// Sponsor Project Banner
function SponsorBannerSection() {
  return (
    <AnimatedSection className="py-16 bg-primary">
      <div className="max-w-4xl mx-auto px-4 text-center text-white">
        <p className="text-white/80 text-sm uppercase tracking-wider mb-2">SPONSOR THIS PROJECT</p>
        <h2 className="text-2xl md:text-4xl font-bold mb-6">Help Thousands of Homeless Kids to Build Their Houses</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/how-to-help"
            className="bg-white text-accent px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Sponsor Now
          </Link>
          <Link
            href="/our-work"
            className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
          >
            Other Projects
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}

// Final CTA Banner - Together Section
function CTABannerSection() {
  return (
    <section className="py-24 bg-white">
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold text-primary mb-6"
        >
          Together, We Can Create Change
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-secondary mb-8 max-w-2xl mx-auto"
        >
          At PTP Foundation, we believe that collective action leads to powerful transformation. When individuals, communities, and organizations come together with a shared purpose, lasting change becomes possible. Your support is not just a donation — it is a commitment to hope, dignity, and opportunity for those who need it most.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/how-to-help"
            className="bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-hover transition-colors"
          >
            Donate Now
          </Link>
          <Link
            href="/how-to-help"
            className="border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-colors"
          >
            Get Involved
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// Main Page Component
export default function Home() {
  return (
    <>
      <HeroSection />
      <WhoWeAreSection />
      <MissionSection />
      <VisionSection />
      <FocusAreasSection />
      <ApproachSection />
      <ImpactSection />
      <DonorsSection />
      <VideoSection />
      <WhySupportSection />
      <TransparencySection />
      <HelpSection />
      <BlogsSection />
      <ActivitiesSection />
      <TestimonialsSection />
      <SponsorBannerSection />
      <CTABannerSection />
    </>
  );
}
