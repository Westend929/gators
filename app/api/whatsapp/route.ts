import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, phone } = await request.json();

    // Validate input
    if (!message || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format phone number for WhatsApp Business API
    const formattedPhone = phone.replace(/\D/g, '');

    // Send message via WhatsApp Business API
    const response = await fetch(
      `https://graph.instagram.com/v18.0/${process.env.WHATSAPP_BUSINESS_ACCOUNT_ID}/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`,
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: formattedPhone,
          type: 'text',
          text: {
            preview_url: false,
            body: message,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('WhatsApp API error:', error);
      throw new Error('Failed to send WhatsApp message');
    }

    const data = await response.json();

    return NextResponse.json(
      { message: 'Message sent successfully via WhatsApp', messageId: data.messages[0].id },
      { status: 200 }
    );
  } catch (error) {
    console.error('WhatsApp send error:', error);
    return NextResponse.json(
      { error: 'Failed to send WhatsApp message' },
      { status: 500 }
    );
  }
}

// Webhook for WhatsApp incoming messages (if needed)
export async function PUT(request: NextRequest) {
  try {
    const { hub } = await request.json();

    // Verify webhook token
    if (hub.mode === 'subscribe' && hub.challenge) {
      if (hub.verify_token === process.env.WHATSAPP_VERIFY_TOKEN) {
        return NextResponse.json(hub.challenge, { status: 200 });
      }
      return NextResponse.json(
        { error: 'Invalid verification token' },
        { status: 403 }
      );
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
