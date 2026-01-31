"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedCard from "@/components/AnimatedCard";
import TeamMember from "@/components/TeamMember";
import DonorLogos from "@/components/DonorLogos";

const teamMembers = [
  {
    name: "Sarang Bobade",
    role: "CEO & Co-Founder",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    name: "Anil Kumar Reddy",
    role: "Co-Founder",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
  {
    name: "Sandeep Sharma",
    role: "Co-Founder",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  },
];

const stories = [
  {
    title: "Best Physiotherapists in Rohini",
    description:
      "Get expert physiotherapy treatment in Rohini for pain relief, injury recovery, and rehabilitation. Certified physiotherapists and home-visit support available.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
  },
  {
    title: "First Step Toward Animal Welfare Through Saviour Foundation",
    description:
      "Discover how Saviour Foundation is taking its first step toward animal welfare — rescuing stray & injured animals, providing medical care and shelter.",
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80",
  },
  {
    title: "Water Bring Happiness and Prosperity",
    description:
      "Clean water means fewer illnesses, better education, and stronger communities. With your support, Safe Water, Safe Lives.",
    image:
      "https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=600&q=80",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* About Us Banner */}
      <section className="py-20 lg:py-28 bg-[#2D2D2D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            About Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            Learn about our journey, mission, and the people behind PTP
            Foundation
          </motion.p>
        </div>
      </section>

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
                Our Story
              </h1>
              <p className="text-secondary leading-relaxed mb-6">
                PTP Foundation was founded with the belief that every individual
                deserves access to basic opportunities — education, healthcare,
                and dignity. What started as a small initiative has grown into a
                committed effort to support communities facing social and
                economic challenges.
              </p>
              <p className="text-secondary leading-relaxed">
                We work closely with local communities to understand their needs
                and design programs that create meaningful, lasting impact.
              </p>
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
                Our Mission
              </h2>
              <p className="text-secondary leading-relaxed mb-8">
                To empower underserved communities through education,
                healthcare, and sustainable development initiatives that enable
                self-reliance and long-term growth.
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Our Vision
              </h2>
              <p className="text-secondary leading-relaxed">
                A society where no child is denied education, no family lacks
                healthcare, and every individual has the opportunity to live
                with dignity.
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

      {/* Our Values Section */}
      <AnimatedSection className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[450px] lg:h-[550px] rounded-2xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
                alt="Team collaboration and values"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
                Our Values
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    Integrity
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    Complete transparency in everything we do
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    Compassion
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    People always come first
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    Impact
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    Focus on measurable and sustainable outcomes
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    Collaboration
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    Working together with communities and partners
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Our Donors Section */}
      <DonorLogos />

      {/* Meet The Team Section */}
      <AnimatedSection className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Meet The Team
            </h2>
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
            We&apos;re a dedicated and diverse team of people working tirelessly
            to make millions smile.
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
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
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
