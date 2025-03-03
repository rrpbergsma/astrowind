/**
 * Production Email Test Script
 * 
 * This script tests email delivery in production mode by sending test emails
 * with various configurations to help diagnose delivery issues.
 * 
 * Run with: NODE_ENV=production node production-email-test.cjs
 */

const nodemailer = require('nodemailer');
require('dotenv').config();

// Environment variables
const {
  SMTP_HOST = '',
  SMTP_PORT = '587',
  SMTP_USER = '',
  SMTP_PASS = '',
  ADMIN_EMAIL = 'richard@bergsma.it',
  WEBSITE_NAME = 'bergsma.it',
  NODE_ENV = 'production'
} = process.env;

// Force production mode
const isProduction = true;

console.log('Production Email Test');
console.log('--------------------');
console.log('Configuration:');
console.log(`SMTP Host: ${SMTP_HOST}`);
console.log(`SMTP Port: ${SMTP_PORT}`);
console.log(`SMTP User: ${SMTP_USER}`);
console.log(`Admin Email: ${ADMIN_EMAIL}`);
console.log(`Website Name: ${WEBSITE_NAME}`);
console.log(`Mode: ${isProduction ? 'production' : 'development'}`);
console.log('--------------------');

// Create a transporter
function createTransporter(options = {}) {
  const isProtonMail = SMTP_HOST.includes('protonmail');
  
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT, 10),
    secure: parseInt(SMTP_PORT, 10) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    ...(isProtonMail && {
      tls: {
        rejectUnauthorized: false,
        ciphers: 'SSLv3'
      }
    }),
    debug: true,
    ...options
  });
}

// Test different transporter configurations
async function runTests() {
  try {
    // Test 1: Basic configuration
    console.log('\nTest 1: Basic configuration');
    const transporter1 = createTransporter();
    await testTransporter(transporter1, 'Basic configuration');
    
    // Test 2: With secure=false explicitly set
    console.log('\nTest 2: With secure=false explicitly set');
    const transporter2 = createTransporter({ secure: false });
    await testTransporter(transporter2, 'secure=false configuration');
    
    // Test 3: With requireTLS=true
    console.log('\nTest 3: With requireTLS=true');
    const transporter3 = createTransporter({ requireTLS: true });
    await testTransporter(transporter3, 'requireTLS=true configuration');
    
    // Test 4: With different from address
    console.log('\nTest 4: With different from address');
    const transporter4 = createTransporter();
    await testTransporter(
      transporter4, 
      'Different from address', 
      { from: `"Test" <${SMTP_USER}>` }
    );
    
    console.log('\nAll tests completed!');
    
  } catch (error) {
    console.error('Error running tests:', error);
  }
}

// Test a specific transporter configuration
async function testTransporter(transporter, testName, options = {}) {
  console.log(`Testing ${testName}...`);
  
  try {
    // Verify connection
    await new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          console.error(`Connection test failed for ${testName}:`, error);
          reject(error);
        } else {
          console.log(`Connection successful for ${testName}`);
          resolve(success);
        }
      });
    });
    
    // Send test email
    const fromAddress = options.from || `"${WEBSITE_NAME}" <${SMTP_USER}>`;
    
    const info = await transporter.sendMail({
      from: fromAddress,
      to: ADMIN_EMAIL,
      subject: `Production Email Test: ${testName}`,
      text: `This is a test email from the production-email-test.cjs script using ${testName}.\n\nTime: ${new Date().toISOString()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee;">
          <h2>Production Email Test: ${testName}</h2>
          <p>This is a test email from the production-email-test.cjs script using ${testName}.</p>
          <p>Time: ${new Date().toISOString()}</p>
          <p>Configuration:</p>
          <ul>
            <li>SMTP Host: ${SMTP_HOST}</li>
            <li>SMTP Port: ${SMTP_PORT}</li>
            <li>From: ${fromAddress}</li>
            <li>To: ${ADMIN_EMAIL}</li>
          </ul>
        </div>
      `
    });
    
    console.log(`Email sent successfully for ${testName}!`);
    console.log(`Message ID: ${info.messageId}`);
    console.log(`Response: ${info.response}`);
    
    return info;
  } catch (error) {
    console.error(`Error in ${testName}:`, error);
    throw error;
  }
}

// Run the tests
runTests().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});