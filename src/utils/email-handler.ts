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
  ADMIN_EMAIL = '',
  WEBSITE_NAME = 'bergsma.it'
} = process.env;

// Email configuration
// Force production mode for testing
const isProduction = true; // NODE_ENV === 'production';

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
      })
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
  // Initialize transporter if not already done
  if (!transporter) {
    initializeTransporter();
  }
  
  try {
    // Ensure from address matches SMTP_USER for ProtonMail
    const fromAddress = isProduction ?
      `"${WEBSITE_NAME}" <${SMTP_USER}>` :
      `"${WEBSITE_NAME}" <${ADMIN_EMAIL}>`;
    
    const mailOptions = {
      from: fromAddress,
      to,
      subject,
      html,
      text,
    };
    
    await transporter.sendMail(mailOptions);
    
    
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
  
  const subject = getAdminNotificationSubject();
  const html = getAdminNotificationHtml(props);
  const text = getAdminNotificationText(props);
  
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
  
  const subject = getUserConfirmationSubject(WEBSITE_NAME);
  const html = getUserConfirmationHtml(props);
  const text = getUserConfirmationText(props);
  
  return sendEmail(email, subject, html, text);
}

// Initialize the email system
export function initializeEmailSystem(): void {
  initializeTransporter();
}

// Initialize on import
initializeEmailSystem();

// Test email function to verify configuration
export async function testEmailConfiguration(): Promise<boolean> {
  if (!isProduction) {
    return true;
  }
  
  try {
    // Initialize transporter if not already done
    if (!transporter) {
      initializeTransporter();
    }
    
    // Verify connection to SMTP server
    const connectionResult = await new Promise<boolean>((resolve) => {
      transporter.verify(function(error, _success) {
        if (error) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
    
    if (!connectionResult) {
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
}

// Run a test of the email configuration
if (isProduction) {
  testEmailConfiguration();
}