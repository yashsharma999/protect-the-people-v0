'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Users, Loader2 } from 'lucide-react';

interface VolunteerFormData {
  fullName: string;
  email: string;
  phone: string;
  skills: string;
  availability: string;
  message: string;
}

export default function VolunteerForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VolunteerFormData>();

  const onSubmit = async (data: VolunteerFormData) => {
    try {
      setSubmitError('');
      const response = await fetch('/api/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit application');
      }

      router.push('/thank-you?type=volunteer');
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Volunteer</h2>
      <p className="text-secondary text-lg leading-relaxed mb-8">
        Join us on the ground or remotely and be part of initiatives that truly make a difference. Your time and skills can change lives.
      </p>

      {submitError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Personal Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Full Name *</label>
            <input
              type="text"
              {...register('fullName', { required: 'Full name is required' })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-1">Email Address *</label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-1">Phone Number *</label>
            <input
              type="tel"
              {...register('phone', { required: 'Phone number is required' })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Skills & Background */}
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Skills / Background *</label>
          <select
            {...register('skills', { required: 'Please select your background' })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.75rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
            }}
          >
            <option value="">Select your background</option>
            <option value="legal">Legal</option>
            <option value="public-sector">Public Sector</option>
            <option value="education">Education</option>
            <option value="healthcare">Healthcare</option>
            <option value="technology">Technology</option>
            <option value="marketing">Marketing & Communications</option>
            <option value="other">Other</option>
          </select>
          {errors.skills && (
            <p className="text-red-500 text-sm mt-1">{errors.skills.message}</p>
          )}
        </div>

        {/* Availability */}
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Availability *</label>
          <select
            {...register('availability', { required: 'Please select your availability' })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.75rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
            }}
          >
            <option value="">Select your availability</option>
            <option value="weekdays">Weekdays</option>
            <option value="weekends">Weekends</option>
            <option value="flexible">Flexible</option>
            <option value="few-hours-week">A few hours per week</option>
            <option value="few-hours-month">A few hours per month</option>
            <option value="project-based">Project-based</option>
          </select>
          {errors.availability && (
            <p className="text-red-500 text-sm mt-1">{errors.availability.message}</p>
          )}
        </div>

        {/* Message / Motivation */}
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Why do you want to volunteer? *</label>
          <textarea
            {...register('message', {
              required: 'Please tell us why you want to volunteer',
              minLength: { value: 20, message: 'Please write at least 20 characters' },
            })}
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
            placeholder="Tell us about your motivation and how you'd like to contribute..."
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white py-4 rounded-full font-semibold text-lg hover:bg-primary-hover transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Users size={20} />
              Submit Application
            </>
          )}
        </button>

        <p className="text-center text-sm text-secondary">
          We'll review your application and contact you within 1-2 business days.
        </p>
      </form>
    </div>
  );
}
