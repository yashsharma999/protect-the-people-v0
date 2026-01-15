'use client';

import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import PageHero from '@/components/PageHero';
import EventCard from '@/components/EventCard';
import DonorLogos from '@/components/DonorLogos';
import LatestUpdates from '@/components/LatestUpdates';

const upcomingEvents = [
  {
    type: 'Upcoming Event',
    title: 'Community Awareness Drive',
    description: 'Join us in spreading awareness and making a meaningful impact at the grassroots level.',
    buttonText: 'Register Now',
    buttonLink: '#',
  },
  {
    type: 'Fundraising Event',
    title: 'Fundraising Program',
    description: 'Support our mission by participating in our upcoming fundraising initiatives.',
    buttonText: 'Participate',
    buttonLink: '#',
  },
];

export default function EventsPage() {
  return (
    <>
      {/* Hero Section */}
      <PageHero
        title="Events"
        subtitle="Stay updated with our upcoming community programs, awareness drives, fundraising events, and volunteer activities"
      />

      {/* Upcoming Events Section */}
      <AnimatedSection className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#222120] mb-4">
              Upcoming Events
            </h2>
            <p className="text-[#8D8B9C] max-w-2xl mx-auto">
              Stay updated with our upcoming community programs, awareness drives, fundraising events, and volunteer activities. Be a part of the change by joining our future initiatives.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {upcomingEvents.map((event, index) => (
              <EventCard
                key={event.title}
                type={event.type}
                title={event.title}
                description={event.description}
                buttonText={event.buttonText}
                buttonLink={event.buttonLink}
                index={index}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Past Events Section */}
      <AnimatedSection className="py-24 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#222120] mb-6">
              Past Events
            </h2>
            <p className="text-[#8D8B9C] max-w-3xl mx-auto">
              Our past initiatives have helped us reach new communities, raise awareness, and strengthen our impact. Each event brings us closer to our mission.
            </p>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Our Donors Section */}
      <DonorLogos />

      {/* Latest Updates Section */}
      <LatestUpdates />
    </>
  );
}
