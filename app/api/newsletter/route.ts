import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const { sendEmail } = await import('@/lib/email');

    await sendEmail({
      to: process.env.SENDER_EMAIL!,
      subject: 'New Newsletter Subscriber',
      html: `
        <h2>New Newsletter Subscriber</h2>
        <p><strong>Email:</strong> ${email}</p>
      `,
    });

    await sendEmail({
      to: email,
      subject: 'Newsletter Subscription Confirmed',
      html: `
        <h2>Thank you for subscribing!</h2>
        <p>You have been added to the Gators Tours and Safaris newsletter.</p>
      `,
    });

    return NextResponse.json(
      { message: 'Successfully subscribed to our newsletter!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}
