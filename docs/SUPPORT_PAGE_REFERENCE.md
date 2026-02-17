# Support Page - Quick Reference

## What Was Created

### 1. Support Page (`support.html`)
A dedicated support page with:
- Professional design matching the project's gold & black theme
- Contact information section (phone, email, location)
- Support illustration with 24/7 badge
- Support form with issue type dropdown
- Responsive layout for all devices

### 2. Support Stylesheet (`css/support.css`)
- Custom styles matching the project theme
- Gold (#D4AF37) and black (#0A0A0A) color scheme
- Responsive breakpoints for mobile, tablet, and desktop
- Hover effects and transitions
- Toast notification styles

### 3. Support JavaScript (`js/support.js`)
- Form submission handling
- Client-side validation
- Toast notifications for success/error messages
- Mobile menu toggle
- Integration with Google Apps Script

### 4. Updated Google Apps Script (`docs/gas-form-handler-updated.js`)
- Handles both demo requests and support requests
- Creates separate sheets: "Demo Requests" and "Support Requests"
- Sends customized confirmation emails to users
- Sends customized notification emails to admins
- Includes all form data in emails and sheets

### 5. Navigation Update (`index.html`)
- Added "Support" link to main navigation
- Positioned between "Why Us" and "Request Demo"

---

## Form Fields

### Support Form Fields:
1. **Issue Type** (dropdown, required)
   - Technical Support
   - Account Issues
   - Billing Question
   - Feature Request
   - General Inquiry
   - Bug Report
   - Other

2. **Your Name** (text, required)
3. **Email** (email, required)
4. **Phone** (tel, optional)
5. **Message** (textarea, required)

---

## Google Sheet Structure

### Support Requests Sheet Columns:
| Column | Description |
|--------|-------------|
| Timestamp | Automatic submission date/time |
| Issue Type | Selected issue category |
| Name | Customer name |
| Email | Customer email |
| Phone | Customer phone (if provided) |
| Message | Customer's support message |
| Status | Default: "New" (can be updated manually) |

---

## Email Notifications

### User Confirmation Email:
- **Subject**: "Support Request Received - JR Fleet Solutions"
- **Contains**:
  - Acknowledgment of request
  - Copy of submitted details
  - Expected response time (24 hours)
  - Direct contact information
  - Professional branding

### Admin Notification Email:
- **Subject**: "New Support Request - [Issue Type]"
- **Contains**:
  - Urgent alert badge
  - Full customer contact details
  - Issue type highlighted
  - Complete customer message
  - Submission timestamp
  - Professional formatting

---

## Setup Instructions

### 1. Deploy Updated Google Apps Script
1. Open your Google Sheet
2. Go to **Extensions** > **Apps Script**
3. Replace existing code with `/docs/gas-form-handler-updated.js`
4. Update `ADMIN_EMAILS` array with your emails
5. Deploy as Web App (Anyone can access)
6. Copy the deployment URL

### 2. Update Frontend Files
Update the `SCRIPT_URL` in both:
- `/js/main.js` (demo form)
- `/js/support.js` (support form)

Replace with your Google Apps Script deployment URL.

### 3. Test the Support Form
1. Visit `/support.html`
2. Fill out and submit the form
3. Verify:
   - Success toast notification appears
   - User receives confirmation email
   - Admin(s) receive notification email
   - Data appears in "Support Requests" sheet

---

## File Locations

```
jrfleetsolutions/
├── support.html (NEW)
├── index.html (UPDATED - added Support nav link)
├── css/
│   ├── support.css (NEW)
│   ├── global.css
│   └── home.css
├── js/
│   ├── support.js (NEW)
│   ├── main.js
│   └── animations.js
└── docs/
    ├── gas-form-handler-updated.js (NEW)
    ├── GAS_SETUP_GUIDE_UPDATED.md (NEW)
    └── SUPPORT_PAGE_REFERENCE.md (THIS FILE)
```

---

## Color Theme

The support page uses the same color scheme as the main site:

| Color | Hex Code | Usage |
|-------|----------|-------|
| Gold | #D4AF37 | Primary accent, CTAs, highlights |
| Gold Light | #E8C968 | Hover states, gradients |
| Black | #0A0A0A | Primary background, text |
| Black Light | #1A1A1A | Secondary backgrounds |
| White | #FFFFFF | Text on dark backgrounds |
| Off-White | #F5F5F5 | Page backgrounds |
| Gray | #737373 - #F7F7F7 | Borders, secondary text |

---

## Responsive Breakpoints

| Breakpoint | Width | Changes |
|------------|-------|---------|
| Desktop | > 1024px | Two-column layout |
| Tablet | 768px - 1024px | Single column layout |
| Mobile | < 768px | Reduced padding, stacked layout |
| Small Mobile | < 480px | Smaller logo, simplified spacing |

---

## Key Features

### User Experience:
✅ Professional, modern design
✅ Clear form layout with validation
✅ Real-time success/error notifications
✅ Mobile-responsive design
✅ Accessible form labels and ARIA attributes
✅ Contact information readily available

### Backend:
✅ Automatic data logging to Google Sheets
✅ Dual email notifications (user + admin)
✅ Separate tracking for support vs demo requests
✅ HTML email templates with branding
✅ Error handling and validation

### Integration:
✅ Seamless navigation from main site
✅ Consistent design language
✅ Same Google Apps Script for both forms
✅ Automated form type detection

---

## Customization Tips

### To Change Contact Information:
Edit `support.html` in the "Find Us" section:
- Phone numbers
- Email address
- Physical location

### To Add/Modify Issue Types:
Edit the `<select>` dropdown in `support.html`:
```html
<option value="Your New Issue">Your New Issue</option>
```

### To Customize Email Templates:
Edit functions in `gas-form-handler-updated.js`:
- `sendSupportUserConfirmation()` - User email
- `sendSupportAdminNotification()` - Admin email

### To Change Colors:
All colors are defined in `/css/global.css` as CSS variables:
```css
--color-gold: #D4AF37;
--color-black: #0A0A0A;
```

---

## Testing Checklist

- [ ] Support page loads correctly
- [ ] Navigation link works from main page
- [ ] All form fields are visible and editable
- [ ] Form validation works (required fields)
- [ ] Submit button shows loading state
- [ ] Success notification appears after submission
- [ ] Form resets after successful submission
- [ ] User receives confirmation email
- [ ] Admin receives notification email
- [ ] Data is logged in "Support Requests" sheet
- [ ] Mobile responsive design works
- [ ] All links in emails work correctly

---

## Common Issues & Solutions

**Issue**: Form submits but no emails sent
- Check ADMIN_EMAILS configuration
- Verify Gmail quotas not exceeded
- Check spam folders

**Issue**: Data not appearing in sheet
- Ensure sheet name is exactly "Support Requests"
- Check Apps Script execution logs
- Verify deployment URL is correct

**Issue**: Page styling looks broken
- Check that `/css/global.css` is loaded first
- Verify `/css/support.css` path is correct
- Clear browser cache

**Issue**: Toast notifications not showing
- Check browser console for errors
- Verify `#toast` element exists in HTML
- Check JavaScript is loading correctly

---

## Next Steps

1. **Deploy the updated Google Apps Script** (see GAS_SETUP_GUIDE_UPDATED.md)
2. **Update the script URLs** in main.js and support.js
3. **Test both forms** thoroughly
4. **Configure admin email addresses**
5. **Add Support link to any additional pages** if needed
6. **Monitor initial submissions** to ensure everything works

---

## Support

For questions about:
- **Google Apps Script**: Check the official [Apps Script documentation](https://developers.google.com/apps-script)
- **Form issues**: Review browser console for JavaScript errors
- **Email delivery**: Check Google Apps Script execution logs

---

**Created**: February 17, 2026
**Version**: 1.0
**Status**: Ready for deployment
