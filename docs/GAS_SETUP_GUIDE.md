# Google Apps Script Form Handler Setup Guide

Complete guide to set up automated form submissions with Google Sheets logging and email notifications.

## Overview

This setup will:
- Log all form submissions to a Google Sheet
- Send professional confirmation emails to users
- Send detailed notification emails to admins
- Handle everything automatically

---

## Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it: **JR Fleet Solutions - Demo Requests**
4. The script will automatically create headers when first run

---

## Step 2: Set Up Google Apps Script

### Open Script Editor

1. In your Google Sheet, click **Extensions** > **Apps Script**
2. Delete any default code in the editor
3. Copy the entire contents of `gas-form-handler.js`
4. Paste it into the Apps Script editor

### Configure Settings

Update the admin email in the script:

```javascript
const ADMIN_EMAIL = 'your-admin-email@domain.com'; // Change this!
```

Optional: Update company website if different:

```javascript
const COMPANY_WEBSITE = 'https://jrfleetsolutions.com';
```

### Save the Script

1. Click the disk icon or press `Cmd+S` (Mac) / `Ctrl+S` (Windows)
2. Name the project: **JR Fleet Solutions Form Handler**

---

## Step 3: Deploy as Web App

### Deploy Settings

1. Click **Deploy** > **New deployment**
2. Click the gear icon next to "Select type"
3. Choose **Web app**
4. Configure deployment:
   - **Description**: "Production Form Handler"
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**

### Authorize the Script

1. Click **Authorize access**
2. Choose your Google account
3. Click **Advanced** (if you see a warning)
4. Click **Go to [Project Name] (unsafe)**
5. Click **Allow** to grant permissions:
   - Send email as you
   - Access spreadsheet
   - Connect to external service

### Copy Deployment URL

1. After deployment, you'll see a **Web app URL**
2. Copy this URL - it looks like:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```
3. Keep this URL - you'll need it for the next step

---

## Step 4: Update Frontend Code

### Update the Script URL

Open `js/main.js` and find this line (around line 112):

```javascript
const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
```

Replace it with your deployment URL:

```javascript
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
```

### Commit and Deploy

```bash
git add js/main.js
git commit -m "Connect form to Google Apps Script"
git push origin main
```

Or redeploy to Vercel:
```bash
vercel --prod
```

---

## Step 5: Test the Integration

### Test Form Submission

1. Go to your live website
2. Fill out the demo request form
3. Submit the form

### Verify Success

Check these three things:

1. **Google Sheet**
   - New row should appear with submission data
   - Timestamp, name, email, company, etc.

2. **User Email**
   - Check the email address you submitted
   - Should receive confirmation email
   - Professionally formatted with brand colors

3. **Admin Email**
   - Check admin email inbox
   - Should receive notification with all details
   - Action items included

---

## Email Templates

### User Confirmation Email Features

- Brand-matched design (Gold #D4AF37 and Black #0A0A0A)
- Professional header with company logo
- Submission details summary
- Next steps clearly outlined
- Professional footer with links

### Admin Notification Email Features

- High-priority alert design
- All contact details highlighted
- Fleet size prominently displayed (if provided)
- Action items checklist
- Direct links to email/phone
- Timestamp for tracking

---

## Customization Options

### Change Admin Email

Edit in `gas-form-handler.js`:

```javascript
const ADMIN_EMAIL = 'newadmin@domain.com';
```

Then redeploy the script.

### Add Multiple Admin Recipients

Change the admin notification function:

```javascript
const ADMIN_EMAILS = [
  'admin1@domain.com',
  'admin2@domain.com',
  'sales@domain.com'
];

// In sendAdminNotification function:
GmailApp.sendEmail(
  ADMIN_EMAILS.join(','), // Send to multiple
  subject,
  plainBody,
  { htmlBody: htmlBody, name: COMPANY_NAME }
);
```

### Customize Email Content

Both email templates are in `gas-form-handler.js`:
- User confirmation: `sendUserConfirmation()` function
- Admin notification: `sendAdminNotification()` function

Edit the HTML and text to match your needs.

### Add Auto-Reply from Specific Email

To send from a specific email (not your Gmail):

1. Set up that email in Gmail (Settings > Accounts)
2. Update the script:

```javascript
GmailApp.sendEmail(
  data.email,
  subject,
  plainBody,
  {
    htmlBody: htmlBody,
    name: COMPANY_NAME,
    from: 'noreply@jrfleetsolutions.com' // Your domain email
  }
);
```

---

## Troubleshooting

### Form Submits But Nothing Happens

**Check:**
1. Script URL is correct in `js/main.js`
2. Script is deployed as "Anyone" can access
3. Check browser console for errors
4. Verify the script URL ends with `/exec`

### No Email Received

**Check:**
1. Gmail spam/junk folders
2. Email address was entered correctly
3. Script has authorization to send emails
4. Check Apps Script execution logs:
   - Open Apps Script editor
   - Click **Executions** (clock icon)
   - Look for errors

### Sheet Not Updating

**Check:**
1. Sheet name matches `SHEET_NAME` constant
2. Script has permission to edit the sheet
3. Check Apps Script execution logs for errors

### Authorization Issues

**Solution:**
1. In Apps Script, click **Run** > **doPost**
2. Authorize all permissions again
3. Redeploy the web app

### Emails Not Branded Correctly

**Check:**
1. Email client supports HTML emails
2. View as HTML, not plain text
3. Some email clients strip CSS

---

## Security Best Practices

### Environment Variables

For sensitive data, use Apps Script properties:

```javascript
// Set once in Script Editor console:
PropertiesService.getScriptProperties().setProperty('ADMIN_EMAIL', 'admin@domain.com');

// Use in code:
const ADMIN_EMAIL = PropertiesService.getScriptProperties().getProperty('ADMIN_EMAIL');
```

### Rate Limiting

Add rate limiting to prevent spam:

```javascript
function doPost(e) {
  const cache = CacheService.getScriptCache();
  const email = JSON.parse(e.postData.contents).email;
  const cacheKey = 'ratelimit_' + email;
  
  if (cache.get(cacheKey)) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Please wait before submitting again'
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  cache.put(cacheKey, 'submitted', 300); // 5 minute cooldown
  
  // Continue with normal processing...
}
```

---

## Monitoring and Maintenance

### Check Execution Logs

1. Open Apps Script editor
2. Click **Executions** (clock icon on left)
3. Review recent executions
4. Check for errors or failures

### Email Quota

Free Gmail accounts:
- 100 emails per day

Google Workspace accounts:
- 1,500 emails per day

### Backup Data

Regularly export your Google Sheet:
- File > Download > CSV or Excel

---

## Advanced Features

### Add SMS Notifications

Integrate Twilio or similar service for SMS alerts to admin.

### CRM Integration

Add code to push data to your CRM (Salesforce, HubSpot, etc.).

### Slack Notifications

Send notifications to Slack channel when new demo requests come in.

### Custom Analytics

Track submission sources, conversion rates, response times.

---

## Support

### Resources

- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [GmailApp Reference](https://developers.google.com/apps-script/reference/gmail/gmail-app)
- [SpreadsheetApp Reference](https://developers.google.com/apps-script/reference/spreadsheet)

### Common Issues

If you encounter issues not covered here:
1. Check Apps Script execution logs
2. Verify all permissions are granted
3. Test with a simple console.log() first
4. Ensure deployment is set to "Anyone"

---

## Files Included

- `gas-form-handler.js` - Complete Google Apps Script code
- `js/main.js` - Updated frontend form handler
- This setup guide

---

**Your form is now fully integrated with Google Apps Script!**

Users will receive professional confirmation emails, and you'll get instant notifications for every demo request.
