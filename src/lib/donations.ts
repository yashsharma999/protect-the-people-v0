// Records a completed donation: Google Sheets row, admin notification, donor receipt.
// Called only from the Razorpay webhook, which may deliver the same event more
// than once, so every step is safe to repeat for the same payment.

import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { Resend } from 'resend';
import { hasPlaceholderTaxDetails } from '@/data/organization';
import { Donation, adminNotificationEmail, donorReceiptEmail, formatIndianDateTime } from '@/lib/donation-emails';

export type { Donation } from '@/lib/donation-emails';

// Lazy initialization to avoid build errors when env vars are not set
function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

function getServiceAccountAuth() {
  return new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

const DONATIONS_SHEET = 'Donations';
const DONATION_COLUMNS = [
  'Timestamp', 'Full Name', 'Email', 'Phone', 'Amount (₹)', 'Type', 'Message',
  'Transaction ID', 'Payment Mode', 'Status',
  'Receipt No', 'Order ID', '80G Receipt', 'PAN', 'Address',
];

/**
 * Open the Donations sheet, creating it or adding any missing columns.
 * Returns null when Google Sheets is not configured.
 */
async function getDonationsSheet(): Promise<GoogleSpreadsheetWorksheet | null> {
  if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    return null;
  }

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, getServiceAccountAuth());
  await doc.loadInfo();

  const sheet = doc.sheetsByTitle[DONATIONS_SHEET];
  if (!sheet) {
    return doc.addSheet({ title: DONATIONS_SHEET, headerValues: DONATION_COLUMNS });
  }

  // Sheets created before the 80G columns existed get the new columns appended
  let headers: string[] = [];
  try {
    await sheet.loadHeaderRow();
    headers = sheet.headerValues;
  } catch {
    // Empty header row - write the full header below
  }

  const missing = DONATION_COLUMNS.filter((column) => !headers.includes(column));
  if (missing.length > 0) {
    const nextHeaders = [...headers, ...missing];
    if (nextHeaders.length > sheet.columnCount) {
      await sheet.resize({ rowCount: sheet.rowCount, columnCount: nextHeaders.length });
    }
    await sheet.setHeaderRow(nextHeaders);
  }

  return sheet;
}

async function sendDonationEmails(donation: Donation) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('⚠️ Resend not configured - skipping donation emails');
    return;
  }

  // Idempotency keys stop Resend from sending the same email twice if the webhook is retried
  if (process.env.NOTIFICATION_EMAIL) {
    try {
      const { subject, html } = adminNotificationEmail(donation);
      await getResend().emails.send(
        {
          from: process.env.RESEND_FROM_EMAIL || 'Donation Received <onboarding@resend.dev>',
          to: process.env.NOTIFICATION_EMAIL,
          subject,
          html,
        },
        { idempotencyKey: `donation-admin/${donation.paymentId}` }
      );
      console.log('✅ Admin notification email sent');
    } catch (emailError) {
      console.error('❌ Admin email error:', emailError);
    }
  }

  if (donation.donor.email) {
    try {
      const { subject, html } = donorReceiptEmail(donation);
      await getResend().emails.send(
        {
          from: process.env.RESEND_FROM_EMAIL || 'Protect The People Foundation <onboarding@resend.dev>',
          to: donation.donor.email,
          subject,
          html,
        },
        { idempotencyKey: `donation-receipt/${donation.paymentId}` }
      );
      console.log('✅ Donor receipt email sent to:', donation.donor.email);
    } catch (emailError) {
      console.error('❌ Donor email error:', emailError);
    }
  }
}

/**
 * Record a captured donation exactly once per payment.
 * Throws if the sheet cannot be written, so the webhook can ask Razorpay to retry.
 */
export async function recordDonation(donation: Donation): Promise<'recorded' | 'duplicate'> {
  if (donation.donor.wants80G && hasPlaceholderTaxDetails()) {
    console.warn('⚠️ 80G receipt requested but src/data/organization.ts still has placeholder tax details');
  }

  const sheet = await getDonationsSheet();

  if (sheet) {
    const rows = await sheet.getRows();
    if (rows.some((row) => row.get('Transaction ID') === donation.paymentId)) {
      console.log('ℹ️ Donation already recorded:', donation.paymentId);
      return 'duplicate';
    }

    // raw: true stores values as typed, so donor input is never evaluated as a formula
    await sheet.addRow(
      {
        'Timestamp': formatIndianDateTime(donation.paidAt),
        'Full Name': donation.donor.fullName,
        'Email': donation.donor.email,
        'Phone': donation.donor.phone || '',
        'Amount (₹)': donation.amount,
        'Type': 'one-time',
        'Message': donation.donor.message || '',
        'Transaction ID': donation.paymentId,
        'Payment Mode': donation.paymentMethod,
        'Status': 'COMPLETED',
        'Receipt No': donation.receiptNumber,
        'Order ID': donation.orderId,
        '80G Receipt': donation.donor.wants80G ? 'Yes' : 'No',
        'PAN': donation.donor.pan || '',
        'Address': donation.donor.address || '',
      },
      { raw: true }
    );
    console.log('✅ Donation saved to Google Sheets');
  } else {
    console.warn('⚠️ Google Sheets not configured - donation not saved:', donation.paymentId);
  }

  await sendDonationEmails(donation);
  return 'recorded';
}
