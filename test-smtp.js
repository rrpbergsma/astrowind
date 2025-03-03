const nodemailer = require('nodemailer');
require('dotenv').config();

// Get SMTP settings from environment variables
const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  ADMIN_EMAIL,
  WEBSITE_NAME
} = process.env;

console.log('SMTP Configuration Test');
console.log('----------------------');
console.log(`SMTP Host: ${SMTP_HOST}`);
console.log(`SMTP Port: ${SMTP_PORT}`);
console.log(`SMTP User: ${SMTP_USER}`);
console.log(`Admin Email: ${ADMIN_EMAIL}`);
console.log(`Website Name: ${WEBSITE_NAME}`);
console.log('----------------------');

// Create a transporter
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: parseInt(SMTP_PORT, 10),
  secure: parseInt(SMTP_PORT, 10) === 465,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  // Required for ProtonMail
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false
  },
  debug: true, // Enable debug output
});

// Test the connection
console.log('Testing SMTP connection...');
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP Connection Error:', error);
    console.error('Error Name:', error.name);
    console.error('Error Message:', error.message);
    
    // Provide troubleshooting advice based on error
    if (error.message.includes('ECONNREFUSED')) {
      console.error('\nTroubleshooting: Connection refused');
      console.error('- Check if the SMTP server address is correct');
      console.error('- Verify the port is correct and not blocked by a firewall');
      console.error('- Ensure your internet connection is working');
    } else if (error.message.includes('Invalid login') || error.message.includes('authentication failed')) {
      console.error('\nTroubleshooting: Authentication failed');
      console.error('- Verify your username and password are correct');
      console.error('- For ProtonMail, ensure you\'re using an app-specific password');
      console.error('- Check if 2FA is enabled and properly configured');
    } else if (error.message.includes('certificate')) {
      console.error('\nTroubleshooting: SSL/TLS Certificate Error');
      console.error('- The server\'s SSL certificate could not be verified');
      console.error('- This might be resolved by setting rejectUnauthorized: false (already set)');
    }
  } else {
    console.log('SMTP Connection Successful!');
    console.log('The server is ready to accept messages');
    
    // Send a test email
    console.log('\nSending a test email...');
    const mailOptions = {
      from: `"${WEBSITE_NAME}" <${ADMIN_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: 'SMTP Test Email',
      text: 'This is a test email to verify SMTP configuration is working correctly.',
      html: '<p>This is a test email to verify SMTP configuration is working correctly.</p>'
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending test email:', error);
      } else {
        console.log('Test email sent successfully!');
        console.log('Message ID:', info.messageId);
        console.log('Response:', info.response);
      }
    });
  }
});