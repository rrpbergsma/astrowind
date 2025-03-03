/**
 * Test script for the contact form API
 * This script simulates a form submission to the contact form API
 */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const FormData = require('form-data');
require('dotenv').config();

// URL of the contact form API
const API_URL = 'http://localhost:4321/api/contact';

// Function to get a CSRF token
async function getCsrfToken() {
  try {
    console.log(`Fetching CSRF token from ${API_URL}?csrf=true`);
    const response = await fetch(`${API_URL}?csrf=true`);
    console.log('CSRF response status:', response.status);
    
    if (!response.ok) {
      console.error('CSRF request failed:', response.statusText);
      return null;
    }
    
    const text = await response.text();
    console.log('CSRF response text:', text);
    
    try {
      const data = JSON.parse(text);
      console.log('CSRF token data:', data);
      return data.csrfToken;
    } catch (parseError) {
      console.error('Error parsing CSRF response:', parseError);
      console.error('Response was not valid JSON:', text);
      return null;
    }
  } catch (error) {
    console.error('Error getting CSRF token:', error);
    return null;
  }
}

// Function to submit the form
async function submitForm(csrfToken) {
  console.log('Creating form data for submission');
  
  // Create form data
  const formData = new FormData();
  const testEmail = process.env.ADMIN_EMAIL || 'richard@bergsma.it';
  const testMessage = 'This is a test message from the test-contact-form.cjs script. ' + new Date().toISOString();
  
  formData.append('name', 'Test User');
  formData.append('email', testEmail);
  formData.append('message', testMessage);
  formData.append('disclaimer', 'on');
  formData.append('csrf_token', csrfToken);
  formData.append('timestamp', Date.now().toString());

  console.log('Submitting form with data:', {
    name: 'Test User',
    email: testEmail,
    messageLength: testMessage.length,
    disclaimer: 'on',
    csrfToken: csrfToken ? 'present' : 'missing',
  });

  try {
    console.log(`Sending POST request to ${API_URL}`);
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'test-contact-form-script'
      }
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      console.error('Form submission failed with status:', response.status, response.statusText);
    }
    
    const text = await response.text();
    console.log('Response text:', text);
    
    try {
      const result = JSON.parse(text);
      console.log('Form submission result:', result);
      return result;
    } catch (parseError) {
      console.error('Error parsing response:', parseError);
      console.error('Response was not valid JSON:', text);
      return { success: false, error: 'Invalid JSON response' };
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    return { success: false, error: error.message };
  }
}

// Main function
async function main() {
  console.log('Starting contact form test...');
  console.log(`API URL: ${API_URL}`);

  // Get CSRF token
  console.log('Getting CSRF token...');
  const csrfToken = await getCsrfToken();
  
  if (!csrfToken) {
    console.error('Failed to get CSRF token. Aborting test.');
    process.exit(1);
  }
  
  console.log('CSRF token received:', csrfToken ? 'Yes' : 'No');

  // Submit the form
  console.log('Submitting form...');
  const result = await submitForm(csrfToken);
  
  if (result.success) {
    console.log('Form submission successful!');
  } else {
    console.error('Form submission failed:', result);
  }
}

// Run the test
main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});