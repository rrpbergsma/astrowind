# Email Handling System

This directory contains the email templates and utilities for the contact form email handling system.

## Features

- **Secure SMTP Authentication**: Uses environment variables for credentials
- **Email Templates**: Customizable templates for both user confirmation and admin notification emails
- **Rate Limiting**: Prevents abuse by limiting the number of submissions per IP address
- **CSRF Protection**: Prevents cross-site request forgery attacks
- **Email Validation**: Ensures valid email addresses are provided
- **Spam Prevention**: Multiple checks to detect and block spam submissions
- **Error Handling**: Proper error handling with client feedback
- **Logging**: Comprehensive logging of email sending attempts

## Configuration

The email system is configured using environment variables in the `.env` file:

```
# SMTP Configuration
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-password

# Email Settings
ADMIN_EMAIL=admin@example.com
WEBSITE_NAME=Your Website Name

# Environment
NODE_ENV=development
```

In development mode, emails are logged to the console instead of being sent. Set `NODE_ENV=production` to send actual emails.

## Files

- `admin-notification.ts`: Template for emails sent to the admin
- `user-confirmation.ts`: Template for confirmation emails sent to users
- `../utils/email-handler.ts`: Core email handling functionality

## How It Works

1. When a user submits the contact form, the client-side JavaScript validates the form and sends it to the `/api/contact` endpoint.
2. The endpoint validates the form data, checks for CSRF token validity, and performs rate limiting and spam detection.
3. If all checks pass, two emails are sent:
   - A notification email to the admin with the form data
   - A confirmation email to the user acknowledging receipt of their message
4. The system logs all email sending attempts for monitoring and debugging.

## Development vs. Production

- In development mode (`NODE_ENV=development`), emails are logged to the console instead of being sent.
- In production mode (`NODE_ENV=production`), emails are sent using the configured SMTP server.

## Security Considerations

- SMTP credentials are stored in environment variables, not in the code
- CSRF tokens are used to prevent cross-site request forgery
- Rate limiting prevents abuse of the contact form
- Form data is validated both on the client and server side
- Spam detection helps prevent unwanted messages

## Testing

To test the email system:

1. Configure the `.env` file with your SMTP settings
2. Submit the contact form on the website
3. Check the logs for email sending attempts
4. In production mode, check your inbox for the actual emails