/**
 * JR Fleet Solutions - Form Submission Handler
 * Google Apps Script for handling demo request forms
 * 
 * Setup Instructions:
 * 1. Create a new Google Sheet
 * 2. Tools > Script editor
 * 3. Paste this code
 * 4. Update ADMIN_EMAIL constant
 * 5. Deploy as Web App (Anyone can access)
 * 6. Copy deployment URL to frontend
 */

// Configuration
const ADMIN_EMAIL = 'admin@jrfleetsolutions.com'; // Update this
const COMPANY_NAME = 'JR Fleet Solutions';
const COMPANY_WEBSITE = 'https://jrfleetsolutions.com';
const SHEET_NAME = 'Demo Requests';

/**
 * Handle POST requests from the contact form
 */
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Log for debugging
    Logger.log('Received data: ' + JSON.stringify(data));
    
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
    logToSheet(data);
    
    // Send confirmation email to user
    sendUserConfirmation(data);
    
    // Send notification to admin
    sendAdminNotification(data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Request submitted successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
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
 * Log submission to Google Sheet
 */
function logToSheet(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
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
 * Send confirmation email to user
 */
function sendUserConfirmation(data) {
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
          width: 100px;
        }
        .info-value {
          color: #555555;
        }
        .next-steps {
          background-color: #0A0A0A;
          color: #FFFFFF;
          padding: 25px;
          margin: 30px 0;
          border-radius: 4px;
        }
        .next-steps h3 {
          color: #D4AF37;
          margin-top: 0;
          font-size: 18px;
        }
        .next-steps ul {
          margin: 15px 0;
          padding-left: 20px;
        }
        .next-steps li {
          margin: 10px 0;
          color: #CCCCCC;
          line-height: 1.6;
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
        .divider {
          border: 0;
          border-top: 1px solid #E5E5E5;
          margin: 30px 0;
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
            Thank you for requesting a demo of JR Fleet Solutions. We have received your inquiry and are excited to show you how our enterprise-grade fleet management technology can transform your operations.
          </p>
          
          <p class="message-text">
            Your request has been forwarded to our solutions team, and one of our fleet management specialists will contact you within the next 24 business hours to schedule your personalized demonstration.
          </p>
          
          <!-- Submission Details -->
          <div class="info-box">
            <h3>Your Submission Details</h3>
            <div class="info-row">
              <span class="info-label">Name:</span>
              <span class="info-value">${data.name}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Company:</span>
              <span class="info-value">${data.company}</span>
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
            ${data.fleetSize ? `
            <div class="info-row">
              <span class="info-label">Fleet Size:</span>
              <span class="info-value">${data.fleetSize}</span>
            </div>
            ` : ''}
          </div>
          
          <!-- Next Steps -->
          <div class="next-steps">
            <h3>What Happens Next</h3>
            <ul>
              <li>Our team will review your specific requirements and fleet management needs</li>
              <li>A solutions specialist will reach out to schedule your demo at a convenient time</li>
              <li>We will prepare a customized demonstration focused on your operational challenges</li>
              <li>You will receive detailed information about our platform capabilities and pricing</li>
            </ul>
          </div>
          
          <hr class="divider">
          
          <p class="message-text">
            In the meantime, if you have any immediate questions or would like to provide additional information about your fleet operations, please feel free to reply to this email.
          </p>
          
          <p class="message-text">
            We look forward to demonstrating how JR Fleet Solutions can help you achieve operational excellence.
          </p>
          
          <p class="message-text" style="margin-top: 30px;">
            Best regards,<br>
            <strong>The JR Fleet Solutions Team</strong>
          </p>
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <div class="footer-links">
            <a href="${COMPANY_WEBSITE}" class="footer-link">Website</a>
            <a href="${COMPANY_WEBSITE}/support" class="footer-link">Support</a>
            <a href="${COMPANY_WEBSITE}/contact" class="footer-link">Contact</a>
          </div>
          <p style="margin: 15px 0 5px 0;">
            ${COMPANY_NAME}<br>
            Enterprise Fleet Management Technology
          </p>
          <p style="margin: 5px 0; font-size: 12px;">
            This email was sent because you requested a demo on our website.<br>
            Please do not reply directly to this automated message.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const plainBody = `
Hello ${data.name},

Thank you for requesting a demo of JR Fleet Solutions. We have received your inquiry and are excited to show you how our enterprise-grade fleet management technology can transform your operations.

Your request has been forwarded to our solutions team, and one of our fleet management specialists will contact you within the next 24 business hours to schedule your personalized demonstration.

YOUR SUBMISSION DETAILS
Name: ${data.name}
Company: ${data.company}
Email: ${data.email}
${data.phone ? 'Phone: ' + data.phone : ''}
${data.fleetSize ? 'Fleet Size: ' + data.fleetSize : ''}

WHAT HAPPENS NEXT
- Our team will review your specific requirements and fleet management needs
- A solutions specialist will reach out to schedule your demo at a convenient time
- We will prepare a customized demonstration focused on your operational challenges
- You will receive detailed information about our platform capabilities and pricing

In the meantime, if you have any immediate questions or would like to provide additional information about your fleet operations, please feel free to reply to this email.

We look forward to demonstrating how JR Fleet Solutions can help you achieve operational excellence.

Best regards,
The JR Fleet Solutions Team

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
 * Send notification email to admin
 */
function sendAdminNotification(data) {
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
          background-color: #D4AF37;
          padding: 30px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          color: #0A0A0A;
          font-weight: 800;
        }
        .alert-badge {
          display: inline-block;
          background-color: #0A0A0A;
          color: #D4AF37;
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
        }
        .action-items {
          background-color: #FFF9E6;
          border: 1px solid #D4AF37;
          padding: 20px;
          margin: 25px 0;
          border-radius: 4px;
        }
        .action-items h3 {
          margin-top: 0;
          color: #0A0A0A;
          font-size: 16px;
        }
        .action-items ul {
          margin: 10px 0;
          padding-left: 20px;
        }
        .action-items li {
          margin: 8px 0;
          color: #333333;
        }
        .priority-tag {
          display: inline-block;
          background-color: #D4AF37;
          color: #0A0A0A;
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
        .timestamp {
          color: #666666;
          font-size: 13px;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #E5E5E5;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <!-- Header -->
        <div class="header">
          <h1>NEW DEMO REQUEST</h1>
          <div class="alert-badge">ACTION REQUIRED</div>
        </div>
        
        <!-- Content -->
        <div class="content">
          <p class="intro">
            A new demo request has been submitted through the JR Fleet Solutions website.
            Please review the details below and contact the prospect within 24 hours.
          </p>
          
          <!-- Contact Details -->
          <div class="details-section">
            <div class="detail-row">
              <span class="detail-label">Contact Name:</span>
              <span class="detail-value"><strong>${data.name}</strong></span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Company:</span>
              <span class="detail-value"><strong>${data.company}</strong></span>
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
            ${data.fleetSize ? `
            <div class="detail-row">
              <span class="detail-label">Fleet Size:</span>
              <span class="detail-value"><strong>${data.fleetSize}</strong><span class="priority-tag">KEY METRIC</span></span>
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
          ${data.message ? `
          <div class="message-box">
            <h3>Additional Message</h3>
            <p>${data.message}</p>
          </div>
          ` : ''}
          
          <!-- Action Items -->
          <div class="action-items">
            <h3>Recommended Next Steps</h3>
            <ul>
              <li>Review the prospect's company and fleet management needs</li>
              <li>Contact the prospect within 24 business hours</li>
              <li>Schedule a personalized demo at their convenience</li>
              <li>Prepare customized demonstration materials</li>
              <li>Update the lead status in the tracking sheet</li>
            </ul>
          </div>
          
          <div class="timestamp">
            This notification was automatically generated by the JR Fleet Solutions form submission system.
            All data has been logged to the Demo Requests tracking sheet.
          </div>
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
NEW DEMO REQUEST - ACTION REQUIRED

A new demo request has been submitted through the JR Fleet Solutions website.
Please review the details below and contact the prospect within 24 hours.

CONTACT DETAILS
Name: ${data.name}
Company: ${data.company}
Email: ${data.email}
${data.phone ? 'Phone: ' + data.phone : ''}
${data.fleetSize ? 'Fleet Size: ' + data.fleetSize : ''}

${data.message ? 'MESSAGE:\n' + data.message + '\n' : ''}

RECOMMENDED NEXT STEPS
- Review the prospect's company and fleet management needs
- Contact the prospect within 24 business hours
- Schedule a personalized demo at their convenience
- Prepare customized demonstration materials
- Update the lead status in the tracking sheet

Submission Date: ${new Date().toLocaleString()}

This notification was automatically generated by the JR Fleet Solutions form submission system.
All data has been logged to the Demo Requests tracking sheet.

${COMPANY_NAME}
`;
  
  GmailApp.sendEmail(
    ADMIN_EMAIL,
    subject,
    plainBody,
    {
      htmlBody: htmlBody,
      name: COMPANY_NAME + ' System'
    }
  );
}
