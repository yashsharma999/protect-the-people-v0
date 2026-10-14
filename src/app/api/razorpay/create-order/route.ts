import { NextRequest, NextResponse } from 'next/server';
import { parseDonationRequest } from '@/lib/donation-rules';
import {
  getRazorpay,
  getRazorpayKeyId,
  donorToNotes,
  generateReceiptNumber,
  describeRazorpayError,
  rupeesToPaise,
  RazorpayConfigError,
} from '@/lib/razorpay';

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const parsed = parseDonationRequest(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const { amount, donor } = parsed;

  try {
    const receipt = generateReceiptNumber();

    // Donor details ride along as order notes so the webhook can trust them
    const order = await getRazorpay().orders.create({
      amount: rupeesToPaise(amount),
      currency: 'INR',
      receipt,
      notes: donorToNotes(donor),
    });

    console.log('✅ Razorpay order created:', {
      orderId: order.id,
      receipt,
      amount,
    });

    return NextResponse.json({
      success: true,
      keyId: getRazorpayKeyId(),
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt,
    });

  } catch (error) {
    if (error instanceof RazorpayConfigError) {
      console.error('❌ Razorpay not configured:', error.message);
      return NextResponse.json(
        { error: 'Payment gateway not configured. Please contact support.' },
        { status: 503 }
      );
    }

    console.error('❌ Razorpay create order error:', describeRazorpayError(error));
    return NextResponse.json(
      { error: 'Could not start the payment. Please try again.' },
      { status: 502 }
    );
  }
}
