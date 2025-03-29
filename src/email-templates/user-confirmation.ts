interface UserConfirmationProps {
  name: string;
  email: string;
  message: string;
  submittedAt: string;
  websiteName?: string;
  contactEmail?: string;
}

export function getUserConfirmationSubject(websiteName: string = process.env.WEBSITE_NAME || '365devnet.eu'): string {
  return `Thank you for contacting ${websiteName}`;
}

export function getUserConfirmationHtml(props: UserConfirmationProps): string {
  const {
    name,
    message,
    submittedAt,
    websiteName = process.env.WEBSITE_NAME || '365devnet.eu',
    contactEmail = process.env.ADMIN_EMAIL || 'richard@bergsma.it',
  } = props;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank you for contacting us</title>
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
      border-left: 3px solid #28a745;
      margin: 15px 0;
    }
    .footer {
      font-size: 12px;
      color: #777;
      margin-top: 20px;
      padding-top: 10px;
      border-top: 1px solid #e0e0e0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h2>Thank you for contacting ${websiteName}</h2>
  </div>
  <div class="content">
    <p>Dear ${name},</p>
    
    <p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p>
    
    <div class="message-box">
      <p><strong>Your message (submitted on ${submittedAt}):</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    </div>
    
    <p>If you have any additional questions or information to provide, please feel free to reply to this email.</p>
    
    <p>Best regards,<br>
    The ${websiteName} Team</p>
  </div>
  <div class="footer">
    <p>If you did not submit this contact form, please disregard this email or contact us at ${contactEmail}.</p>
  </div>
</body>
</html>
  `;
}

export function getUserConfirmationText(props: UserConfirmationProps): string {
  const {
    name,
    message,
    submittedAt,
    websiteName = process.env.WEBSITE_NAME || '365devnet.eu',
    contactEmail = process.env.ADMIN_EMAIL || 'richard@bergsma.it',
  } = props;

  return `
Thank you for contacting ${websiteName}

Dear ${name},

Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.

Your message (submitted on ${submittedAt}):
${message}

If you have any additional questions or information to provide, please feel free to reply to this email.

Best regards,
The ${websiteName} Team

If you did not submit this contact form, please disregard this email or contact us at ${contactEmail}.
  `;
}
