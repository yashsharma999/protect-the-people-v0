'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Heart, CheckCircle, XCircle, CreditCard, Loader2 } from 'lucide-react';

// Declare PhonePe checkout global
declare global {
  interface Window {
    PhonePeCheckout?: {
      transact: (options: {
        tokenUrl: string;
        callback: (response: string) => void;
        type: 'IFRAME' | 'REDIRECT';
      }) => void;
      closePage: () => void;
    };
  }
}

interface DonationFormData {
  fullName: string;
  email: string;
  phone?: string;
  amount: string;
  customAmount?: string;
  donationType: 'one-time' | 'monthly';
  message?: string;
}

type PaymentState =
  | 'idle'
  | 'creating_order'
  | 'payment_pending'
  | 'verifying'
  | 'success'
  | 'failed'
  | 'cancelled';

const donationAmounts = ['500', '1000', '2500', '5000', '10000'];

const donationReasons = [
  'Transparent fund utilization',
  'Secure donation process',
  'Tax benefits as applicable',
];

export default function DonationForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [paymentState, setPaymentState] = useState<PaymentState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [transactionId, setTransactionId] = useState<string>('');
  const [paidAmount, setPaidAmount] = useState<number>(0);

  // Store donor info for verification
  const [donorInfo, setDonorInfo] = useState<{
    fullName: string;
    email: string;
    phone?: string;
    message?: string;
  } | null>(null);

  // Store order ID for verification
  const [merchantOrderId, setMerchantOrderId] = useState<string>('');

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<DonationFormData>({
    defaultValues: {
      donationType: 'one-time',
      amount: '1000',
    },
  });

  const selectedAmount = watch('amount');

  // Handle payment callback from URL (redirect mode fallback)
  useEffect(() => {
    const paymentCallback = searchParams.get('payment');
    const orderId = searchParams.get('orderId');

    if (paymentCallback === 'callback' && orderId) {
      // Clear URL params
      router.replace('/how-to-help#donate', { scroll: false });

      // Verify payment status
      setMerchantOrderId(orderId);
      setPaymentState('verifying');

      // Try to get stored donor info from sessionStorage
      const storedDonorInfo = sessionStorage.getItem('donorInfo');
      if (storedDonorInfo) {
        setDonorInfo(JSON.parse(storedDonorInfo));
      }
    }
  }, [searchParams, router]);

  // Verify payment when in verifying state
  useEffect(() => {
    if (paymentState === 'verifying' && merchantOrderId) {
      verifyPayment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentState, merchantOrderId]);

  const verifyPayment = useCallback(async () => {
    try {
      const response = await fetch('/api/phonepe/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantOrderId,
          donorInfo: donorInfo || {
            fullName: 'Anonymous',
            email: 'unknown@example.com',
          },
        }),
      });

      const result = await response.json();

      if (result.success && result.status === 'COMPLETED') {
        setTransactionId(result.transactionId);
        setPaidAmount(result.amount);
        setPaymentState('success');
        sessionStorage.removeItem('donorInfo');
      } else if (result.status === 'PENDING') {
        // Still pending, retry after delay
        setTimeout(verifyPayment, 3000);
      } else {
        setErrorMessage(result.message || 'Payment verification failed');
        setPaymentState('failed');
      }
    } catch {
      setErrorMessage('Could not verify payment status. Please contact support.');
      setPaymentState('failed');
    }
  }, [merchantOrderId, donorInfo]);

  const handlePhonePeCallback = useCallback((response: string) => {
    console.log('PhonePe callback response:', response);

    if (response === 'CONCLUDED') {
      // Payment flow concluded (success or failure) - verify status
      setPaymentState('verifying');
    } else if (response === 'USER_CANCEL') {
      // User cancelled the payment
      setPaymentState('cancelled');
      setErrorMessage('Payment was cancelled. You can try again.');
    } else {
      // Unknown response
      setPaymentState('failed');
      setErrorMessage('Payment could not be completed. Please try again.');
    }
  }, []);

  const initiatePayment = async (data: DonationFormData) => {
    setErrorMessage('');
    setPaymentState('creating_order');

    // Calculate final amount
    const amount = data.amount === 'custom'
      ? parseInt(data.customAmount || '0')
      : parseInt(data.amount);

    if (!amount || amount < 1) {
      setErrorMessage('Please enter a valid donation amount');
      setPaymentState('idle');
      return;
    }

    // Store donor info
    const donor = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      message: data.message,
    };
    setDonorInfo(donor);

    // Store in sessionStorage for redirect fallback
    sessionStorage.setItem('donorInfo', JSON.stringify(donor));

    try {
      // Create order on server
      const response = await fetch('/api/phonepe/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          message: data.message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create payment order');
      }

      // Store merchant order ID for verification
      setMerchantOrderId(result.merchantOrderId);
      setPaymentState('payment_pending');

      // Check if PhonePe checkout is available
      if (!window.PhonePeCheckout) {
        // Fallback: redirect directly
        window.location.href = result.redirectUrl;
        return;
      }

      // Open PhonePe PayPage in iframe
      window.PhonePeCheckout.transact({
        tokenUrl: result.redirectUrl,
        callback: handlePhonePeCallback,
        type: 'IFRAME',
      });

    } catch (error) {
      console.error('Payment initiation error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to initiate payment');
      setPaymentState('failed');
    }
  };

  // Success state
  if (paymentState === 'success') {
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
          <h3 className="text-2xl font-bold mb-2 text-emerald-700">Payment Successful!</h3>
          <p className="text-3xl font-bold text-primary mb-4">₹{paidAmount.toLocaleString('en-IN')}</p>
          <p className="text-secondary mb-2">
            Thank you for your generous donation, <span className="font-semibold text-primary">{donorInfo?.fullName}</span>!
          </p>
          <p className="text-sm text-secondary mb-6">
            Transaction ID: <span className="font-mono">{transactionId}</span>
          </p>
          <p className="text-secondary">
            A confirmation email has been sent to <span className="font-medium text-primary">{donorInfo?.email}</span>
          </p>
        </motion.div>
      </div>
    );
  }

  // Failed/Cancelled state
  if (paymentState === 'failed' || paymentState === 'cancelled') {
    return (
      <div className="text-center py-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="w-24 h-24 bg-gradient-to-br from-red-50 to-orange-50 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <XCircle className="w-12 h-12 text-red-500" />
        </motion.div>
        <h3 className="text-2xl font-bold mb-3 text-primary">
          {paymentState === 'cancelled' ? 'Payment Cancelled' : 'Payment Failed'}
        </h3>
        <p className="text-secondary mb-6 max-w-md mx-auto">
          {errorMessage || 'Something went wrong with your payment. Please try again.'}
        </p>
        <button
          onClick={() => {
            setPaymentState('idle');
            setErrorMessage('');
          }}
          className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-hover transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Verifying state
  if (paymentState === 'verifying') {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-primary">Verifying Payment...</h3>
        <p className="text-secondary">Please wait while we confirm your payment.</p>
      </div>
    );
  }

  // Processing state (creating order or waiting for payment)
  const isProcessing = paymentState === 'creating_order' || paymentState === 'payment_pending';

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Donate</h2>
      <p className="text-secondary text-lg leading-relaxed mb-6">
        Your donation directly supports education, healthcare, and community programs. Every contribution, big or small, helps us create change.
      </p>

      {/* Why Donate With Us */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-primary mb-4">Why Donate With Us</h3>
        <ul className="space-y-3">
          {donationReasons.map((reason) => (
            <li key={reason} className="flex items-center gap-3">
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-secondary">{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit(initiatePayment)} className="space-y-6">
        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            {errorMessage}
          </div>
        )}

        {/* Donation Type */}
        <div>
          <label className="block text-sm font-medium text-primary mb-3">Donation Type</label>
          <div className="flex gap-3">
            <label className="flex-1">
              <input
                type="radio"
                value="one-time"
                {...register('donationType')}
                className="peer sr-only"
              />
              <div className="p-3 border-2 border-gray-200 rounded-xl text-center cursor-pointer transition-all peer-checked:border-[#222120] peer-checked:bg-[#222120]/5 hover:border-gray-300">
                <span className="font-medium text-primary">One-time</span>
              </div>
            </label>
            <div className="flex-1 relative">
              <div className="p-3 border-2 border-gray-100 rounded-xl text-center bg-gray-50 cursor-not-allowed opacity-60">
                <span className="font-medium text-gray-400">Monthly</span>
              </div>
              <span className="absolute -top-2 -right-2 bg-amber-100 text-amber-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                Coming Soon
              </span>
            </div>
          </div>
        </div>

        {/* Donation Amount */}
        <div>
          <label className="block text-sm font-medium text-primary mb-3">Select Amount (₹)</label>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {donationAmounts.map((amount) => (
              <label key={amount}>
                <input
                  type="radio"
                  value={amount}
                  {...register('amount')}
                  className="peer sr-only"
                  disabled={isProcessing}
                />
                <div className="p-3 border-2 border-gray-200 rounded-xl text-center cursor-pointer transition-all peer-checked:border-[#222120] peer-checked:bg-[#222120] peer-checked:text-white hover:border-gray-300 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed">
                  <span className="font-semibold">₹{parseInt(amount).toLocaleString()}</span>
                </div>
              </label>
            ))}
            <label>
              <input
                type="radio"
                value="custom"
                {...register('amount')}
                className="peer sr-only"
                disabled={isProcessing}
              />
              <div className="p-3 border-2 border-gray-200 rounded-xl text-center cursor-pointer transition-all peer-checked:border-[#222120] peer-checked:bg-[#222120] peer-checked:text-white hover:border-gray-300 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed">
                <span className="font-semibold">Custom</span>
              </div>
            </label>
          </div>
          {selectedAmount === 'custom' && (
            <div className="mt-3">
              <input
                type="number"
                placeholder="Enter custom amount"
                {...register('customAmount', {
                  required: selectedAmount === 'custom' ? 'Please enter an amount' : false,
                  min: { value: 100, message: 'Minimum donation is ₹100' },
                })}
                disabled={isProcessing}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#222120]/20 focus:border-[#222120] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {errors.customAmount && (
                <p className="text-red-500 text-sm mt-1">{errors.customAmount.message}</p>
              )}
            </div>
          )}
        </div>

        {/* Personal Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-primary border-b border-gray-100 pb-2">Personal Details</h3>

          <div>
            <label className="block text-sm font-medium text-primary mb-1">Full Name *</label>
            <input
              type="text"
              {...register('fullName', { required: 'Full name is required' })}
              disabled={isProcessing}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#222120]/20 focus:border-[#222120] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
              disabled={isProcessing}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#222120]/20 focus:border-[#222120] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-1">Phone Number (Optional)</label>
            <input
              type="tel"
              {...register('phone')}
              disabled={isProcessing}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#222120]/20 focus:border-[#222120] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Message (Optional)</label>
          <textarea
            {...register('message')}
            rows={3}
            disabled={isProcessing}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#222120]/20 focus:border-[#222120] transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Leave a message or note with your donation"
          />
        </div>

        {/* Amount Summary */}
        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-secondary">Donation Amount</span>
            <span className="text-2xl font-bold text-primary">
              ₹{(selectedAmount === 'custom'
                ? parseInt(getValues('customAmount') || '0')
                : parseInt(selectedAmount || '0')
              ).toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-primary text-white py-4 rounded-full font-semibold text-lg hover:bg-primary-hover transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {paymentState === 'creating_order' ? 'Creating Order...' : 'Waiting for Payment...'}
            </>
          ) : (
            <>
              <CreditCard size={20} />
              Proceed to Pay
            </>
          )}
        </button>

        <div className="text-center space-y-2">
          <p className="text-sm text-secondary">
            Secure payment powered by PhonePe
          </p>
        </div>
      </form>
    </div>
  );
}
