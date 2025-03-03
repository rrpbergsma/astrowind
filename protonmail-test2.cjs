// ProtonMail SMTP test with alternative configuration
const nodemailer = require('nodemailer');
require('dotenv').config();

// Get SMTP settings from environment variables
const {
  SMTP_USER,
  SMTP_PASS,
  ADMIN_EMAIL
} = process.env;

console.log('ProtonMail SMTP Test (Alternative Configuration)');
console.log('----------------------------------------------');
console.log(`SMTP User: ${SMTP_USER}`);
console.log(`Admin Email: ${ADMIN_EMAIL}`);

// Try alternative ProtonMail configuration
// ProtonMail Bridge typically uses localhost:1025 or localhost:1143
const transporterOptions = {
  host: 'mail.protonmail.ch',
  port: 443,
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false
  },
  logger: true,
  debug: true
};

console.log('\nUsing configuration:');
console.log(`Host: ${transporterOptions.host}`);
console.log(`Port: ${transporterOptions.port}`);
console.log(`Secure: ${transporterOptions.secure}`);

const transporter = nodemailer.createTransport(transporterOptions);

// Verify connection
console.log('\nTesting connection to ProtonMail SMTP server...');
transporter.verify(function(error, _success) {
  if (error) {
    console.error('Connection failed:', error);
    console.log('\nTrying alternative port (25)...');
    
    // Try port 25
    const transporter2 = nodemailer.createTransport({
      ...transporterOptions,
      port: 25,
      secure: false
    });
    
    transporter2.verify(function(error2, _success2) {
      if (error2) {
        console.error('Connection with port 25 also failed:', error2);
        
        console.log('\nImportant ProtonMail SMTP Notes:');
        console.log('1. ProtonMail requires the Bridge application for SMTP access from third-party apps');
        console.log('2. The Bridge runs locally and provides SMTP access via localhost:1025 or similar');
        console.log('3. You may need to install and configure ProtonMail Bridge on your server');
        console.log('4. Or use ProtonMail\'s API instead of SMTP for sending emails');
        
        process.exit(1);
      } else {
        console.log('Connection successful with port 25!');
        sendTestEmail(transporter2);
      }
    });
  } else {
    console.log('Server is ready to take our messages');
    sendTestEmail(transporter);
  }
});

function sendTestEmail(transport) {
  // Send test email
  console.log('\nSending test email...');
  transport.sendMail({
    from: SMTP_USER,
    to: ADMIN_EMAIL,
    subject: 'ProtonMail SMTP Test (Alternative Config)',
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