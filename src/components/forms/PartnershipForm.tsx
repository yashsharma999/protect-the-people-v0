'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Handshake, CheckCircle, Loader2 } from 'lucide-react';

interface PartnershipFormData {
  organizationName: string;
  contactPerson: string;
  email: string;
  phone: string;
  partnershipType: string;
  message: string;
}

export default function PartnershipForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<PartnershipFormData>();

  const onSubmit = async (data: PartnershipFormData) => {
    const response = await fetch('/api/partnership', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to submit inquiry');
    }
  };

  if (isSubmitSuccessful) {
    return (
      <div className="text-center py-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-12 h-12 text-emerald-600" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold mb-3 text-emerald-700">Inquiry Received!</h3>
          <p className="text-secondary mb-6 max-w-md mx-auto">
            Thank you for your interest in partnering with us. Our partnerships team will review your inquiry and get back to you within 2-3 business days.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Partner With Us</h2>
      <p className="text-secondary text-lg leading-relaxed mb-8">
        We collaborate with corporates, institutions, and individuals to scale impact through CSR initiatives and long-term partnerships.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Organization Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Organization Name *</label>
            <input
              type="text"
              {...register('organizationName', { required: 'Organization name is required' })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="Enter your organization name"
            />
            {errors.organizationName && (
              <p className="text-red-500 text-sm mt-1">{errors.organizationName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-1">Contact Person *</label>
            <input
              type="text"
              {...register('contactPerson', { required: 'Contact person is required' })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="Enter contact person's name"
            />
            {errors.contactPerson && (
              <p className="text-red-500 text-sm mt-1">{errors.contactPerson.message}</p>
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

        {/* Partnership Type */}
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Partnership Type *</label>
          <select
            {...register('partnershipType', { required: 'Please select partnership type' })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.75rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
            }}
          >
            <option value="">Select partnership type</option>
            <option value="csr">CSR Initiative</option>
            <option value="sponsorship">Sponsorship</option>
            <option value="collaboration">Collaboration</option>
            <option value="other">Other</option>
          </select>
          {errors.partnershipType && (
            <p className="text-red-500 text-sm mt-1">{errors.partnershipType.message}</p>
          )}
        </div>

        {/* Message / Proposal */}
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Message / Proposal *</label>
          <textarea
            {...register('message', {
              required: 'Please provide details about your partnership proposal',
              minLength: { value: 50, message: 'Please write at least 50 characters' },
            })}
            rows={5}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
            placeholder="Tell us about your organization and how you'd like to partner with us..."
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
              <Handshake size={20} />
              Submit Inquiry
            </>
          )}
        </button>

        <p className="text-center text-sm text-secondary">
          Our partnerships team will review your inquiry and contact you within 2-3 business days.
        </p>
      </form>
    </div>
  );
}
