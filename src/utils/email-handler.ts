import nodemailer from 'nodemailer';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { createHash } from 'crypto';
import { getAdminNotificationHtml, getAdminNotificationText, getAdminNotificationSubject } from '../email-templates/admin-notification';
import { getUserConfirmationHtml, getUserConfirmationText, getUserConfirmationSubject } from '../email-templates/user-confirmation';
import 'dotenv/config';

// Environment variables
const {
  SMTP_HOST = '',
  SMTP_PORT = '587',
  SMTP_USER = '',
  SMTP_PASS = '',
  ADMIN_EMAIL = 'richard@bergsma.it',
  WEBSITE_NAME = 'bergsma.it',
  NODE_ENV = 'development'
} = process.env;

// Email configuration
const isProduction = NODE_ENV === 'production';

// Create a transporter for sending emails
let transporter: nodemailer.Transporter;

// Initialize the transporter based on environment
function initializeTransporter() {
  if (isProduction && SMTP_HOST && SMTP_USER && SMTP_PASS) {
    // Production: Use SMTP server
    
    // ProtonMail specific configuration
    // ProtonMail often requires using their Bridge application for SMTP
    const isProtonMail = SMTP_HOST.includes('protonmail');
    
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT, 10),
      secure: parseInt(SMTP_PORT, 10) === 465, // true for 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      // ProtonMail specific settings
      ...(isProtonMail && {
        tls: {
          // Do not fail on invalid certs
          rejectUnauthorized: false,
          // Specific ciphers for ProtonMail
          ciphers: 'SSLv3'
        }
      }),
      debug: true, // Enable debug output for troubleshooting
    });
    
    // Verify SMTP connection configuration
    transporter.verify(function(error, _success) {
      if (error) {
        console.error('SMTP connection error:', error);
      } else {
        console.log('SMTP server is ready to take our messages');
      }
    });
  } else {
    // Development: Log emails to console
    transporter = nodemailer.createTransport({
      streamTransport: true,
      newline: 'unix',
      buffer: true,
    });
  }
}

// Rate limiter configuration
const rateLimiter = new RateLimiterMemory({
  points: 5, // 5 attempts
  duration: 3600, // per hour
});

// CSRF protection
const csrfTokens = new Map<string, { token: string; expires: Date }>();

// Generate a CSRF token
export function generateCsrfToken(): string {
  const token = createHash('sha256')
    .update(Math.random().toString())
    .digest('hex');
  
  // Token expires after 1 hour
  const expires = new Date();
  expires.setHours(expires.getHours() + 1);
  
  csrfTokens.set(token, { token, expires });
  
  // Clean up expired tokens
  for (const [key, value] of csrfTokens.entries()) {
    if (value.expires < new Date()) {
      csrfTokens.delete(key);
    }
  }
  
  return token;
}

// Validate a CSRF token
export function validateCsrfToken(token: string): boolean {
  const storedToken = csrfTokens.get(token);
  
  if (!storedToken) {
    return false;
  }
  
  if (storedToken.expires < new Date()) {
    csrfTokens.delete(token);
    return false;
  }
  
  return true;
}

// Check rate limit for an IP address
export async function checkRateLimit(ipAddress: string): Promise<{ limited: boolean; message?: string }> {
  try {
    await rateLimiter.consume(ipAddress);
    return { limited: false };
  } catch (error) {
    if (error instanceof Error) {
      return {
        limited: true,
        message: 'Too many requests. Please try again later.',
      };
    }
    // RateLimiterRes with msBeforeNext property
    interface RateLimiterResponse {
      msBeforeNext: number;
    }
    const resetTime = Math.ceil((error as RateLimiterResponse).msBeforeNext / 1000 / 60);
    return {
      limited: true,
      message: `Too many requests. Please try again in ${resetTime} minutes.`,
    };
  }
}

// Log email sending attempts
export function logEmailAttempt(
  success: boolean,
  recipient: string,
  subject: string,
  error?: Error
): void {
  const timestamp = new Date().toISOString();
  const status = success ? 'SUCCESS' : 'FAILURE';
  const errorMessage = error ? `: ${error.message}` : '';
  
  const logMessage = `[${timestamp}] [EMAIL ${status}] To: ${recipient}, Subject: ${subject}${errorMessage}`;
  
  if (isProduction) {
    // In production, you might want to log to a file or a logging service
    console.log(logMessage);
  } else {
    // In development, log to console
    console.log(logMessage);
  }
}

// Send an email
export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  text: string
): Promise<boolean> {
  console.log(`Attempting to send email to: ${to}`);
  console.log(`Subject: ${subject}`);
  
  // Initialize transporter if not already done
  if (!transporter) {
    console.log('Initializing transporter');
    initializeTransporter();
  }
  
  try {
    const mailOptions = {
      from: `"${WEBSITE_NAME}" <${ADMIN_EMAIL}>`,
      to,
      subject,
      html,
      text,
    };
    
    console.log('Mail options:', {
      from: `"${WEBSITE_NAME}" <${ADMIN_EMAIL}>`,
      to,
      subject,
      textLength: text.length,
      htmlLength: html.length
    });
    
    console.log('Sending email via transporter');
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent, info:', info.messageId);
    
    if (!isProduction) {
      // In development, log the email content
      console.log('Email sent (development mode):');
      console.log('To:', to);
      console.log('Subject:', subject);
      console.log('Preview:', nodemailer.getTestMessageUrl(info));
      
      if (info.message) {
        // For stream transport, we can get the message content
        console.log('Message:', info.message.toString());
      }
    }
    
    logEmailAttempt(true, to, subject);
    return true;
  } catch (error) {
    logEmailAttempt(false, to, subject, error as Error);
    
    // Enhanced error logging for SMTP issues
    if (isProduction) {
      console.error('Error sending email:', error);
      
      // Log more detailed information for SMTP errors
      if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        
        // Log additional details for specific error types
        if (error.name === 'Error' && error.message.includes('ECONNREFUSED')) {
          console.error('SMTP Connection Refused: Check if the SMTP server is reachable and the port is correct');
        } else if (error.message.includes('Invalid login')) {
          console.error('SMTP Authentication Failed: Check your username and password');
        } else if (error.message.includes('certificate')) {
          console.error('SSL/TLS Certificate Error: There might be an issue with the server certificate');
        }
      }
    }
    
    return false;
  }
}

// Send admin notification email
export async function sendAdminNotification(
  name: string,
  email: string,
  message: string,
  ipAddress?: string,
  userAgent?: string
): Promise<boolean> {
  console.log('sendAdminNotification called with:', { name, email, messageLength: message.length });
  
  // Validate inputs
  if (!name || name.trim() === '') {
    console.error('Cannot send admin notification: name is empty');
    return false;
  }
  
  if (!email || email.trim() === '') {
    console.error('Cannot send admin notification: email is empty');
    return false;
  }
  
  if (!message || message.trim() === '') {
    console.error('Cannot send admin notification: message is empty');
    return false;
  }
  
  if (!ADMIN_EMAIL || ADMIN_EMAIL.trim() === '') {
    console.error('Cannot send admin notification: ADMIN_EMAIL is not configured');
    return false;
  }
  
  const submittedAt = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  
  const props = {
    name,
    email,
    message,
    submittedAt,
    ipAddress,
    userAgent,
  };
  
  console.log('Generating admin notification email content');
  const subject = getAdminNotificationSubject();
  const html = getAdminNotificationHtml(props);
  const text = getAdminNotificationText(props);
  
  console.log(`Sending admin notification to: ${ADMIN_EMAIL}`);
  console.log('Admin email environment variables:', {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    ADMIN_EMAIL,
    WEBSITE_NAME,
    NODE_ENV,
    isProduction
  });
  
  // Add a backup email address to ensure delivery
  const recipients = ADMIN_EMAIL;
  // Uncomment and modify the line below to add a backup email address
  // const recipients = `${ADMIN_EMAIL}, your-backup-email@example.com`;
  
  return sendEmail(recipients, subject, html, text);
}

// Send user confirmation email
export async function sendUserConfirmation(
  name: string,
  email: string,
  message: string
): Promise<boolean> {
  console.log('sendUserConfirmation called with:', { name, email, messageLength: message.length });
  
  if (!email || email.trim() === '') {
    console.error('Cannot send user confirmation: email is empty');
    return false;
  }
  
  const submittedAt = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  
  const props = {
    name,
    email,
    message,
    submittedAt,
    websiteName: WEBSITE_NAME,
    contactEmail: ADMIN_EMAIL,
  };
  
  console.log('Generating user confirmation email content');
  const subject = getUserConfirmationSubject(WEBSITE_NAME);
  const html = getUserConfirmationHtml(props);
  const text = getUserConfirmationText(props);
  
  console.log(`Sending user confirmation to: ${email}`);
  return sendEmail(email, subject, html, text);
}

// Initialize the email system
export function initializeEmailSystem(): void {
  initializeTransporter();
  
  // Log initialization
  console.log(`Email system initialized in ${isProduction ? 'production' : 'development'} mode`);
  if (!isProduction) {
    console.log('Emails will be logged to console instead of being sent');
  }
}

// Initialize on import
initializeEmailSystem();

// Test email function to verify configuration
export async function testEmailConfiguration(): Promise<boolean> {
  if (!isProduction) {
    console.log('Email testing skipped in development mode');
    return true;
  }
  
  try {
    // Initialize transporter if not already done
    if (!transporter) {
      initializeTransporter();
    }
    
    console.log('Testing email configuration...');
    console.log(`SMTP Host: ${SMTP_HOST}`);
    console.log(`SMTP Port: ${SMTP_PORT}`);
    console.log(`SMTP User: ${SMTP_USER}`);
    console.log(`From Email: ${ADMIN_EMAIL}`);
    
    // Verify connection to SMTP server
    const connectionResult = await new Promise<boolean>((resolve) => {
      transporter.verify(function(error, _success) {
        if (error) {
          console.error('SMTP connection test failed:', error);
          resolve(false);
        } else {
          console.log('SMTP connection successful');
          resolve(true);
        }
      });
    });
    
    if (!connectionResult) {
      return false;
    }
    
    console.log('Email configuration test completed successfully');
    return true;
  } catch (error) {
    console.error('Error testing email configuration:', error);
    return false;
  }
}

// Run a test of the email configuration
if (isProduction) {
  testEmailConfiguration().then(success => {
    if (success) {
      console.log('Email system is properly configured');
    } else {
      console.error('Email system configuration test failed');
      console.log('Note: If you continue to have issues with ProtonMail SMTP:');
      console.log('1. Ensure ProtonMail Bridge is installed and running if sending from a desktop/server');
      console.log('2. Verify you\'re using an app-specific password, not your main account password');
      console.log('3. Check if your server allows outgoing connections on the SMTP port');
    }
  });
}