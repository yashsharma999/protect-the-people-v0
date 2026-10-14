// Donation validation rules shared by the donation form and the payment API,
// so the browser and the server always enforce the same limits.

export const MIN_DONATION_RUPEES = 100;
export const MAX_DONATION_RUPEES = 1000000; // ₹10,00,000

// Donor details travel to Razorpay as order notes, which cap each value at 256 characters.
export const MAX_NAME_LENGTH = 100;
export const MAX_MESSAGE_LENGTH = 256;
export const MAX_ADDRESS_LENGTH = 256;

export const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const PHONE_PATTERN = /^\+?[0-9\s-]{10,15}$/;
// Income Tax PAN: 5 letters, 4 digits, 1 letter (e.g. ABCDE1234F)
export const PAN_PATTERN = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

export interface DonorDetails {
  fullName: string;
  email: string;
  phone?: string;
  message?: string;
  wants80G: boolean;
  pan?: string;
  address?: string;
}

export type DonationRequestResult =
  | { ok: true; amount: number; donor: DonorDetails }
  | { ok: false; error: string };

function cleanString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

/**
 * Validate an untrusted create-order request body.
 */
export function parseDonationRequest(body: unknown): DonationRequestResult {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Invalid request' };
  }
  const input = body as Record<string, unknown>;

  const amount = Number(input.amount);
  if (!Number.isInteger(amount) || amount < MIN_DONATION_RUPEES || amount > MAX_DONATION_RUPEES) {
    return {
      ok: false,
      error: `Donation amount must be a whole number between ₹${MIN_DONATION_RUPEES.toLocaleString('en-IN')} and ₹${MAX_DONATION_RUPEES.toLocaleString('en-IN')}`,
    };
  }

  const fullName = cleanString(input.fullName);
  if (!fullName || fullName.length > MAX_NAME_LENGTH) {
    return { ok: false, error: 'Please enter your full name' };
  }

  const email = cleanString(input.email);
  if (!EMAIL_PATTERN.test(email) || email.length > MAX_NAME_LENGTH) {
    return { ok: false, error: 'Please enter a valid email address' };
  }

  const phone = cleanString(input.phone);
  if (phone && !PHONE_PATTERN.test(phone)) {
    return { ok: false, error: 'Please enter a valid phone number' };
  }

  const message = cleanString(input.message);
  if (message.length > MAX_MESSAGE_LENGTH) {
    return { ok: false, error: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer` };
  }

  const wants80G = input.wants80G === true;
  const pan = cleanString(input.pan).toUpperCase();
  const address = cleanString(input.address);
  if (wants80G) {
    if (!PAN_PATTERN.test(pan)) {
      return { ok: false, error: 'Please enter a valid PAN for your 80G receipt' };
    }
    if (!address || address.length > MAX_ADDRESS_LENGTH) {
      return { ok: false, error: 'Please enter your address for your 80G receipt' };
    }
  }

  return {
    ok: true,
    amount,
    donor: {
      fullName,
      email,
      phone: phone || undefined,
      message: message || undefined,
      wants80G,
      pan: wants80G ? pan : undefined,
      address: wants80G ? address : undefined,
    },
  };
}
