'use client';

import React, { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Tag, Share2, Check } from 'lucide-react';

interface BlogArticle {
  title: string;
  category: string;
  date: string;
  image: string;
  description: string;
  content: string[];
}

const blogArticles: Record<string, BlogArticle> = {
  'education-transforms-communities': {
    title: 'How Education Transforms Communities',
    category: 'Education',
    date: 'January 10, 2026',
    image: '/images/empowering-education.jpg',
    description: 'Discover the powerful impact of education on rural communities and how our programs are creating lasting change.',
    content: [
      'Education is more than just reading and writing; it is the cornerstone of dignity, self-reliance, and societal transformation. When children in marginalized communities receive quality learning opportunities, the cycle of generational poverty begins to break.',
      'At PTP Foundation, our educational initiatives go beyond standard classrooms. We provide learning kits, digital literacy tools, after-school tutoring, and mentorship programs that equip young minds with practical, future-ready skills.',
      'Our field assessments show that schools supported through community mentorship achieve significantly higher attendance and lower dropout rates, especially among young girls. By working directly with parents and community leaders, we cultivate an ecosystem where learning is celebrated and sustained.',
      'Through your ongoing support, we continue to expand learning centers to more villages and urban informal settlements across Uttar Pradesh and Northern India.'
    ],
  },
  'building-healthier-futures': {
    title: 'Building Healthier Futures Together',
    category: 'Healthcare',
    date: 'January 5, 2026',
    image: '/images/healthcare-doctor.jpg',
    description: 'Our healthcare initiatives are bringing essential medical services to underserved areas across the region.',
    content: [
      'Access to primary healthcare should be a fundamental human right, not a luxury determined by geography or economic status. Yet millions in semi-rural and underserved districts lack immediate medical access for preventable ailments.',
      'PTP Foundation organizes routine health camps, preventive screenings, diagnostic sessions, and vital medicine distribution. Our volunteer doctors and healthcare workers reach out to elderly residents, women, and infants who cannot travel long distances.',
      'In addition to physical consultations, our teams emphasize preventive health education, nutrition awareness, maternal wellness, and sanitation hygiene to curb water-borne illnesses before they take hold.',
      'Every camp organized touches hundreds of families, offering not just prescriptions, but compassion, guidance, and continuous follow-up care.'
    ],
  },
  'stories-resilience-hope': {
    title: 'Stories of Resilience and Hope',
    category: 'Community',
    date: 'December 28, 2025',
    image: '/images/volunteers-community.jpg',
    description: 'Meet the incredible individuals whose lives have been transformed through community support and empowerment.',
    content: [
      'Behind every initiative are real people striving against formidable odds to build brighter tomorrows. In this update, we spotlight community members whose resilience reminds us why grassroots service matters.',
      'From mothers mastering vocational tailoring to launch independent micro-enterprises, to young students topping regional exams despite studying by solar lanterns, our beneficiaries embody unmatched determination.',
      'Community self-help groups formed through PTP Foundation now manage local micro-savings, organizing collective relief efforts when neighboring families face emergency medical or household crises.',
      'When you invest in human potential, the return is not counted merely in statistics, but in renewed confidence, restored dignity, and empowered communities.'
    ],
  },
  'physiotherapists-rohini': {
    title: 'Best Physiotherapists in Rohini',
    category: 'Programs',
    date: 'December 20, 2025',
    image: '/images/child-education.jpg',
    description: 'Get expert physiotherapy treatment in Rohini for pain relief, injury recovery, and rehabilitation.',
    content: [
      'Physical rehabilitation is critical for post-trauma recovery, chronic pain management, and mobility restoration. Yet many individuals in need lack affordable access to specialized physiotherapy.',
      'Through community health partnerships and subsidized outreach clinics, certified physiotherapists offer home visits, postural correction guidance, and therapeutic rehabilitation to elderly and injured patients in Rohini and surrounding areas.',
      'Our programs emphasize personalized rehabilitation routines, enabling patients to regain functional independence and return to their livelihood activities without crippling pain.',
      'We remain committed to expanding accessible physiotherapy and specialized rehabilitation support to vulnerable demographics.'
    ],
  },
  'animal-welfare-initiative': {
    title: 'First Step Toward Animal Welfare',
    category: 'Animal Welfare',
    date: 'December 15, 2025',
    image: '/images/animal-welfare.jpg',
    description: 'Discover how Saviour Foundation is taking its first step toward animal welfare — rescuing stray & injured animals.',
    content: [
      'Compassion knows no species boundaries. In urban and peri-urban hubs, thousands of stray animals suffer from vehicular collisions, abandonment, and acute lack of basic medical intervention.',
      'In partnership with grassroots animal rescue networks, our welfare initiative provides rapid response rescue, first-aid treatment, anti-rabies vaccination, and temporary sheltering for injured stray animals.',
      'Community feeding drives and reflective safety collar distributions have reduced nighttime road accidents significantly along major transit corridors.',
      'Creating compassionate coexistence requires community education, and our volunteers actively engage neighborhoods to foster safe, empathetic environments for animals.'
    ],
  },
  'water-happiness-prosperity': {
    title: 'Water Brings Happiness and Prosperity',
    category: 'Water & Sanitation',
    date: 'December 10, 2025',
    image: '/images/clean-water.jpg',
    description: 'Clean water means fewer illnesses, better education, and stronger communities. Safe Water, Safe Lives.',
    content: [
      'Safe and accessible water is essential to public health, child nutrition, and socioeconomic stability. In regions where clean drinking water is scarce, families spend hours carrying water instead of working or attending school.',
      'PTP Foundation installs community filtration units and facilitates deep borewell maintenance to guarantee consistent supplies of potable drinking water.',
      'The impact is immediate: incidence of waterborne gastrointestinal illnesses drops by up to 70%, and school attendance among young children increases dramatically.',
      'Clean water brings life, dignity, and sustainable prosperity to every village we serve.'
    ],
  },
};

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const article = blogArticles[slug];
  const [copied, setCopied] = useState(false);

  if (!article) {
    notFound();
  }

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className="min-h-screen bg-white">
      {/* Article Header */}
      <div className="bg-[#2D2D2D] text-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blogs"
            className="inline-flex items-center text-gray-300 hover:text-white transition-colors text-sm mb-6 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Articles
          </Link>

          <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
            <span className="inline-flex items-center bg-[#C4A962]/20 text-[#C4A962] px-3 py-1 rounded-full text-xs font-semibold">
              <Tag className="w-3 h-3 mr-1" />
              {article.category}
            </span>
            <span className="inline-flex items-center">
              <Calendar className="w-4 h-4 mr-1.5" />
              {article.date}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            {article.title}
          </h1>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="relative h-[340px] md:h-[480px] rounded-2xl overflow-hidden shadow-xl">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <p className="text-xl text-gray-700 font-medium leading-relaxed mb-8 border-l-4 border-[#C4A962] pl-4 italic">
          {article.description}
        </p>

        <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
          {article.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Share & Call to Action */}
        <div className="mt-14 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600 flex items-center">
              <Share2 className="w-4 h-4 mr-1.5" /> Share this story:
            </span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-md font-medium transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1 text-green-600" /> Copied!
                </>
              ) : (
                'Copy Link'
              )}
            </button>
          </div>

          <Link
            href="/how-to-help"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-[#222120] text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors text-sm"
          >
            Support This Cause
          </Link>
        </div>
      </div>
    </article>
  );
}
