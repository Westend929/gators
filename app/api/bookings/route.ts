import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for demo purposes - replace with database in production
let bookings: any[] = [];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');

    let filteredBookings = bookings;

    if (userId) {
      filteredBookings = filteredBookings.filter(booking => booking.userId === userId);
    }

    if (status) {
      filteredBookings = filteredBookings.filter(booking => booking.status === status);
    }

    return NextResponse.json({
      bookings: filteredBookings,
      total: filteredBookings.length,
    });
  } catch (error) {
    console.error('Bookings fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      userId,
      userEmail,
      safariPackage,
      startDate,
      endDate,
      numberOfPeople,
      totalAmount,
      paymentMethod,
      specialRequests,
    } = await request.json();

    // Validate required fields
    if (!userId || !userEmail || !safariPackage || !startDate || !endDate || !numberOfPeople || !totalAmount) {
      return NextResponse.json(
        { error: 'Missing required booking fields' },
        { status: 400 }
      );
    }

    // Create booking
    const booking = {
      id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      userEmail,
      safariPackage,
      startDate,
      endDate,
      numberOfPeople: parseInt(numberOfPeople),
      totalAmount: parseFloat(totalAmount),
      paymentMethod,
      specialRequests,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    bookings.push(booking);

    // Send confirmation email
    try {
      await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: userEmail }],
              subject: 'Booking Confirmation - Priority Wild Safaris',
            },
          ],
          from: { email: process.env.SENDER_EMAIL },
          content: [
            {
              type: 'text/html',
              value: `
                <h2>Booking Confirmation</h2>
                <p>Thank you for booking with Priority Wild Safaris!</p>
                <p><strong>Booking ID:</strong> ${booking.id}</p>
                <p><strong>Safari Package:</strong> ${safariPackage}</p>
                <p><strong>Dates:</strong> ${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}</p>
                <p><strong>Number of People:</strong> ${numberOfPeople}</p>
                <p><strong>Total Amount:</strong> $${totalAmount}</p>
                <p><strong>Status:</strong> ${booking.status}</p>
                <p>We will contact you shortly with payment instructions and additional details.</p>
              `,
            },
          ],
        }),
      });
    } catch (emailError) {
      console.error('Confirmation email failed:', emailError);
    }

    return NextResponse.json({
      message: 'Booking created successfully',
      booking: booking,
    }, { status: 201 });
  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

// Update booking status
export async function PUT(request: NextRequest) {
  try {
    const { bookingId, status, notes } = await request.json();

    if (!bookingId || !status) {
      return NextResponse.json(
        { error: 'Missing booking ID or status' },
        { status: 400 }
      );
    }

    const bookingIndex = bookings.findIndex(b => b.id === bookingId);

    if (bookingIndex === -1) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    bookings[bookingIndex].status = status;
    bookings[bookingIndex].updatedAt = new Date().toISOString();

    if (notes) {
      bookings[bookingIndex].notes = notes;
    }

    return NextResponse.json({
      message: 'Booking updated successfully',
      booking: bookings[bookingIndex],
    });
  } catch (error) {
    console.error('Booking update error:', error);
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}