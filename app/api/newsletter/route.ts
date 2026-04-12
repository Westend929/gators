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

    // Add to newsletter list via your email service
    // This is a placeholder - replace with your actual service
    const response = await fetch('https://api.sendgrid.com/v3/marketing/contacts', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      },
      body: JSON.stringify({
        contacts: [
          {
            email: email,
            custom_fields: {
              e1_T: 'Newsletter Subscriber',
            },
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error('Newsletter subscription failed:', response.statusText);
    }

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
