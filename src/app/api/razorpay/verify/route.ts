import { NextRequest, NextResponse } from 'next/server';
import {
  getRazorpay,
  verifyPaymentSignature,
  describePaymentMethod,
  describeRazorpayError,
  paiseToRupees,
} from '@/lib/razorpay';

interface VerifyRequestBody {
  orderId?: string;
  paymentId?: string;
  signature?: string;
}

/**
 * Confirms a Checkout payment for the donor's success screen.
 * Recording the donation and sending emails happens in the webhook.
 */
export async function POST(request: NextRequest) {
  try {
    const body: VerifyRequestBody = await request.json();
    const { orderId, paymentId, signature } = body;

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        { error: 'Payment details are missing' },
        { status: 400 }
      );
    }

    if (!verifyPaymentSignature(orderId, paymentId, signature)) {
      console.warn('⚠️ Razorpay signature mismatch:', { orderId, paymentId });
      return NextResponse.json(
        { error: 'Payment could not be verified' },
        { status: 400 }
      );
    }

    const payment = await getRazorpay().payments.fetch(paymentId);

    if (payment.order_id !== orderId) {
      return NextResponse.json(
        { error: 'Payment could not be verified' },
        { status: 400 }
      );
    }

    console.log('📋 Razorpay payment status:', {
      orderId,
      paymentId,
      status: payment.status,
    });

    // With auto-capture on, "authorized" turns into "captured" within moments
    if (payment.status !== 'captured' && payment.status !== 'authorized') {
      return NextResponse.json({
        success: false,
        status: payment.status,
        error: 'Payment was not successful. Please try again.',
      });
    }

    return NextResponse.json({
      success: true,
      status: payment.status,
      amount: paiseToRupees(Number(payment.amount)),
      paymentId: payment.id,
      paymentMethod: describePaymentMethod(payment),
    });

  } catch (error) {
    console.error('❌ Verify payment error:', describeRazorpayError(error));

    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
