# Missing You Email Feature 💕

## Overview
When Sajid sends a message containing "missing you" to Nasywa, an automatic email notification is sent to Nasywa's email address.

## Setup Instructions

### 1. Configure Environment Variables
The following variables should be in your `.env.local` (they are already configured with your SMTP details):

```env
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-specific-password
SMTP_FROM=your-gmail@gmail.com
```

### 2. Generate Gmail App Password
1. Go to your Google Account: https://myaccount.google.com
2. Navigate to **Security** → **2-Step Verification** (enable if not already)
3. Scroll down to **App passwords**: https://myaccount.google.com/apppasswords
4. Select **Mail** and **Other (Custom name)**
5. Name it "Power Couple App"
6. Copy the generated 16-character password
7. Use this password as `EMAIL_PASSWORD` in your `.env.local`

### 3. Vercel Deployment
Add the environment variables in your Vercel project:
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add:
   - `SMTP_USER`: Your Gmail address
   - `SMTP_PASS`: Your App Password
   - `SMTP_FROM`: Your Gmail address

## How It Works

1. **Trigger**: When Sajid types a message containing "missing you" in chat with Nasywa
2. **Email Sent To**: nasywanazhifariyandi@gmail.com
3. **Email Content**: Beautiful HTML email with:
   - Personalized message from Sajid
   - Direct link to reply in the app
   - Romantic design with gradients and emojis

## API Endpoint
- **Route**: `/api/send-missing-you`
- **Method**: POST
- **Payload**:
  ```json
  {
    "sender": "Sajid",
    "recipient": "nasywanazhifariyandi@gmail.com",
    "message": "The actual message text"
  }
  ```

## Testing
1. Log in as Sajid
2. Open chat with Nasywa
3. Send a message like: "I'm missing you so much!"
4. Check Nasywa's email inbox

## Troubleshooting

### Email not sending?
- Verify environment variables are set correctly
- Check that 2FA is enabled on Gmail
- Ensure App Password is correct (not regular password)
- Check Vercel logs for errors

### Gmail blocking?
- Make sure you're using an App Password, not your regular password
- Check Gmail's "Less secure app access" settings (should be OFF when using App Passwords)

## Features
✅ Automatic email trigger on "missing you" messages  
✅ Beautiful HTML email template  
✅ Direct link to reply in app  
✅ Works only when chatting with Nasywa  
✅ Error handling and logging  

---
Made with ❤️ for Power Couple
