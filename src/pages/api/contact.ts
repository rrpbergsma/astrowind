import type { APIRoute } from 'astro';
import {
  generateCsrfToken,
  validateCsrfToken,
  checkRateLimit,
  sendAdminNotification,
  sendUserConfirmation
} from '../../utils/email-handler';

// Enhanced email validation with more comprehensive regex
const isValidEmail = (email: string): boolean => {
  // Simpler regex to avoid escape character issues
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Enhanced spam protection - check for common spam patterns and characteristics
const isSpam = (content: string, name: string, email: string): boolean => {
  // Convert to lowercase for case-insensitive matching
  const lowerContent = content.toLowerCase();
  const lowerName = name.toLowerCase();
  const lowerEmail = email.toLowerCase();
  
  // Common spam keywords
  const spamPatterns = [
    'viagra', 'cialis', 'casino', 'lottery', 'prize', 'winner',
    'free money', 'buy now', 'click here', 'earn money', 'make money',
    'investment opportunity', 'bitcoin', 'cryptocurrency', 'forex',
    'weight loss', 'diet pill', 'enlargement', 'cheap medication'
  ];
  
  // Check for spam keywords in content
  if (spamPatterns.some(pattern => lowerContent.includes(pattern))) {
    return true;
  }
  
  // Check for spam keywords in name or email
  if (spamPatterns.some(pattern => lowerName.includes(pattern) || lowerEmail.includes(pattern))) {
    return true;
  }
  
  // Check for excessive capitalization (shouting)
  const uppercaseRatio = (content.match(/[A-Z]/g) || []).length / content.length;
  if (uppercaseRatio > 0.5 && content.length > 20) {
    return true;
  }
  
  // Check for excessive special characters
  const specialChars = "!@#$%^&*()_+-=[]{}\\|;:'\",.<>/?";
  let specialCharCount = 0;
  
  for (let i = 0; i < content.length; i++) {
    if (specialChars.includes(content[i])) {
      specialCharCount++;
    }
  }
  
  const specialCharRatio = specialCharCount / content.length;
  if (specialCharRatio > 0.3 && content.length > 20) {
    return true;
  }
  
  // Check for excessive URLs - count http:// and https:// occurrences
  const urlCount = content.split('http').length - 1;
  if (urlCount > 2) {
    return true;
  }
  
  return false;
};

// GET handler for CSRF token generation and API testing
export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const csrfRequested = url.searchParams.get('csrf') === 'true';
  
  if (csrfRequested) {
    // Generate and return a CSRF token
    const csrfToken = generateCsrfToken();
    
    return new Response(
      JSON.stringify({
        csrfToken
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
  
  // Default response for GET requests
  return new Response(
    JSON.stringify({
      message: 'Contact API endpoint is working. Please use POST to submit the form.'
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    console.log('Contact form submission received');
    
    // Get client IP address for rate limiting
    const ipAddress = clientAddress || '0.0.0.0';
    console.log('Client IP:', ipAddress);
    
    // Check rate limit
    const rateLimitCheck = await checkRateLimit(ipAddress);
    console.log('Rate limit check:', rateLimitCheck);
    
    if (rateLimitCheck.limited) {
      console.log('Rate limit exceeded');
      return new Response(
        JSON.stringify({
          success: false,
          errors: {
            rateLimit: rateLimitCheck.message
          }
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '3600'
          }
        }
      );
    }
    
    // Get form data
    const formData = await request.formData();
    console.log('Form data received');
    
    // Log all form data keys
    console.log('Form data keys:', [...formData.keys()]);
    
    const name = formData.get('name')?.toString() || '';
    const email = formData.get('email')?.toString() || '';
    const message = formData.get('message')?.toString() || '';
    const disclaimer = formData.get('disclaimer')?.toString() === 'on';
    const csrfToken = formData.get('csrf_token')?.toString() || '';
    
    console.log('Form data values:', { name, email, messageLength: message.length, disclaimer, csrfToken: csrfToken ? 'present' : 'missing' });
    
    // Get user agent for logging and spam detection
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    
    // Validate form data
    const errors: Record<string, string> = {};
    
    // Validate CSRF token
    if (!validateCsrfToken(csrfToken)) {
      errors.csrf = 'Invalid or expired security token. Please refresh the page and try again.';
    }
    
    if (!name) {
      errors.name = 'Please enter your name';
    } else if (name.length < 2) {
      errors.name = 'Your name must be at least 2 characters long';
    }
    
    if (!email) {
      errors.email = 'Please enter your email address';
    } else if (!isValidEmail(email)) {
      errors.email = 'Please enter a valid email address (e.g., name@example.com)';
    }
    
    if (!message) {
      errors.message = 'Please enter your message';
    } else if (message.length < 10) {
      errors.message = 'Your message must be at least 10 characters long';
    }
    
    if (!disclaimer) {
      errors.disclaimer = 'Please check the required consent box before submitting';
    }
    
    // Check for spam
    if (isSpam(message, name, email)) {
      errors.spam = 'Your message was flagged as potential spam. Please revise your message and try again.';
    }
    
    // If there are validation errors, return them
    if (Object.keys(errors).length > 0) {
      return new Response(
        JSON.stringify({
          success: false,
          errors
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // Send emails
    console.log('Attempting to send admin notification email');
    const adminEmailSent = await sendAdminNotification(name, email, message, ipAddress, userAgent);
    console.log('Admin email sent result:', adminEmailSent);
    
    console.log('Attempting to send user confirmation email');
    const userEmailSent = await sendUserConfirmation(name, email, message);
    console.log('User email sent result:', userEmailSent);
    
    // Check if emails were sent successfully
    if (!adminEmailSent || !userEmailSent) {
      console.error('Failed to send one or more emails:', { adminEmailSent, userEmailSent });
      
      return new Response(
        JSON.stringify({
          success: false,
          message: 'There was an issue sending your message. Please try again later.'
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Your message has been sent successfully. We will get back to you soon!'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: 'An error occurred while processing your request. Please try again later.'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};