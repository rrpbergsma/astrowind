# Netlify Forms Setup Guide

This document explains how the contact form has been configured to work with Netlify's built-in form handling service.

## Changes Made

1. **Form Component Modifications**
   - Added `data-netlify="true"` attribute to enable Netlify Forms
   - Added `name="contact"` attribute to identify the form
   - Added a honeypot field with `data-netlify-honeypot="bot-field"` to prevent spam
   - Added a hidden input with the form name for Netlify to process the form correctly

2. **Form Handling Script Updates**
   - Removed CSRF token generation and validation (not needed with Netlify Forms)
   - Updated form submission to use Netlify's form handling endpoint
   - Simplified error handling and success messaging

3. **Netlify Configuration**
   - Updated `netlify.toml` to explicitly enable form processing

## Configuring Form Notifications in Netlify

After deploying your site, follow these steps to set up email notifications for form submissions:

1. **Access Form Settings**
   - Log in to your Netlify dashboard
   - Select your site
   - Go to **Site settings** > **Forms**

2. **Verify Form Detection**
   - You should see your "contact" form listed
   - If not, check your deployment logs for any issues

3. **Set Up Form Notifications**
   - Click on your form name
   - Go to the **Outgoing notifications** tab
   - Click **Add notification** and select **Email notification**
   - Configure the email address where you want to receive form submissions
   - Customize the subject line and other settings as needed

4. **Test the Form**
   - Visit your live site
   - Submit a test message through the contact form
   - Verify you receive the notification email

## Troubleshooting

If your form isn't working properly:

1. **Check Form Detection**
   - Ensure your form was detected during deployment
   - Look for "Processing forms from HTML" in your deploy logs

2. **Verify Form Markup**
   - Ensure the form has `data-netlify="true"`
   - Confirm the hidden input field has `name="form-name"` with the correct form name

3. **Check for JavaScript Errors**
   - Open your browser's developer console
   - Look for any errors during form submission

4. **Review Spam Filtering**
   - Check if submissions are being marked as spam
   - Adjust spam filtering settings in Netlify if needed

## Additional Resources

- [Netlify Forms Documentation](https://docs.netlify.com/forms/setup/)
- [Form Notifications](https://docs.netlify.com/forms/notifications/)
- [Spam Filtering](https://docs.netlify.com/forms/spam-filters/)