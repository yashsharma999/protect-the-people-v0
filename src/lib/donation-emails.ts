// Email templates for donations: admin notification and donor receipt (with 80G details)

import { organization } from '@/data/organization';
import type { DonorDetails } from '@/lib/donation-rules';

export interface Donation {
  paymentId: string;
  orderId: string;
  receiptNumber: string;
  amount: number; // Amount in rupees
  paymentMethod: string;
  paidAt: Date;
  donor: DonorDetails;
}

// ==================== Helper Functions ====================

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function formatIndianDateTime(date: Date): string {
  return date.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

const ONES = [
  '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
  'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen',
];
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

function twoDigitWords(n: number): string {
  if (n < 20) return ONES[n];
  return [TENS[Math.floor(n / 10)], ONES[n % 10]].filter(Boolean).join(' ');
}

function threeDigitWords(n: number): string {
  const hundreds = Math.floor(n / 100);
  const rest = n % 100;
  return [hundreds ? `${ONES[hundreds]} Hundred` : '', rest ? twoDigitWords(rest) : '']
    .filter(Boolean)
    .join(' ');
}

/**
 * Amount in words using the Indian numbering system, e.g. "Rupees Ten Thousand Five Hundred Only".
 */
export function amountInWords(rupees: number): string {
  let n = Math.round(rupees);
  if (n === 0) return 'Rupees Zero Only';

  const crore = Math.floor(n / 10000000);
  n %= 10000000;
  const lakh = Math.floor(n / 100000);
  n %= 100000;
  const thousand = Math.floor(n / 1000);
  n %= 1000;

  const parts = [
    crore ? `${threeDigitWords(crore)} Crore` : '',
    lakh ? `${twoDigitWords(lakh)} Lakh` : '',
    thousand ? `${twoDigitWords(thousand)} Thousand` : '',
    n ? threeDigitWords(n) : '',
  ].filter(Boolean);

  return `Rupees ${parts.join(' ')} Only`;
}

function formatRupees(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

function singleLine(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

// ==================== Admin Notification ====================

export function adminNotificationEmail(donation: Donation) {
  const { donor } = donation;
  const amount = formatRupees(donation.amount);
  const name = escapeHtml(donor.fullName);
  const email = escapeHtml(donor.email);
  const phone = donor.phone ? escapeHtml(donor.phone) : '';

  const rows: Array<[string, string]> = [
    ['Donor Name', name],
    ['Email', `<a href="mailto:${email}" style="color: #222120;">${email}</a>`],
    ...(phone ? [['Phone', `<a href="tel:${phone}" style="color: #222120;">${phone}</a>`] as [string, string]] : []),
    ['80G Receipt', donor.wants80G ? 'Requested' : 'Not requested'],
    ...(donor.wants80G
      ? [
          ['PAN', `<span style="font-family: monospace;">${escapeHtml(donor.pan || '')}</span>`] as [string, string],
          ['Address', escapeHtml(donor.address || '')] as [string, string],
        ]
      : []),
    ['Receipt No.', `<span style="font-family: monospace;">${escapeHtml(donation.receiptNumber)}</span>`],
    ['Transaction ID', `<span style="font-family: monospace;">${escapeHtml(donation.paymentId)}</span>`],
    ['Order ID', `<span style="font-family: monospace;">${escapeHtml(donation.orderId)}</span>`],
  ];

  return {
    subject: `💚 Payment Received: ${amount} from ${singleLine(donor.fullName)}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #222120; border-bottom: 2px solid #C4A962; padding-bottom: 10px;">
          ✅ Payment Successfully Received
        </h2>

        <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: white; padding: 20px; border-radius: 12px; margin: 20px 0; text-align: center;">
          <p style="margin: 0; font-size: 14px; opacity: 0.9;">Amount Received</p>
          <p style="margin: 5px 0; font-size: 36px; font-weight: bold;">${amount}</p>
          <p style="margin: 0; font-size: 12px; opacity: 0.8;">via ${escapeHtml(donation.paymentMethod)}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          ${rows
            .map(
              ([label, value], index) => `
          <tr${index % 2 === 0 ? ' style="background: #f9f9f9;"' : ''}>
            <td style="padding: 12px; border: 1px solid #eee; font-weight: bold; width: 140px;">${label}</td>
            <td style="padding: 12px; border: 1px solid #eee;">${value}</td>
          </tr>`
            )
            .join('')}
        </table>

        ${donor.message ? `
        <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 8px;">
          <h3 style="margin: 0 0 10px 0; color: #222120;">Donor's Message:</h3>
          <p style="margin: 0; color: #444; line-height: 1.6;">${escapeHtml(donor.message)}</p>
        </div>
        ` : ''}

        <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #888; font-size: 12px;">
          Payment received on ${formatIndianDateTime(donation.paidAt)} IST
        </p>
      </div>
    `,
  };
}

// ==================== Donor Receipt ====================

export function donorReceiptEmail(donation: Donation) {
  const { donor } = donation;
  const amount = formatRupees(donation.amount);
  const { section80G } = organization;

  const receiptRows: Array<[string, string]> = [
    ['Receipt No.', `<span style="font-family: monospace;">${escapeHtml(donation.receiptNumber)}</span>`],
    ['Date', formatIndianDateTime(donation.paidAt)],
    ['Received From', escapeHtml(donor.fullName)],
    ...(donor.wants80G
      ? [
          ['Donor PAN', `<span style="font-family: monospace;">${escapeHtml(donor.pan || '')}</span>`] as [string, string],
          ['Donor Address', escapeHtml(donor.address || '')] as [string, string],
        ]
      : []),
    ['Amount', amount],
    ['Amount in Words', amountInWords(donation.amount)],
    ['Mode of Payment', `Online – ${escapeHtml(donation.paymentMethod)}`],
    ['Transaction ID', `<span style="font-family: monospace; font-size: 12px;">${escapeHtml(donation.paymentId)}</span>`],
    ['Purpose', 'Donation'],
  ];

  const taxSection = donor.wants80G
    ? `
      <div style="border: 1px solid #C4A962; border-radius: 12px; padding: 20px; margin: 25px 0;">
        <h3 style="margin: 0 0 12px 0; color: #222120; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">80G Tax Exemption</h3>
        <p style="color: #555; font-size: 14px; line-height: 1.7; margin: 0 0 12px 0;">
          This donation is eligible for a ${section80G.deductiblePercent}% deduction under Section 80G of the Income Tax Act, 1961.
        </p>
        <table style="width: 100%; font-size: 13px; color: #444;">
          <tr><td style="padding: 4px 0; color: #666;">Organisation</td><td style="padding: 4px 0; text-align: right;">${escapeHtml(organization.legalName)}</td></tr>
          <tr><td style="padding: 4px 0; color: #666;">Organisation PAN</td><td style="padding: 4px 0; text-align: right; font-family: monospace;">${escapeHtml(organization.pan)}</td></tr>
          <tr><td style="padding: 4px 0; color: #666;">80G Registration No.</td><td style="padding: 4px 0; text-align: right; font-family: monospace;">${escapeHtml(section80G.registrationNumber)}</td></tr>
          <tr><td style="padding: 4px 0; color: #666;">80G Validity</td><td style="padding: 4px 0; text-align: right;">${escapeHtml(section80G.validity)}</td></tr>
        </table>
        <p style="color: #777; font-size: 12px; line-height: 1.6; margin: 12px 0 0 0;">
          We will report this donation to the Income Tax Department in Form 10BD. Your Form 10BE certificate will be issued after filing, by 31 May following the end of the financial year.
        </p>
      </div>`
    : `
      <p style="color: #777; font-size: 13px; line-height: 1.6; margin: 25px 0 0 0;">
        Need an 80G tax receipt for this donation? Reply to this email with your PAN and address within this financial year and we will include it in our 80G filing.
      </p>`;

  return {
    subject: `Thank you for your donation of ${amount} 💚 (Receipt ${donation.receiptNumber})`,
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #222120 0%, #3d3a38 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Thank You! 🙏</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0; font-size: 16px;">Your generosity makes a difference</p>
        </div>

        <!-- Amount Card -->
        <div style="background: linear-gradient(135deg, #C4A962 0%, #a8913d 100%); padding: 30px; text-align: center; margin: -1px 0;">
          <p style="margin: 0; font-size: 14px; color: #222120; opacity: 0.8;">Donation Amount</p>
          <p style="margin: 8px 0; font-size: 48px; font-weight: bold; color: #222120;">${amount}</p>
          <p style="margin: 0; font-size: 13px; color: #222120; opacity: 0.7;">One-time donation</p>
        </div>

        <!-- Message -->
        <div style="padding: 30px;">
          <p style="color: #333; font-size: 16px; line-height: 1.7; margin: 0 0 20px 0;">
            Dear <strong>${escapeHtml(donor.fullName)}</strong>,
          </p>
          <p style="color: #555; font-size: 15px; line-height: 1.7; margin: 0 0 20px 0;">
            On behalf of everyone at <strong>${escapeHtml(organization.legalName)}</strong>, we want to express our heartfelt gratitude for your generous donation. Your support helps us continue our mission of empowering communities through education, food security, and human rights advocacy.
          </p>
          <p style="color: #555; font-size: 15px; line-height: 1.7; margin: 0 0 25px 0;">
            Every contribution, no matter the size, brings us one step closer to creating lasting change in the lives of those who need it most.
          </p>

          <!-- Receipt Box -->
          <div style="background: #f8f9fa; border-radius: 12px; padding: 20px; margin: 25px 0;">
            <h3 style="margin: 0 0 15px 0; color: #222120; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Donation Receipt</h3>
            <table style="width: 100%; font-size: 14px;">
              ${receiptRows
                .map(
                  ([label, value]) => `
              <tr>
                <td style="padding: 8px 12px 8px 0; color: #666; vertical-align: top; white-space: nowrap;">${label}</td>
                <td style="padding: 8px 0; color: #222120; text-align: right;">${value}</td>
              </tr>`
                )
                .join('')}
            </table>
          </div>

          ${taxSection}

          <p style="color: #555; font-size: 15px; line-height: 1.7; margin: 25px 0 0 0;">
            With gratitude,<br>
            <strong style="color: #222120;">The ${escapeHtml(organization.legalName)} Team</strong>
          </p>
        </div>

        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 25px 30px; text-align: center; border-radius: 0 0 12px 12px; border-top: 1px solid #eee;">
          <p style="margin: 0 0 10px 0; color: #888; font-size: 13px;">
            Questions about your donation? Reply to this email or write to ${escapeHtml(organization.email)}.
          </p>
          <p style="margin: 0 0 6px 0; color: #aaa; font-size: 12px;">
            ${escapeHtml(organization.legalName)} · ${escapeHtml(organization.registeredAddress)}
          </p>
          <p style="margin: 0; color: #aaa; font-size: 12px;">
            © ${new Date().getFullYear()} ${escapeHtml(organization.legalName)}. All rights reserved.
          </p>
        </div>
      </div>
    `,
  };
}
