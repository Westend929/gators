import { NextRequest, NextResponse } from 'next/server';
import { sign, verify } from 'jsonwebtoken';

// In-memory storage for demo purposes - replace with database in production
let users: any[] = [];
let sessions: any[] = [];

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
  try {
    const { action, email, password, name, confirmPassword } = await request.json();

    switch (action) {
      case 'register':
        return await handleRegister(email, password, name, confirmPassword);
      case 'login':
        return await handleLogin(email, password);
      case 'logout':
        return await handleLogout(request);
      case 'verify':
        return await handleVerify(request);
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

async function handleRegister(email: string, password: string, name: string, confirmPassword: string) {
  // Validate input
  if (!email || !password || !name) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  if (password !== confirmPassword) {
    return NextResponse.json(
      { error: 'Passwords do not match' },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: 'Password must be at least 8 characters long' },
      { status: 400 }
    );
  }

  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return NextResponse.json(
      { error: 'User already exists' },
      { status: 409 }
    );
  }

  // Create user
  const user = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    email,
    name,
    password: await hashPassword(password), // In production, use proper hashing
    createdAt: new Date().toISOString(),
    role: 'customer',
  };

  users.push(user);

  // Create session
  const token = sign(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  const session = {
    id: `session_${Date.now()}`,
    userId: user.id,
    token,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  };

  sessions.push(session);

  // Send welcome email
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
            to: [{ email }],
            subject: 'Welcome to Priority Wild Safaris!',
          },
        ],
        from: { email: process.env.SENDER_EMAIL },
        content: [
          {
            type: 'text/html',
            value: `
              <h2>Welcome to Priority Wild Safaris!</h2>
              <p>Dear ${name},</p>
              <p>Thank you for registering with us. We're excited to help you plan your dream safari adventure!</p>
              <p>Best regards,<br/>Priority Wild Safaris Team</p>
            `,
          },
        ],
      }),
    });
  } catch (emailError) {
    console.error('Welcome email failed:', emailError);
  }

  return NextResponse.json({
    message: 'Registration successful',
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    token,
  });
}

async function handleLogin(email: string, password: string) {
  // Validate input
  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email and password are required' },
      { status: 400 }
    );
  }

  // Find user
  const user = users.find(u => u.email === email);
  if (!user) {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  }

  // Verify password
  const isValidPassword = await verifyPassword(password, user.password);
  if (!isValidPassword) {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  }

  // Create session
  const token = sign(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  const session = {
    id: `session_${Date.now()}`,
    userId: user.id,
    token,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  };

  sessions.push(session);

  return NextResponse.json({
    message: 'Login successful',
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    token,
  });
}

async function handleLogout(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'No token provided' },
      { status: 401 }
    );
  }

  const token = authHeader.substring(7);

  // Remove session
  sessions = sessions.filter(session => session.token !== token);

  return NextResponse.json({
    message: 'Logout successful',
  });
}

async function handleVerify(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'No token provided' },
      { status: 401 }
    );
  }

  const token = authHeader.substring(7);

  try {
    const decoded = verify(token, JWT_SECRET) as any;

    // Check if session exists
    const session = sessions.find(s => s.token === token && s.userId === decoded.userId);
    if (!session) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      );
    }

    // Check if session is expired
    if (new Date() > new Date(session.expiresAt)) {
      sessions = sessions.filter(s => s.token !== token);
      return NextResponse.json(
        { error: 'Session expired' },
        { status: 401 }
      );
    }

    const user = users.find(u => u.id === decoded.userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      valid: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }
}

// Simple password hashing (replace with proper bcrypt in production)
async function hashPassword(password: string): Promise<string> {
  // This is a placeholder - use proper password hashing in production
  return Buffer.from(password).toString('base64');
}

async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  // This is a placeholder - use proper password verification in production
  const hashedInput = Buffer.from(password).toString('base64');
  return hashedInput === hashedPassword;
}