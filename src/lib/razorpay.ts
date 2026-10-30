// Razorpay Payment Gateway Integration
// Standard Checkout with the Orders API - Test & Live mode (decided by the key pair)

import { createHmac, randomBytes, timingSafeEqual } from 'crypto';
import Razorpay from 'razorpay';
import type { DonorDetails } from '@/lib/donation-rules';

// ==================== Types ====================

export type RazorpayNotes = Record<string, string>;

export interface PaymentMethodDetails {
  method: string;
  bank?: string | null;
  wallet?: string | null;
  vpa?: string | null;
  card?: { network?: string; last4?: string } | null;
}

export interface RazorpayPaymentEntity extends PaymentMethodDetails {
  id: string;
  order_id: string;
  amount: number;
  currency: string;
  status: string;
  email?: string;
  contact?: string;
  notes: RazorpayNotes | [];
  created_at: number;
}

export interface RazorpayOrderEntity {
  id: string;
  receipt: string;
  amount: number;
  amount_paid: number;
  status: string;
  notes: RazorpayNotes | [];
}

export interface RazorpayWebhookEvent {
  event: string;
  created_at: number;
  payload: {
    payment?: { entity: RazorpayPaymentEntity };
    order?: { entity: RazorpayOrderEntity };
  };
}

// ==================== Configuration ====================

export class RazorpayConfigError extends Error {}

function getCredentials() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new RazorpayConfigError('Razorpay credentials not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET environment variables.');
  }

  return { keyId, keySecret };
}

let client: Razorpay | null = null;

export function getRazorpay(): Razorpay {
  if (!client) {
    const { keyId, keySecret } = getCredentials();
    client = new Razorpay({ key_id: keyId, key_secret: keySecret });
  }
  return client;
}

/**
 * The public key id, safe to send to the browser for Checkout.
 */
export function getRazorpayKeyId(): string {
  return getCredentials().keyId;
}

// ==================== Signatures ====================

function hmacMatches(payload: string, signature: string, secret: string): boolean {
  const expected = createHmac('sha256', secret).update(payload).digest('hex');
  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);
  return expectedBuffer.length === signatureBuffer.length && timingSafeEqual(expectedBuffer, signatureBuffer);
}

/**
 * Verify the signature Checkout returns after a successful payment.
 */
export function verifyPaymentSignature(orderId: string, paymentId: string, signature: string): boolean {
  return hmacMatches(`${orderId}|${paymentId}`, signature, getCredentials().keySecret);
}

/**
 * Verify the X-Razorpay-Signature header against the raw webhook body.
 */
export function verifyWebhookSignature(rawBody: string, signature: string, secret: string): boolean {
  return hmacMatches(rawBody, signature, secret);
}

// ==================== Donor Notes ====================
// Donor details are stored on the Razorpay order so the webhook can read them
// back from a signed payload instead of trusting the browser.

const NOTE_KEYS = {
  fullName: 'donor_name',
  email: 'donor_email',
  phone: 'donor_phone',
  message: 'donor_message',
  wants80G: 'receipt_80g',
  pan: 'donor_pan',
  address: 'donor_address',
} as const;

export function donorToNotes(donor: DonorDetails): RazorpayNotes {
  const notes: RazorpayNotes = {
    [NOTE_KEYS.fullName]: donor.fullName,
    [NOTE_KEYS.email]: donor.email,
    [NOTE_KEYS.wants80G]: donor.wants80G ? 'yes' : 'no',
    source: 'website',
  };
  if (donor.phone) notes[NOTE_KEYS.phone] = donor.phone;
  if (donor.message) notes[NOTE_KEYS.message] = donor.message;
  if (donor.pan) notes[NOTE_KEYS.pan] = donor.pan;
  if (donor.address) notes[NOTE_KEYS.address] = donor.address;
  return notes;
}

/**
 * Read donor details back from order notes, falling back to what the donor
 * typed into Checkout when the notes are missing.
 */
export function donorFromNotes(
  notes: RazorpayNotes | [],
  fallback: { email?: string; contact?: string } = {}
): DonorDetails {
  // Razorpay sends an empty array instead of an object when there are no notes
  const values: RazorpayNotes = Array.isArray(notes) ? {} : notes;
  const wants80G = values[NOTE_KEYS.wants80G] === 'yes';

  return {
    fullName: values[NOTE_KEYS.fullName] || 'Anonymous',
    email: values[NOTE_KEYS.email] || fallback.email || '',
    phone: values[NOTE_KEYS.phone] || fallback.contact || undefined,
    message: values[NOTE_KEYS.message] || undefined,
    wants80G,
    pan: wants80G ? values[NOTE_KEYS.pan] : undefined,
    address: wants80G ? values[NOTE_KEYS.address] : undefined,
  };
}

// ==================== Helper Functions ====================

/**
 * Receipt number for an order, e.g. PTPF-20261014-K3J9QX (Razorpay allows 40 characters).
 */
export function generateReceiptNumber(): string {
  const date = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }).replaceAll('-', '');
  const random = randomBytes(4).readUInt32BE().toString(36).toUpperCase().padStart(6, '0').slice(-6);
  return `PTPF-${date}-${random}`;
}

const METHOD_LABELS: Record<string, string> = {
  upi: 'UPI',
  card: 'Card',
  netbanking: 'Net Banking',
  wallet: 'Wallet',
  emi: 'EMI',
  paylater: 'Pay Later',
  bank_transfer: 'Bank Transfer',
};

/**
 * Human-readable payment method, e.g. "Card (Visa •••• 1111)" or "Net Banking (HDFC)".
 */
export function describePaymentMethod(payment: PaymentMethodDetails): string {
  const label = METHOD_LABELS[payment.method] || payment.method;

  if (payment.method === 'card' && payment.card?.last4) {
    return `${label} (${payment.card.network || 'Card'} •••• ${payment.card.last4})`;
  }
  if (payment.method === 'netbanking' && payment.bank) {
    return `${label} (${payment.bank})`;
  }
  if (payment.method === 'wallet' && payment.wallet) {
    return `${label} (${payment.wallet})`;
  }
  return label;
}

/**
 * Extract a readable message from the SDK's error object.
 */
export function describeRazorpayError(error: unknown): string {
  if (error && typeof error === 'object' && 'error' in error) {
    const details = (error as { error?: { description?: string } }).error;
    if (details?.description) return details.description;
  }
  return error instanceof Error ? error.message : 'Unknown Razorpay error';
}

/**
 * Convert rupees to paise
 */
export function rupeesToPaise(rupees: number): number {
  return Math.round(rupees * 100);
}

/**
 * Convert paise to rupees
 */
export function paiseToRupees(paise: number): number {
  return paise / 100;
}
