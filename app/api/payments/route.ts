import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const {
      bookingId,
      amount,
      currency = 'USD',
      paymentMethod,
      cardToken, // For Stripe or similar
      paypalOrderId, // For PayPal
    } = await request.json();

    // Validate required fields
    if (!bookingId || !amount || !paymentMethod) {
      return NextResponse.json(
        { error: 'Missing required payment fields' },
        { status: 400 }
      );
    }

    let paymentResult;

    // Process payment based on method
    switch (paymentMethod) {
      case 'stripe':
        if (!cardToken) {
          return NextResponse.json(
            { error: 'Card token required for Stripe payment' },
            { status: 400 }
          );
        }

        // Stripe payment processing
        paymentResult = await processStripePayment(cardToken, amount, currency, bookingId);
        break;

      case 'paypal':
        if (!paypalOrderId) {
          return NextResponse.json(
            { error: 'PayPal order ID required' },
            { status: 400 }
          );
        }

        // PayPal payment processing
        paymentResult = await processPayPalPayment(paypalOrderId, bookingId);
        break;

      case 'bank_transfer':
        // Handle bank transfer (manual processing)
        paymentResult = await processBankTransfer(bookingId, amount);
        break;

      default:
        return NextResponse.json(
          { error: 'Unsupported payment method' },
          { status: 400 }
        );
    }

    // Update booking status if payment successful
    if (paymentResult.success) {
      await updateBookingStatus(bookingId, 'confirmed');
    }

    return NextResponse.json({
      message: 'Payment processed successfully',
      payment: paymentResult,
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    return NextResponse.json(
      { error: 'Payment processing failed' },
      { status: 500 }
    );
  }
}

// Stripe payment processing
async function processStripePayment(cardToken: string, amount: number, currency: string, bookingId: string) {
  try {
    // This is a placeholder - replace with actual Stripe API call
    const response = await fetch('https://api.stripe.com/v1/charges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      },
      body: new URLSearchParams({
        amount: (amount * 100).toString(), // Convert to cents
        currency: currency.toLowerCase(),
        source: cardToken,
        description: `Safari booking: ${bookingId}`,
      }),
    });

    if (!response.ok) {
      throw new Error('Stripe payment failed');
    }

    const charge = await response.json();

    return {
      success: true,
      transactionId: charge.id,
      amount: charge.amount / 100,
      currency: charge.currency,
      status: charge.status,
    };
  } catch (error) {
    console.error('Stripe payment error:', error);
    return {
      success: false,
      error: 'Stripe payment failed',
    };
  }
}

// PayPal payment processing
async function processPayPalPayment(orderId: string, bookingId: string) {
  try {
    // This is a placeholder - replace with actual PayPal API call
    const response = await fetch(`https://api.paypal.com/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PAYPAL_ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error('PayPal payment failed');
    }

    const order = await response.json();

    return {
      success: true,
      transactionId: order.id,
      amount: order.purchase_units[0].amount.value,
      currency: order.purchase_units[0].amount.currency_code,
      status: order.status,
    };
  } catch (error) {
    console.error('PayPal payment error:', error);
    return {
      success: false,
      error: 'PayPal payment failed',
    };
  }
}

// Bank transfer processing (manual)
async function processBankTransfer(bookingId: string, amount: number) {
  // For bank transfers, we mark as pending and send instructions
  return {
    success: true,
    transactionId: `BT_${Date.now()}`,
    amount,
    currency: 'USD',
    status: 'pending',
    instructions: 'Please transfer funds to our bank account. Details will be sent via email.',
  };
}

// Update booking status
async function updateBookingStatus(bookingId: string, status: string) {
  try {
    // This would update the booking in your database
    // For now, we'll call the bookings API
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/bookings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookingId,
        status,
      }),
    });
  } catch (error) {
    console.error('Booking status update failed:', error);
  }
}

// Get payment methods
export async function GET(request: NextRequest) {
  try {
    const paymentMethods = [
      {
        id: 'stripe',
        name: 'Credit/Debit Card',
        description: 'Pay securely with your card',
        enabled: !!process.env.STRIPE_SECRET_KEY,
      },
      {
        id: 'paypal',
        name: 'PayPal',
        description: 'Pay with your PayPal account',
        enabled: !!process.env.PAYPAL_CLIENT_ID,
      },
      {
        id: 'bank_transfer',
        name: 'Bank Transfer',
        description: 'Direct bank transfer (manual processing)',
        enabled: true,
      },
    ];

    return NextResponse.json({
      paymentMethods: paymentMethods.filter(method => method.enabled),
    });
  } catch (error) {
    console.error('Payment methods fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payment methods' },
      { status: 500 }
    );
  }
}