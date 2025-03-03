// Simple ProtonMail SMTP test
const nodemailer = require('nodemailer');
require('dotenv').config();

// Get SMTP settings from environment variables
const {
  SMTP_HOST = 'smtp.protonmail.ch',
  SMTP_PORT = '587',
  SMTP_USER,
  SMTP_PASS,
  ADMIN_EMAIL
} = process.env;

console.log('ProtonMail SMTP Test');
console.log('-------------------');
console.log(`SMTP Host: ${SMTP_HOST}`);
console.log(`SMTP Port: ${SMTP_PORT}`);
console.log(`SMTP User: ${SMTP_USER}`);
console.log(`Admin Email: ${ADMIN_EMAIL}`);

// ProtonMail specific configuration
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: parseInt(SMTP_PORT, 10),
  secure: false, // For ProtonMail, use false for port 587
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
  logger: true,
  debug: true // Include SMTP traffic in the logs
});

// Verify connection
console.log('\nTesting connection to ProtonMail SMTP server...');
transporter.verify(function(error, _success) {
  if (error) {
    console.error('Connection failed:', error);
    process.exit(1);
  } else {
    console.log('Server is ready to take our messages');
    
    // Send test email
    console.log('\nSending test email...');
    transporter.sendMail({
      from: SMTP_USER,
      to: ADMIN_EMAIL,
      subject: 'ProtonMail SMTP Test',
      text: 'This is a test email from your website contact form.',
      html: '<p>This is a test email from your website contact form.</p>'
    }, (err, info) => {
      if (err) {
        console.error('Error sending email:', err);
        process.exit(1);
      } else {
        console.log('Message sent successfully!');
        console.log('Message ID:', info.messageId);
        console.log('Response:', info.response);
        process.exit(0);
      }
    });
  }
});