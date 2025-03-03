/**
 * Email Delivery Test Script
 * 
 * This script tests email delivery by sending test emails to different addresses
 * and with different configurations to help diagnose delivery issues.
 */

const nodemailer = require('nodemailer');
require('dotenv').config();

// Environment variables
const {
  SMTP_HOST = 'smtp.protonmail.ch',
  SMTP_PORT = '587',
  SMTP_USER = '',
  SMTP_PASS = '',
  ADMIN_EMAIL = 'richard@bergsma.it',
  WEBSITE_NAME = 'bergsma.it',
  NODE_ENV = 'development'
} = process.env;

// Set to production mode for this test
const isProduction = true;

console.log('Email Delivery Test');
console.log('------------------');
console.log('Configuration:');
console.log(`SMTP Host: ${SMTP_HOST}`);
console.log(`SMTP Port: ${SMTP_PORT}`);
console.log(`SMTP User: ${SMTP_USER}`);
console.log(`Admin Email: ${ADMIN_EMAIL}`);
console.log(`Website Name: ${WEBSITE_NAME}`);
console.log(`Mode: ${isProduction ? 'production' : 'development'}`);
console.log('------------------');

// Create a transporter
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: parseInt(SMTP_PORT, 10),
  secure: parseInt(SMTP_PORT, 10) === 465,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
    ciphers: 'SSLv3'
  },
  debug: true
});

// Verify connection
console.log('Testing SMTP connection...');
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP Connection Error:', error);
    process.exit(1);
  }
  
  console.log('SMTP Connection Successful!');
  runTests();
});

// Run a series of email delivery tests
async function runTests() {
  try {
    // Test 1: Basic email to admin
    console.log('\nTest 1: Sending basic email to admin...');
    await sendTestEmail(
      ADMIN_EMAIL,
      'Email Delivery Test 1 - Basic',
      'This is a basic test email to the admin address.',
      `<p>This is a basic test email to the admin address.</p><p>Time: ${new Date().toISOString()}</p>`
    );
    
    // Test 2: Email with different From address
    console.log('\nTest 2: Sending email with different From address...');
    await sendTestEmail(
      ADMIN_EMAIL,
      'Email Delivery Test 2 - Different From',
      'This email uses a different From address.',
      `<p>This email uses a different From address.</p><p>Time: ${new Date().toISOString()}</p>`,
      `"Test Sender" <${SMTP_USER}>`
    );
    
    // Test 3: Email with contact form format
    console.log('\nTest 3: Sending email in contact form format...');
    const contactFormHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee;">
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> Test User (test@example.com)</p>
        <p><strong>Submitted on:</strong> ${new Date().toLocaleString()}</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-left: 3px solid #007bff; margin: 15px 0;">
          <p><strong>Message:</strong></p>
          <p>This is a test message simulating a contact form submission.</p>
        </div>
        <div style="font-size: 12px; color: #777; margin-top: 20px; padding-top: 10px; border-top: 1px solid #eee;">
          <p>This is an automated email from your website contact form.</p>
        </div>
      </div>
    `;
    await sendTestEmail(
      ADMIN_EMAIL,
      'New Contact Form Submission (Test)',
      'This is a test message simulating a contact form submission.',
      contactFormHtml
    );
    
    console.log('\nAll tests completed successfully!');
    console.log('\nPlease check your inbox (and spam folder) for the test emails.');
    console.log('If you received some emails but not others, this can help identify the issue.');
    
  } catch (error) {
    console.error('Error running tests:', error);
  }
}

// Helper function to send a test email
async function sendTestEmail(to, subject, text, html, from = `"${WEBSITE_NAME}" <${ADMIN_EMAIL}>`) {
  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html
    });
    
    console.log(`Email sent successfully!`);
    console.log(`Message ID: ${info.messageId}`);
    console.log(`Response: ${info.response}`);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}