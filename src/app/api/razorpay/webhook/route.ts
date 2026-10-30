import { NextRequest, NextResponse } from 'next/server';
import { recordDonation } from '@/lib/donations';
import {
  RazorpayWebhookEvent,
  verifyWebhookSignature,
  donorFromNotes,
  describePaymentMethod,
  paiseToRupees,
} from '@/lib/razorpay';

/**
 * Razorpay Webhook Handler
 * The single place where donations are recorded and receipts are sent.
 *
 * Events handled:
 * - order.paid (fires once the payment for an order is captured)
 *
 * Razorpay retries any non-2xx response for 24 hours, and may deliver the
 * same event more than once; recordDonation ignores repeats.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    console.error('❌ RAZORPAY_WEBHOOK_SECRET not configured');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  // The signature covers the exact bytes Razorpay sent, so read the body raw
  const rawBody = await request.text();
  const signature = request.headers.get('x-razorpay-signature');

  if (!signature || !verifyWebhookSignature(rawBody, signature, secret)) {
    console.warn('⚠️ Razorpay webhook signature mismatch');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  let event: RazorpayWebhookEvent;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  console.log('📩 Razorpay webhook received:', {
    event: event.event,
    eventId: request.headers.get('x-razorpay-event-id'),
  });

  if (event.event !== 'order.paid') {
    return NextResponse.json({ received: true, ignored: event.event });
  }

  const payment = event.payload.payment?.entity;
  const order = event.payload.order?.entity;
  if (!payment || !order) {
    console.error('❌ order.paid webhook missing payment or order entity');
    return NextResponse.json({ received: true, error: 'Missing entities' });
  }

  try {
    const result = await recordDonation({
      paymentId: payment.id,
      orderId: order.id,
      receiptNumber: order.receipt,
      amount: paiseToRupees(payment.amount),
      paymentMethod: describePaymentMethod(payment),
      paidAt: new Date(payment.created_at * 1000),
      donor: donorFromNotes(order.notes, { email: payment.email, contact: payment.contact }),
    });

    console.log('✅ Donation webhook processed:', { paymentId: payment.id, result });
    return NextResponse.json({ received: true, result });

  } catch (error) {
    // Non-2xx makes Razorpay retry, and recordDonation skips anything already saved
    console.error('❌ Failed to record donation:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Failed to record donation' }, { status: 500 });
  }
}
