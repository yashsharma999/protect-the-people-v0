'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, CreditCard, Loader2 } from 'lucide-react';
import {
  MIN_DONATION_RUPEES,
  MAX_DONATION_RUPEES,
  MAX_NAME_LENGTH,
  MAX_MESSAGE_LENGTH,
  MAX_ADDRESS_LENGTH,
  EMAIL_PATTERN,
  PHONE_PATTERN,
  PAN_PATTERN,
} from '@/lib/donation-rules';

// Razorpay Checkout global (https://checkout.razorpay.com/v1/checkout.js)
interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayFailureResponse {
  error: {
    code: string;
    description: string;
    reason?: string;
  };
}

interface RazorpayCheckoutOptions {
  key: string;
  order_id: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  image?: string;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  handler: (response: RazorpaySuccessResponse) => void;
  modal?: { ondismiss?: () => void; confirm_close?: boolean };
}

interface RazorpayCheckout {
  open: () => void;
  on: (event: 'payment.failed', callback: (response: RazorpayFailureResponse) => void) => void;
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => RazorpayCheckout;
  }
}

interface CreateOrderResult {
  keyId: string;
  orderId: string;
  amount: number;
  currency: string;
  receipt: string;
}

interface DonationFormData {
  fullName: string;
  email: string;
  phone?: string;
  amount: string;
  customAmount?: string;
  message?: string;
  wants80G: boolean;
  pan?: string;
  address?: string;
}

type PaymentState =
  | 'idle'
  | 'creating_order'
  | 'payment_pending'
  | 'verifying'
  | 'success'
  | 'failed'
  | 'cancelled';

const CHECKOUT_SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js';

let checkoutScriptPromise: Promise<void> | null = null;

function loadCheckoutScript(): Promise<void> {
  if (window.Razorpay) return Promise.resolve();

  if (!checkoutScriptPromise) {
    checkoutScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = CHECKOUT_SCRIPT_URL;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        checkoutScriptPromise = null;
        script.remove();
        reject(new Error('Could not load the payment window. Please check your connection and try again.'));
      };
      document.body.appendChild(script);
    });
  }

  return checkoutScriptPromise;
}

const donationAmounts = ['500', '1000', '2500', '5000', '10000'];

const donationReasons = [
  'Transparent fund utilization',
  'Secure donation process',
  '80G tax receipt on request',
];

const inputClassName =
  'w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#222120]/20 focus:border-[#222120] transition-all disabled:opacity-50 disabled:cursor-not-allowed';

export default function DonationForm() {
  const [paymentState, setPaymentState] = useState<PaymentState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [transactionId, setTransactionId] = useState<string>('');
  const [receiptNumber, setReceiptNumber] = useState<string>('');
  const [paidAmount, setPaidAmount] = useState<number>(0);
  const [donorInfo, setDonorInfo] = useState<{ fullName: string; email: string; wants80G: boolean } | null>(null);

  // Checkout can call ondismiss after a successful payment closes the window
  const paymentCompletedRef = useRef(false);
  // Checkout lets the donor retry inside the window after a failure; remember why the last attempt failed
  const lastFailureRef = useRef<string>('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DonationFormData>({
    defaultValues: {
      amount: '1000',
      wants80G: false,
    },
  });

  const selectedAmount = watch('amount');
  const customAmount = watch('customAmount');
  const wants80G = watch('wants80G');

  // Start loading Checkout early so the payment window opens without delay
  useEffect(() => {
    loadCheckoutScript().catch(() => {
      // Retried when the donor submits the form
    });
  }, []);

  const verifyPayment = async (order: CreateOrderResult, response: RazorpaySuccessResponse) => {
    paymentCompletedRef.current = true;
    setPaymentState('verifying');

    try {
      const res = await fetch('/api/razorpay/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.orderId,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        }),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setTransactionId(result.paymentId);
        setPaidAmount(result.amount);
        setReceiptNumber(order.receipt);
        setPaymentState('success');
      } else {
        setErrorMessage(result.error || 'Payment verification failed');
        setPaymentState('failed');
      }
    } catch {
      setErrorMessage(
        `We could not confirm your payment. If money was deducted, you will receive a receipt by email shortly, so please don't pay again. Reference: ${response.razorpay_payment_id}`
      );
      setPaymentState('failed');
    }
  };

  const initiatePayment = async (data: DonationFormData) => {
    setErrorMessage('');
    setPaymentState('creating_order');
    paymentCompletedRef.current = false;
    lastFailureRef.current = '';

    // Calculate final amount
    const amount = data.amount === 'custom'
      ? Number(data.customAmount)
      : Number(data.amount);

    if (!Number.isInteger(amount) || amount < MIN_DONATION_RUPEES || amount > MAX_DONATION_RUPEES) {
      setErrorMessage('Please enter a valid donation amount');
      setPaymentState('idle');
      return;
    }

    setDonorInfo({ fullName: data.fullName, email: data.email, wants80G: data.wants80G });

    try {
      // Create order on server while Checkout finishes loading
      const [order] = await Promise.all([
        (async (): Promise<CreateOrderResult> => {
          const response = await fetch('/api/razorpay/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              amount,
              fullName: data.fullName,
              email: data.email,
              phone: data.phone,
              message: data.message,
              wants80G: data.wants80G,
              pan: data.wants80G ? data.pan : undefined,
              address: data.wants80G ? data.address : undefined,
            }),
          });

          const result = await response.json();

          if (!response.ok) {
            throw new Error(result.error || 'Failed to create payment order');
          }

          return result;
        })(),
        loadCheckoutScript(),
      ]);

      if (!window.Razorpay) {
        throw new Error('Could not load the payment window. Please try again.');
      }

      setPaymentState('payment_pending');

      const checkout = new window.Razorpay({
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amount,
        currency: order.currency,
        name: 'Protect The People Foundation',
        description: 'Donation',
        image: `${window.location.origin}/logo.png`,
        prefill: {
          name: data.fullName,
          email: data.email,
          contact: data.phone || undefined,
        },
        theme: { color: '#222120' },
        handler: (response) => verifyPayment(order, response),
        modal: {
          ondismiss: () => {
            if (paymentCompletedRef.current) return;
            setPaymentState('cancelled');
            setErrorMessage(
              lastFailureRef.current
                ? `Your last payment attempt failed (${lastFailureRef.current}). You can try again.`
                : 'Payment was cancelled. You can try again.'
            );
          },
        },
      });

      checkout.on('payment.failed', (response) => {
        lastFailureRef.current = response.error.description;
      });

      checkout.open();

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
          <p className="text-sm text-secondary">
            Receipt No: <span className="font-mono">{receiptNumber}</span>
          </p>
          <p className="text-sm text-secondary mb-6">
            Transaction ID: <span className="font-mono">{transactionId}</span>
          </p>
          <p className="text-secondary">
            {donorInfo?.wants80G ? 'Your 80G donation receipt' : 'Your donation receipt'} will be emailed to{' '}
            <span className="font-medium text-primary">{donorInfo?.email}</span> shortly.
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

  const summaryAmount = Number(selectedAmount === 'custom' ? customAmount : selectedAmount) || 0;

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
                  <span className="font-semibold">₹{parseInt(amount).toLocaleString('en-IN')}</span>
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
                inputMode="numeric"
                placeholder="Enter custom amount"
                {...register('customAmount', {
                  required: selectedAmount === 'custom' ? 'Please enter an amount' : false,
                  min: { value: MIN_DONATION_RUPEES, message: `Minimum donation is ₹${MIN_DONATION_RUPEES}` },
                  max: { value: MAX_DONATION_RUPEES, message: `Maximum online donation is ₹${MAX_DONATION_RUPEES.toLocaleString('en-IN')}` },
                  validate: (value) => !value || Number.isInteger(Number(value)) || 'Please enter a whole rupee amount',
                })}
                disabled={isProcessing}
                className={inputClassName}
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
              {...register('fullName', {
                required: 'Full name is required',
                maxLength: { value: MAX_NAME_LENGTH, message: `Name must be ${MAX_NAME_LENGTH} characters or fewer` },
              })}
              disabled={isProcessing}
              className={inputClassName}
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
                  value: EMAIL_PATTERN,
                  message: 'Invalid email address',
                },
              })}
              disabled={isProcessing}
              className={inputClassName}
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
              {...register('phone', {
                pattern: { value: PHONE_PATTERN, message: 'Invalid phone number' },
              })}
              disabled={isProcessing}
              className={inputClassName}
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* 80G Tax Receipt */}
        <div className="space-y-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register('wants80G')}
              disabled={isProcessing}
              className="mt-1 w-4 h-4 accent-[#222120]"
            />
            <span>
              <span className="block text-sm font-medium text-primary">I want an 80G tax receipt</span>
              <span className="block text-sm text-secondary">
                Claim a tax deduction under Section 80G. Your PAN and address are required by the Income Tax Department.
              </span>
            </span>
          </label>

          {wants80G && (
            <div className="space-y-4 pl-7">
              <div>
                <label className="block text-sm font-medium text-primary mb-1">PAN *</label>
                <input
                  type="text"
                  {...register('pan', {
                    required: wants80G ? 'PAN is required for an 80G receipt' : false,
                    setValueAs: (value: string) => value?.trim().toUpperCase(),
                    pattern: { value: PAN_PATTERN, message: 'Enter a valid PAN, e.g. ABCDE1234F' },
                  })}
                  disabled={isProcessing}
                  maxLength={10}
                  className={`${inputClassName} uppercase`}
                  placeholder="ABCDE1234F"
                />
                {errors.pan && (
                  <p className="text-red-500 text-sm mt-1">{errors.pan.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-1">Address *</label>
                <textarea
                  {...register('address', {
                    required: wants80G ? 'Address is required for an 80G receipt' : false,
                    maxLength: { value: MAX_ADDRESS_LENGTH, message: `Address must be ${MAX_ADDRESS_LENGTH} characters or fewer` },
                  })}
                  rows={2}
                  disabled={isProcessing}
                  className={`${inputClassName} resize-none`}
                  placeholder="House no., street, city, state, PIN code"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Message (Optional)</label>
          <textarea
            {...register('message', {
              maxLength: { value: MAX_MESSAGE_LENGTH, message: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer` },
            })}
            rows={3}
            disabled={isProcessing}
            className={`${inputClassName} resize-none`}
            placeholder="Leave a message or note with your donation"
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Amount Summary */}
        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-secondary">Donation Amount</span>
            <span className="text-2xl font-bold text-primary">
              ₹{summaryAmount.toLocaleString('en-IN')}
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
            Secure payment powered by Razorpay · UPI, cards, net banking &amp; wallets
          </p>
        </div>
      </form>
    </div>
  );
}
