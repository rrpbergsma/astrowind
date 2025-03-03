interface AdminNotificationProps {
  name: string;
  email: string;
  message: string;
  submittedAt: string;
  ipAddress?: string;
  userAgent?: string;
}

export function getAdminNotificationSubject(): string {
  return 'New Contact Form Submission from bergsma.it';
}

export function getAdminNotificationHtml(props: AdminNotificationProps): string {
  const { name, email, message, submittedAt, ipAddress, userAgent } = props;
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: #f5f5f5;
      padding: 15px;
      border-radius: 5px;
      margin-bottom: 20px;
    }
    .content {
      background-color: #ffffff;
      padding: 15px;
      border-radius: 5px;
      border: 1px solid #e0e0e0;
    }
    .message-box {
      background-color: #f9f9f9;
      padding: 15px;
      border-radius: 5px;
      border-left: 3px solid #007bff;
      margin: 15px 0;
    }
    .footer {
      font-size: 12px;
      color: #777;
      margin-top: 20px;
      padding-top: 10px;
      border-top: 1px solid #e0e0e0;
    }
    .meta {
      font-size: 12px;
      color: #777;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h2>New Contact Form Submission</h2>
  </div>
  <div class="content">
    <p><strong>From:</strong> ${name} (${email})</p>
    <p><strong>Submitted on:</strong> ${submittedAt}</p>
    
    <div class="message-box">
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    </div>
    
    <div class="meta">
      <p><strong>Additional Information:</strong></p>
      <p>IP Address: ${ipAddress || 'Not available'}</p>
      <p>User Agent: ${userAgent || 'Not available'}</p>
    </div>
  </div>
  <div class="footer">
    <p>This is an automated email from your website contact form.</p>
  </div>
</body>
</html>
  `;
}

export function getAdminNotificationText(props: AdminNotificationProps): string {
  const { name, email, message, submittedAt, ipAddress, userAgent } = props;
  
  return `
New Contact Form Submission

From: ${name} (${email})
Submitted on: ${submittedAt}

Message:
${message}

Additional Information:
IP Address: ${ipAddress || 'Not available'}
User Agent: ${userAgent || 'Not available'}

This is an automated email from your website contact form.
  `;
}