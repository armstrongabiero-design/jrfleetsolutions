# Google Apps Script Setup Guide - Updated with Support Form

## Overview
This guide will help you set up the updated Google Apps Script that handles both **Demo Requests** and **Support Requests** for JR Fleet Solutions.

## What's New
- Support for two form types: Demo Requests and Support Requests
- Separate Google Sheets tabs for each form type
- Customized email templates for each form type
- Enhanced tracking with dedicated columns for each form

---

## Setup Steps

### 1. Create or Open Your Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Either:
   - Open your existing "JR Fleet Solutions Forms" sheet
   - Create a new spreadsheet and name it "JR Fleet Solutions Forms"

### 2. Open the Script Editor
1. In your Google Sheet, click **Extensions** > **Apps Script**
2. If there's existing code, you can either:
   - Replace it entirely with the new code
   - Save a backup first by copying to a new file

### 3. Paste the Updated Script
1. Delete any existing code in the script editor
2. Open the file: `/docs/gas-form-handler-updated.js`
3. Copy all the code
4. Paste it into the Apps Script editor

### 4. Configure Admin Emails
At the top of the script, update the `ADMIN_EMAILS` array:

```javascript
const ADMIN_EMAILS = [
  'your-email@example.com',
  'sales@jrfleetsolutions.com',
  'support@jrfleetsolutions.com'
];
```

### 5. Update Company Information (Optional)
If needed, update these constants:

```javascript
const COMPANY_NAME = 'JR Fleet Solutions';
const COMPANY_WEBSITE = 'https://jrfleetsolutions.com';
```

### 6. Deploy as Web App

#### First Time Deployment:
1. Click the **Deploy** button (top right)
2. Select **New deployment**
3. Click the gear icon ⚙️ next to "Select type"
4. Choose **Web app**
5. Fill in the deployment settings:
   - **Description**: "JR Fleet Solutions Form Handler - v1.0"
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
6. Click **Deploy**
7. **Important**: Click **Authorize access**
8. Select your Google account
9. Click **Advanced** if you see a warning
10. Click **Go to [Your Project Name] (unsafe)**
11. Click **Allow**
12. Copy the **Web App URL** (you'll need this in the next step)

#### Updating an Existing Deployment:
1. Click **Deploy** > **Manage deployments**
2. Click the pencil icon ✏️ to edit
3. Under **Version**, select **New version**
4. Add a description like "Added support form handling"
5. Click **Deploy**
6. Copy the new Web App URL

---

## 7. Update Frontend Configuration

### Update Demo Form (main.js)
1. Open `/js/main.js`
2. Find the line with `SCRIPT_URL`
3. Replace with your new deployment URL:

```javascript
const SCRIPT_URL = 'YOUR_WEB_APP_URL_HERE';
```

### Update Support Form (support.js)
1. Open `/js/support.js`
2. Find the line with `SCRIPT_URL`
3. Replace with the same deployment URL:

```javascript
const SCRIPT_URL = 'YOUR_WEB_APP_URL_HERE';
```

**Note**: Both forms use the same Google Apps Script URL. The script automatically detects which form is being submitted.

---

## 8. Test the Forms

### Test Demo Request Form:
1. Go to your main page (`index.html`)
2. Scroll to the "Request Demo" section
3. Fill out the form completely
4. Submit and verify:
   - ✅ Success message appears
   - ✅ User receives confirmation email
   - ✅ Admin(s) receive notification email
   - ✅ Data appears in "Demo Requests" sheet tab

### Test Support Request Form:
1. Go to `/support.html`
2. Fill out the support form
3. Submit and verify:
   - ✅ Success message appears
   - ✅ User receives confirmation email
   - ✅ Admin(s) receive notification email
   - ✅ Data appears in "Support Requests" sheet tab

---

## Understanding the Two Sheets

### Demo Requests Sheet
**Columns:**
- Timestamp
- Name
- Email
- Company
- Phone
- Fleet Size
- Message
- Status

### Support Requests Sheet
**Columns:**
- Timestamp
- Issue Type
- Name
- Email
- Phone
- Message
- Status

Both sheets are automatically created when the first submission is received.

---

## Email Templates

### Demo Request Emails
- **User Confirmation**: Professional email with submission details and next steps
- **Admin Notification**: Alert with full contact details and action items

### Support Request Emails
- **User Confirmation**: Acknowledgment with support request details and contact information
- **Admin Notification**: Urgent alert with issue type and customer message

---

## Troubleshooting

### Problem: "Form submitted successfully but no email received"
**Solution:**
1. Check your spam/junk folder
2. Verify admin emails are correct in the script
3. Check Apps Script execution logs: **View** > **Logs**

### Problem: "No data in Google Sheet"
**Solution:**
1. Check if sheets have been created automatically
2. Verify the sheet names match exactly: "Demo Requests" and "Support Requests"
3. Check execution logs for errors

### Problem: "CORS error in browser console"
**Solution:**
1. Make sure deployment is set to "Anyone" for access
2. Re-deploy the web app
3. Clear browser cache and try again

### Problem: "Script timeout or rate limit errors"
**Solution:**
- Google Apps Script has quotas (typically 20,000 emails/day for Gmail)
- Check your [quota limits](https://developers.google.com/apps-script/guides/services/quotas)

---

## Viewing Execution Logs

To see what's happening behind the scenes:
1. In Apps Script editor, click **View** > **Logs**
2. Or click **Executions** in the left sidebar
3. Check recent executions for errors or success confirmations

---

## Managing Form Submissions

### Updating Status
In your Google Sheet, you can manually update the "Status" column:
- **New** (default)
- **Contacted**
- **In Progress**
- **Resolved**
- **Closed**

### Filtering and Sorting
Use Google Sheets built-in features:
- Apply filters to columns
- Sort by timestamp
- Create pivot tables for analytics

---

## Security Notes

1. **Never share your Web App URL publicly** - only use it in your frontend code
2. **Admin emails** are configured server-side, not visible to users
3. **Form data** is validated before processing
4. **Email addresses** are validated on both frontend and backend

---

## Maintenance

### Adding New Admin Emails
1. Edit the script
2. Add email to `ADMIN_EMAILS` array
3. Save and re-deploy

### Customizing Email Templates
1. Find the `sendDemoUserConfirmation()`, `sendDemoAdminNotification()`, etc. functions
2. Modify the HTML in the `htmlBody` variable
3. Save and re-deploy

### Backing Up Data
Regularly export your sheets:
- **File** > **Download** > **Microsoft Excel (.xlsx)** or **CSV**

---

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Google Apps Script documentation
3. Check browser console for errors
4. Verify all URLs are updated correctly

---

## Summary Checklist

- [ ] Google Sheet created
- [ ] Apps Script code pasted
- [ ] Admin emails configured
- [ ] Script deployed as Web App
- [ ] Permissions authorized
- [ ] Web App URL copied
- [ ] main.js updated with URL
- [ ] support.js updated with URL
- [ ] Demo form tested successfully
- [ ] Support form tested successfully
- [ ] Demo Requests sheet populated
- [ ] Support Requests sheet populated
- [ ] Confirmation emails received
- [ ] Admin notification emails received

---

**Congratulations! Your dual-form submission system is now fully operational.**
