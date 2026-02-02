# Quick Setup - Google Apps Script Form Handler

## 5-Minute Setup Checklist

### 1. Create Google Sheet
- Go to sheets.google.com
- Create new sheet: "JR Fleet Solutions - Demo Requests"

### 2. Open Apps Script
- Extensions > Apps Script
- Copy all code from `gas-form-handler.js`
- Paste into editor

### 3. Update Admin Emails
```javascript
const ADMIN_EMAILS = [
  'admin1@domain.com',
  'admin2@domain.com'
]; // Line 15-18
```
**Add all admins who should receive notifications**

### 4. Deploy
- Deploy > New deployment > Web app
- Execute as: Me
- Access: Anyone
- Copy the deployment URL

### 5. Update Frontend
In `js/main.js` line 112:
```javascript
const SCRIPT_URL = 'YOUR_DEPLOYMENT_URL_HERE';
```

### 6. Test
- Submit form on your website
- Check: Sheet, User email, Admin email

---

## What Gets Automated

### User Receives:
- Professional confirmation email
- Submission details
- Next steps timeline
- Company branding (Gold & Black theme)

### Admin Receives:
- Priority notification email
- All contact details
- Fleet size highlighted
- Action items checklist
- Direct contact links

### Google Sheet:
- Automatic logging
- Timestamp
- All form fields
- Status tracking

---

## Key Files

1. `gas-form-handler.js` - Backend script (paste in Apps Script)
2. `js/main.js` - Frontend handler (already updated)
3. `GAS_SETUP_GUIDE.md` - Full documentation

---

## Support Links

- Full Setup Guide: `GAS_SETUP_GUIDE.md`
- Apps Script Docs: developers.google.com/apps-script
- Troubleshooting: See full guide

---

**Need help? Check the full setup guide for detailed instructions.**
