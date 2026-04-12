import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { 
      name, 
      email, 
      phone, 
      itinerary, 
      startDate, 
      endDate, 
      numberOfPeople,
      budget 
    } = await request.json();

    // Validate input
    if (!name || !email || !itinerary) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send itinerary request email
    const emailResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: process.env.SENDER_EMAIL }],
            subject: `New Itinerary Request: ${itinerary}`,
          },
        ],
        from: { email: process.env.SENDER_EMAIL },
        content: [
          {
            type: 'text/html',
            value: `
              <h2>New Itinerary Request</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
              <p><strong>Safari Package:</strong> ${itinerary}</p>
              <p><strong>Start Date:</strong> ${startDate || 'Not specified'}</p>
              <p><strong>End Date:</strong> ${endDate || 'Not specified'}</p>
              <p><strong>Number of People:</strong> ${numberOfPeople || 'Not specified'}</p>
              <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
            `,
          },
        ],
      }),
    });

    // Also send confirmation email to customer
    await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: email }],
            subject: 'Your Safari Inquiry - Priority Wild Safaris',
          },
        ],
        from: { email: process.env.SENDER_EMAIL },
        content: [
          {
            type: 'text/html',
            value: `
              <h2>Thank You for Your Interest!</h2>
              <p>Dear ${name},</p>
              <p>We have received your inquiry for the <strong>${itinerary}</strong> safari package.</p>
              <p>Our team will review your request and get back to you shortly with a customized itinerary and pricing.</p>
              <p>Best regards,<br/>Priority Wild Safaris Team</p>
            `,
          },
        ],
      }),
    });

    return NextResponse.json(
      { message: 'Itinerary request submitted successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Itinerary request error:', error);
    return NextResponse.json(
      { error: 'Failed to submit request' },
      { status: 500 }
    );
  }
}
