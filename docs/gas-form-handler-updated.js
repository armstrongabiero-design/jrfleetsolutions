/**
 * JR Fleet Solutions - Enhanced Form Submission Handler
 * Google Apps Script for handling both demo requests and support forms
 * 
 * Setup Instructions:
 * 1. Create a new Google Sheet
 * 2. Tools > Script editor
 * 3. Paste this code
 * 4. Update ADMIN_EMAILS array with your admin email addresses
 * 5. Deploy as Web App (Anyone can access)
 * 6. Copy deployment URL to frontend (both main.js and support.js)
 */

// Configuration
const ADMIN_EMAILS = [
  'deforexsp@gmail.com',
  'armstrongabiero@gmail.com'
];
const COMPANY_NAME = 'JR Fleet Solutions';
const COMPANY_WEBSITE = 'https://jrfleetsolutions.com';
const DEMO_SHEET_NAME = 'Demo Requests';
const SUPPORT_SHEET_NAME = 'Support Requests';

/**
 * Handle POST requests from the forms
 */
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Log for debugging
    Logger.log('Received data: ' + JSON.stringify(data));
    
    // Determine form type
    const formType = data.formType || 'demo'; // default to demo for backward compatibility
    
    if (formType === 'support') {
      return handleSupportRequest(data);
    } else {
      return handleDemoRequest(data);
    }
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'An error occurred: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (for CORS preflight)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'active',
      service: 'JR Fleet Solutions Form Handler'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handle demo request submissions
 */
function handleDemoRequest(data) {
  // Validate required fields
  if (!data.name || !data.email || !data.company) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Missing required fields'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  // Log to Google Sheet
  logDemoRequest(data);
  
  // Send confirmation email to user
  sendDemoUserConfirmation(data);
  
  // Send notification to admin
  sendDemoAdminNotification(data);
  
  // Return success response
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: 'Demo request submitted successfully'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handle support request submissions
 */
function handleSupportRequest(data) {
  // Validate required fields
  if (!data.issue || !data.name || !data.email || !data.message) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Missing required fields'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  // Log to Google Sheet
  logSupportRequest(data);
  
  // Send confirmation email to user
  sendSupportUserConfirmation(data);
  
  // Send notification to admin
  sendSupportAdminNotification(data);
  
  // Return success response
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: 'Support request submitted successfully'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Log demo request to Google Sheet
 */
function logDemoRequest(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(DEMO_SHEET_NAME);
  
  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(DEMO_SHEET_NAME);
    // Add headers
    sheet.appendRow([
      'Timestamp',
      'Name',
      'Email',
      'Company',
      'Phone',
      'Fleet Size',
      'Message',
      'Status'
    ]);
    
    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, 8);
    headerRange.setBackground('#D4AF37');
    headerRange.setFontColor('#0A0A0A');
    headerRange.setFontWeight('bold');
    headerRange.setHorizontalAlignment('center');
  }
  
  // Add the data
  sheet.appendRow([
    new Date(),
    data.name || '',
    data.email || '',
    data.company || '',
    data.phone || '',
    data.fleetSize || '',
    data.message || '',
    'New'
  ]);
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, 8);
}

/**
 * Log support request to Google Sheet
 */
function logSupportRequest(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SUPPORT_SHEET_NAME);
  
  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(SUPPORT_SHEET_NAME);
    // Add headers
    sheet.appendRow([
      'Timestamp',
      'Issue Type',
      'Name',
      'Email',
      'Phone',
      'Message',
      'Status'
    ]);
    
    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, 7);
    headerRange.setBackground('#D4AF37');
    headerRange.setFontColor('#0A0A0A');
    headerRange.setFontWeight('bold');
    headerRange.setHorizontalAlignment('center');
  }
  
  // Add the data
  sheet.appendRow([
    new Date(),
    data.issue || '',
    data.name || '',
    data.email || '',
    data.phone || '',
    data.message || '',
    'New'
  ]);
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, 7);
}

/**
 * Send confirmation email to user for demo request
 */
function sendDemoUserConfirmation(data) {
  const subject = 'Thank You for Your Demo Request - JR Fleet Solutions';
  
  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica', 'Arial', sans-serif;
          line-height: 1.6;
          color: #0A0A0A;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #FFFFFF;
        }
        .header {
          background-color: #0A0A0A;
          padding: 40px 20px;
          text-align: center;
          border-bottom: 4px solid #D4AF37;
        }
        .logo {
          font-size: 28px;
          font-weight: 800;
          color: #D4AF37;
          letter-spacing: 0.5px;
          margin: 0;
        }
        .content {
          padding: 40px 30px;
          background-color: #FFFFFF;
        }
        .greeting {
          font-size: 20px;
          font-weight: 600;
          color: #0A0A0A;
          margin-bottom: 20px;
        }
        .message-text {
          font-size: 15px;
          line-height: 1.7;
          color: #333333;
          margin-bottom: 16px;
        }
        .info-box {
          background-color: #F9F9F9;
          border-left: 4px solid #D4AF37;
          padding: 20px;
          margin: 30px 0;
        }
        .footer {
          background-color: #0A0A0A;
          padding: 30px;
          text-align: center;
          color: #999999;
          font-size: 13px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1 class="logo">JR FLEET SOLUTIONS</h1>
        </div>
        <div class="content">
          <div class="greeting">Hello ${data.name},</div>
          <p class="message-text">
            Thank you for requesting a demo of JR Fleet Solutions. We have received your inquiry and will contact you within 24 business hours.
          </p>
          <div class="info-box">
            <strong>Your Details:</strong><br>
            Name: ${data.name}<br>
            Company: ${data.company}<br>
            Email: ${data.email}
          </div>
        </div>
        <div class="footer">
          <p>${COMPANY_NAME}</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  GmailApp.sendEmail(data.email, subject, '', {
    htmlBody: htmlBody,
    name: COMPANY_NAME
  });
}

/**
 * Send notification email to admin for demo request
 */
function sendDemoAdminNotification(data) {
  const subject = 'New Demo Request - ' + data.company;
  
  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          line-height: 1.6;
          color: #0A0A0A;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #FFFFFF;
        }
        .header {
          background-color: #D4AF37;
          padding: 30px 20px;
          text-align: center;
        }
        .content {
          padding: 30px;
        }
        .details-section {
          background-color: #F9F9F9;
          border: 2px solid #D4AF37;
          padding: 25px;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>NEW DEMO REQUEST</h1>
        </div>
        <div class="content">
          <div class="details-section">
            <strong>Name:</strong> ${data.name}<br>
            <strong>Company:</strong> ${data.company}<br>
            <strong>Email:</strong> ${data.email}<br>
            ${data.phone ? '<strong>Phone:</strong> ' + data.phone + '<br>' : ''}
            ${data.fleetSize ? '<strong>Fleet Size:</strong> ' + data.fleetSize + '<br>' : ''}
            ${data.message ? '<strong>Message:</strong> ' + data.message : ''}
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const recipients = ADMIN_EMAILS.join(',');
  GmailApp.sendEmail(recipients, subject, '', {
    htmlBody: htmlBody,
    name: COMPANY_NAME + ' System'
  });
}

/**
 * Send confirmation email to user for support request
 */
function sendSupportUserConfirmation(data) {
  const subject = 'Support Request Received - JR Fleet Solutions';
  
  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica', 'Arial', sans-serif;
          line-height: 1.6;
          color: #0A0A0A;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #FFFFFF;
        }
        .header {
          background-color: #0A0A0A;
          padding: 40px 20px;
          text-align: center;
          border-bottom: 4px solid #D4AF37;
        }
        .logo {
          font-size: 28px;
          font-weight: 800;
          color: #D4AF37;
          letter-spacing: 0.5px;
          margin: 0;
        }
        .tagline {
          color: #CCCCCC;
          font-size: 14px;
          margin-top: 8px;
        }
        .content {
          padding: 40px 30px;
          background-color: #FFFFFF;
        }
        .greeting {
          font-size: 20px;
          font-weight: 600;
          color: #0A0A0A;
          margin-bottom: 20px;
        }
        .message-text {
          font-size: 15px;
          line-height: 1.7;
          color: #333333;
          margin-bottom: 16px;
        }
        .info-box {
          background-color: #F9F9F9;
          border-left: 4px solid #D4AF37;
          padding: 20px;
          margin: 30px 0;
        }
        .info-box h3 {
          margin-top: 0;
          color: #0A0A0A;
          font-size: 16px;
          font-weight: 600;
        }
        .info-row {
          margin: 8px 0;
          font-size: 14px;
        }
        .info-label {
          font-weight: 600;
          color: #0A0A0A;
          display: inline-block;
          width: 120px;
        }
        .info-value {
          color: #555555;
        }
        .message-box {
          background-color: #0A0A0A;
          color: #FFFFFF;
          padding: 20px;
          margin: 25px 0;
          border-radius: 4px;
          border-left: 4px solid #D4AF37;
        }
        .message-box h3 {
          margin-top: 0;
          color: #D4AF37;
          font-size: 16px;
        }
        .message-box p {
          margin: 0;
          color: #CCCCCC;
          line-height: 1.7;
        }
        .footer {
          background-color: #0A0A0A;
          padding: 30px;
          text-align: center;
          color: #999999;
          font-size: 13px;
        }
        .footer-links {
          margin: 15px 0;
        }
        .footer-link {
          color: #D4AF37;
          text-decoration: none;
          margin: 0 12px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <!-- Header -->
        <div class="header">
          <h1 class="logo">JR FLEET SOLUTIONS</h1>
          <p class="tagline">Enterprise Fleet Management Technology</p>
        </div>
        
        <!-- Content -->
        <div class="content">
          <div class="greeting">Hello ${data.name},</div>
          
          <p class="message-text">
            Thank you for contacting JR Fleet Solutions support. We have received your support request and our team will review it shortly.
          </p>
          
          <p class="message-text">
            A member of our support team will get back to you as soon as possible, typically within 24 business hours. If your issue is urgent, please call us directly at the numbers listed below.
          </p>
          
          <!-- Request Details -->
          <div class="info-box">
            <h3>Your Support Request Details</h3>
            <div class="info-row">
              <span class="info-label">Issue Type:</span>
              <span class="info-value">${data.issue}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Name:</span>
              <span class="info-value">${data.name}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Email:</span>
              <span class="info-value">${data.email}</span>
            </div>
            ${data.phone ? `
            <div class="info-row">
              <span class="info-label">Phone:</span>
              <span class="info-value">${data.phone}</span>
            </div>
            ` : ''}
            <div class="info-row">
              <span class="info-label">Submitted:</span>
              <span class="info-value">${new Date().toLocaleString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
          </div>
          
          <!-- Message -->
          <div class="message-box">
            <h3>Your Message</h3>
            <p>${data.message}</p>
          </div>
          
          <p class="message-text">
            In the meantime, you can visit our knowledge base or contact us directly:
          </p>
          
          <p class="message-text">
            <strong>Phone:</strong> +233 59 595 2752, +233 24 539 2996<br>
            <strong>Email:</strong> service@kamakgroup.com
          </p>
          
          <p class="message-text" style="margin-top: 30px;">
            Best regards,<br>
            <strong>The JR Fleet Solutions Support Team</strong>
          </p>
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <div class="footer-links">
            <a href="${COMPANY_WEBSITE}" class="footer-link">Website</a>
            <a href="${COMPANY_WEBSITE}/support" class="footer-link">Support</a>
          </div>
          <p style="margin: 15px 0 5px 0;">
            ${COMPANY_NAME}<br>
            Enterprise Fleet Management Technology
          </p>
          <p style="margin: 5px 0; font-size: 12px;">
            This email was sent because you submitted a support request on our website.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const plainBody = `
Hello ${data.name},

Thank you for contacting JR Fleet Solutions support. We have received your support request and our team will review it shortly.

YOUR SUPPORT REQUEST DETAILS
Issue Type: ${data.issue}
Name: ${data.name}
Email: ${data.email}
${data.phone ? 'Phone: ' + data.phone : ''}
Submitted: ${new Date().toLocaleString()}

YOUR MESSAGE:
${data.message}

A member of our support team will get back to you as soon as possible, typically within 24 business hours.

CONTACT US
Phone: +233 59 595 2752, +233 24 539 2996
Email: service@kamakgroup.com

Best regards,
The JR Fleet Solutions Support Team

${COMPANY_NAME}
Enterprise Fleet Management Technology
${COMPANY_WEBSITE}
`;
  
  GmailApp.sendEmail(
    data.email,
    subject,
    plainBody,
    {
      htmlBody: htmlBody,
      name: COMPANY_NAME
    }
  );
}

/**
 * Send notification email to admin for support request
 */
function sendSupportAdminNotification(data) {
  const subject = 'New Support Request - ' + data.issue;
  
  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica', 'Arial', sans-serif;
          line-height: 1.6;
          color: #0A0A0A;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #FFFFFF;
        }
        .header {
          background-color: #DC2626;
          padding: 30px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          color: #FFFFFF;
          font-weight: 800;
        }
        .alert-badge {
          display: inline-block;
          background-color: #FFFFFF;
          color: #DC2626;
          padding: 8px 16px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          margin-top: 10px;
          letter-spacing: 0.5px;
        }
        .content {
          padding: 30px;
          background-color: #FFFFFF;
        }
        .intro {
          font-size: 16px;
          color: #0A0A0A;
          margin-bottom: 25px;
          font-weight: 500;
        }
        .details-section {
          background-color: #F9F9F9;
          border: 2px solid #D4AF37;
          padding: 25px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .detail-row {
          margin: 12px 0;
          display: flex;
          border-bottom: 1px solid #E5E5E5;
          padding-bottom: 12px;
        }
        .detail-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .detail-label {
          font-weight: 700;
          color: #0A0A0A;
          width: 140px;
          flex-shrink: 0;
          font-size: 14px;
        }
        .detail-value {
          color: #333333;
          flex-grow: 1;
          font-size: 14px;
        }
        .message-box {
          background-color: #0A0A0A;
          color: #FFFFFF;
          padding: 20px;
          margin: 25px 0;
          border-radius: 4px;
          border-left: 4px solid #D4AF37;
        }
        .message-box h3 {
          margin-top: 0;
          color: #D4AF37;
          font-size: 16px;
        }
        .message-box p {
          margin: 0;
          color: #CCCCCC;
          line-height: 1.7;
          white-space: pre-wrap;
        }
        .priority-tag {
          display: inline-block;
          background-color: #DC2626;
          color: #FFFFFF;
          padding: 4px 12px;
          border-radius: 3px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          margin-left: 10px;
        }
        .footer {
          background-color: #0A0A0A;
          padding: 20px;
          text-align: center;
          color: #999999;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <!-- Header -->
        <div class="header">
          <h1>NEW SUPPORT REQUEST</h1>
          <div class="alert-badge">ACTION REQUIRED</div>
        </div>
        
        <!-- Content -->
        <div class="content">
          <p class="intro">
            A new support request has been submitted through the JR Fleet Solutions support page.
            Please review the details below and respond to the customer as soon as possible.
          </p>
          
          <!-- Contact Details -->
          <div class="details-section">
            <div class="detail-row">
              <span class="detail-label">Issue Type:</span>
              <span class="detail-value"><strong>${data.issue}</strong><span class="priority-tag">SUPPORT</span></span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Contact Name:</span>
              <span class="detail-value"><strong>${data.name}</strong></span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Email Address:</span>
              <span class="detail-value"><a href="mailto:${data.email}" style="color: #D4AF37; text-decoration: none;">${data.email}</a></span>
            </div>
            ${data.phone ? `
            <div class="detail-row">
              <span class="detail-label">Phone Number:</span>
              <span class="detail-value"><a href="tel:${data.phone}" style="color: #D4AF37; text-decoration: none;">${data.phone}</a></span>
            </div>
            ` : ''}
            <div class="detail-row">
              <span class="detail-label">Submission Date:</span>
              <span class="detail-value">${new Date().toLocaleString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
          </div>
          
          <!-- Message -->
          <div class="message-box">
            <h3>Customer Message</h3>
            <p>${data.message}</p>
          </div>
          
          <p style="margin-top: 30px; font-size: 13px; color: #666666; border-top: 1px solid #E5E5E5; padding-top: 20px;">
            This notification was automatically generated by the JR Fleet Solutions support system.
            All data has been logged to the Support Requests tracking sheet.
          </p>
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <p style="margin: 5px 0;">
            ${COMPANY_NAME} - Internal Notification System
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const plainBody = `
NEW SUPPORT REQUEST - ACTION REQUIRED

A new support request has been submitted through the JR Fleet Solutions support page.
Please review the details below and respond to the customer as soon as possible.

CONTACT DETAILS
Issue Type: ${data.issue}
Name: ${data.name}
Email: ${data.email}
${data.phone ? 'Phone: ' + data.phone : ''}

CUSTOMER MESSAGE:
${data.message}

Submission Date: ${new Date().toLocaleString()}

This notification was automatically generated by the JR Fleet Solutions support system.
All data has been logged to the Support Requests tracking sheet.

${COMPANY_NAME}
`;
  
  // Send to all admin emails
  const recipients = ADMIN_EMAILS.join(',');
  
  GmailApp.sendEmail(
    recipients,
    subject,
    plainBody,
    {
      htmlBody: htmlBody,
      name: COMPANY_NAME + ' System'
    }
  );
}
