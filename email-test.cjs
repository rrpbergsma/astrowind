/**
 * ProtonMail SMTP Test Script
 * 
 * This script tests the SMTP configuration for sending emails through ProtonMail.
 * Run with: node email-test.cjs
 */

const nodemailer = require('nodemailer');
require('dotenv').config();

// Get SMTP settings from environment variables
const {
  SMTP_HOST = 'smtp.protonmail.ch',
  SMTP_PORT = '587',
  SMTP_USER,
  SMTP_PASS,
  ADMIN_EMAIL,
  WEBSITE_NAME = 'Website'
} = process.env;

console.log('Email Configuration Test');
console.log('----------------------');
console.log(`SMTP Host: ${SMTP_HOST}`);
console.log(`SMTP Port: ${SMTP_PORT}`);
console.log(`SMTP User: ${SMTP_USER}`);
console.log(`Admin Email: ${ADMIN_EMAIL}`);
console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
console.log('----------------------');

// Create a transporter with ProtonMail-specific settings
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: parseInt(SMTP_PORT, 10),
  secure: parseInt(SMTP_PORT, 10) === 465, // true for 465, false for other ports
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  tls: {
    // Do not fail on invalid certs
    rejectUnauthorized: false,
    // Specific ciphers for ProtonMail
    ciphers: 'SSLv3'
  },
  debug: true // Enable debug output
});

// Test the connection
console.log('Testing SMTP connection...');
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP Connection Error:', error);
    console.error('\nTroubleshooting Tips:');
    console.error('1. Check if your SMTP credentials are correct');
    console.error('2. For ProtonMail, ensure you\'re using an app-specific password');
    console.error('3. If using ProtonMail Bridge, make sure it\'s running');
    console.error('4. Verify your server allows outgoing connections on the SMTP port');
    process.exit(1);
  } else {
    console.log('SMTP Connection Successful!');
    
    // Send a test email
    console.log('\nSending a test email...');
    const mailOptions = {
      from: `"${WEBSITE_NAME}" <${SMTP_USER}>`,
      to: ADMIN_EMAIL,
      subject: 'Email Configuration Test',
      text: 'This is a test email to verify your website\'s email configuration is working correctly.',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #333;">Email Configuration Test</h2>
          <p>This is a test email to verify your website's email configuration is working correctly.</p>
          <p><strong>Configuration Details:</strong></p>
          <ul>
            <li>SMTP Host: ${SMTP_HOST}</li>
            <li>SMTP Port: ${SMTP_PORT}</li>
            <li>From: ${SMTP_USER}</li>
            <li>To: ${ADMIN_EMAIL}</li>
            <li>Time: ${new Date().toISOString()}</li>
          </ul>
          <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
            This is an automated test email. If you received this, your email configuration is working correctly.
          </p>
        </div>
      `
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending test email:', error);
        process.exit(1);
      } else {
        console.log('Test email sent successfully!');
        console.log('Message ID:', info.messageId);
        console.log('Response:', info.response);
        console.log('\nIf you received the test email, your email configuration is working correctly.');
        process.exit(0);
      }
    });
  }
});