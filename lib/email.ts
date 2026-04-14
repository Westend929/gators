import nodemailer from 'nodemailer';

interface SendEmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

function getGmailTransport() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass,
    },
  });
}

function getSendGridTransport() {
  const apiKey = process.env.SENDGRID_API_KEY;

  if (!apiKey) {
    return null;
  }

  // Use SendGrid API via nodemailer
  return nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false,
    auth: {
      user: 'apikey',
      pass: apiKey,
    },
  });
}

export async function sendEmail(options: SendEmailOptions) {
  const senderEmail = process.env.SENDER_EMAIL;
  if (!senderEmail) {
    throw new Error('Missing SENDER_EMAIL environment variable');
  }

  const mailOptions = {
    from: senderEmail,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  // Try Gmail first
  const gmailTransport = getGmailTransport();
  if (gmailTransport) {
    try {
      const result = await gmailTransport.sendMail(mailOptions);
      console.log('Email sent via Gmail:', result.messageId);
      return result;
    } catch (gmailError) {
      console.error('Gmail send failed, attempting SendGrid fallback:', gmailError);
    }
  }

  // Fallback to SendGrid
  const sendgridTransport = getSendGridTransport();
  if (sendgridTransport) {
    try {
      const result = await sendgridTransport.sendMail(mailOptions);
      console.log('Email sent via SendGrid:', result.messageId);
      return result;
    } catch (sendgridError) {
      console.error('SendGrid send failed:', sendgridError);
      throw new Error(`Failed to send email: Gmail and SendGrid both failed`);
    }
  }

  throw new Error('No email service configured (Gmail or SendGrid)');
}
