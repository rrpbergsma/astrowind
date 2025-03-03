import { testEmailConfiguration, sendAdminNotification } from './src/utils/email-handler.js';
import 'dotenv/config';

async function runEmailTest() {
  console.log('Starting email configuration test...');
  
  // Test the SMTP connection
  const configTest = await testEmailConfiguration();
  console.log(`Configuration test result: ${configTest ? 'SUCCESS' : 'FAILED'}`);
  
  if (configTest) {
    // Try sending a test email
    console.log('Attempting to send a test email...');
    const emailResult = await sendAdminNotification(
      'Test User',
      'test@example.com',
      'This is a test message sent at ' + new Date().toISOString(),
      '127.0.0.1',
      'Email Test Script'
    );
    
    console.log(`Test email result: ${emailResult ? 'SENT' : 'FAILED'}`);
  }
  
  console.log('Email test completed');
}

runEmailTest().catch(error => {
  console.error('Error running email test:', error);
  process.exit(1);
});