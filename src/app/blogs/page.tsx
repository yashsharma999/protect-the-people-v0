'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCard from '@/components/AnimatedCard';

const blogs = [
  {
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    category: 'Education',
    title: 'How Education Transforms Communities',
    description: 'Discover the powerful impact of education on rural communities and how our programs are creating lasting change.',
    date: 'January 10, 2026',
    slug: 'education-transforms-communities',
  },
  {
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    category: 'Healthcare',
    title: 'Building Healthier Futures Together',
    description: 'Our healthcare initiatives are bringing essential medical services to underserved areas across the region.',
    date: 'January 5, 2026',
    slug: 'building-healthier-futures',
  },
  {
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80',
    category: 'Community',
    title: 'Stories of Resilience and Hope',
    description: 'Meet the incredible individuals whose lives have been transformed through community support and empowerment.',
    date: 'December 28, 2025',
    slug: 'stories-resilience-hope',
  },
  {
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    category: 'Programs',
    title: 'Best Physiotherapists in Rohini',
    description: 'Get expert physiotherapy treatment in Rohini for pain relief, injury recovery, and rehabilitation.',
    date: 'December 20, 2025',
    slug: 'physiotherapists-rohini',
  },
  {
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80',
    category: 'Animal Welfare',
    title: 'First Step Toward Animal Welfare',
    description: 'Discover how Saviour Foundation is taking its first step toward animal welfare — rescuing stray & injured animals.',
    date: 'December 15, 2025',
    slug: 'animal-welfare-initiative',
  },
  {
    image: 'https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=800&q=80',
    category: 'Water & Sanitation',
    title: 'Water Brings Happiness and Prosperity',
    description: 'Clean water means fewer illnesses, better education, and stronger communities. Safe Water, Safe Lives.',
    date: 'December 10, 2025',
    slug: 'water-happiness-prosperity',
  },
];

export default function BlogsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent text-sm font-medium tracking-wider uppercase">
              Latest Updates
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-6">
              Blog / News
            </h1>
            <p className="text-lg text-secondary max-w-3xl mx-auto leading-relaxed">
              Our blog shares insights from the field, impact stories, awareness articles, and updates from our programs.
              It&apos;s a space to learn, reflect, and stay connected with our journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <AnimatedCard key={blog.slug} delay={index * 0.1}>
                <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                        {blog.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-sm text-secondary mb-2">{blog.date}</p>
                    <h2 className="text-xl font-semibold text-primary mb-3 hover:text-secondary transition-colors">
                      {blog.title}
                    </h2>
                    <p className="text-sm text-secondary mb-4 flex-grow">
                      {blog.description}
                    </p>
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="inline-flex items-center text-accent font-medium text-sm hover:text-primary transition-colors"
                    >
                      Read more
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 lg:py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-400 mb-8">
              Subscribe to our newsletter to receive the latest news and updates directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-accent"
              />
              <button className="px-6 py-3 bg-accent text-primary font-medium rounded-lg hover:bg-[#d4b972] transition-colors">
                Subscribe
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
