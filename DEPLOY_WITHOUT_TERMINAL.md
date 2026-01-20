# Complete Deployment Guide (No Terminal Needed!)

This guide will walk you through deploying your Happiness Index 360° app to Vercel in about 5 minutes, using only your web browser and visual tools.

---

## 📋 Overview (What We'll Do)

1. **Create GitHub Account** (2 min) - Free code hosting
2. **Create Vercel Account** (1 min) - Free hosting platform
3. **Connect GitHub to v0** (1 min) - Push code to GitHub
4. **Deploy to Vercel** (1 min) - Live on the internet
5. **Configure Environment Variables** (1 min) - Add Supabase connection

**Total Time: ~5 minutes**

---

## STEP 1: Create GitHub Account (2 minutes)

GitHub is where your code lives. Think of it as Google Drive, but for code.

### 1a. Go to GitHub
- Open browser and go to: **https://github.com**
- Click **"Sign up"** (top right green button)

### 1b. Enter Your Details
```
Email:     Your email (e.g., admin@school.edu)
Password:  Something strong (12+ characters)
Username:  Something simple (e.g., "SchoolAdmin" or "HappinessIndex")
```

### 1c. Verify Email
- GitHub sends you a verification email
- Open your email
- Click the link
- **Account created!** ✓

### What to Remember
- Save your GitHub username somewhere safe
- This is the account that will hold your code

---

## STEP 2: Create Vercel Account (1 minute)

Vercel is the hosting company that will run your app on the internet.

### 2a. Go to Vercel
- Open browser and go to: **https://vercel.com/signup**

### 2b. Sign Up with GitHub
- Click **"Continue with GitHub"** (this links them together)
- GitHub will ask permission (click "Authorize")
- Vercel will create your account automatically

### 2c. Install GitHub Application (IMPORTANT!)
**Vercel now asks: "Install the GitHub application for the accounts you wish to Import from"**

This is asking for permission to access your GitHub repositories. **This is normal and required.**

- Click **"Install"** button
- GitHub will open in a new tab
- Look for the green **"Install"** button on GitHub
- Click it
- You might see "Select repositories" - you can select just "happiness-index-360" or "All repositories"
- Click **"Install"** again
- Go back to the Vercel tab
- Vercel should now say "Connected" or show your repos

### 2d. Create Team
- Vercel asks for "Team Name" (or "Workspace Name")
- Enter: "School Name" or "Happiness Index"
- Click **"Create"** or **"Next"**
- **Done!** ✓

### What Just Happened
- Vercel is now connected to your GitHub
- Vercel has permission to access your repos
- Any code pushed to GitHub will auto-deploy to Vercel
- This is called "continuous deployment" (auto-magic!)

---

## STEP 3: Push Code to GitHub

Now you need to get the Happiness Index 360° code from v0 into GitHub.

### 3a. Download Code from v0
In v0 (where you're reading this):
- Click **"Download ZIP"** button (in top right of code block)
- Save the ZIP file to your computer
- Extract/unzip the folder

### 3b. Create GitHub Repository
- Go to **https://github.com/new**
- Fill in:
  ```
  Repository name: happiness-index-360
  Description:     Student Happiness Assessment Platform
  Public or Private: Public (Vercel can see it)
  ```
- Click **"Create repository"**

### 3c. Upload Code to GitHub (Visual Method)

**Option A: GitHub Web Upload (Easiest - No Installation)**

1. Open your new repository on GitHub
2. Click **"Add file"** → **"Upload files"**
3. Drag and drop the unzipped folder contents
4. Scroll down and click **"Commit changes"**
5. **Code is now on GitHub!** ✓

**Option B: GitHub Desktop (If you want to sync later)**

1. Download **GitHub Desktop** from https://desktop.github.com
2. Install it
3. Open GitHub Desktop
4. Click **"Clone a repository from the Internet"**
5. Select your "happiness-index-360" repo
6. Choose a folder on your computer
7. Drag your unzipped code files into this folder
8. GitHub Desktop will show the changes
9. Click **"Commit to main"**
10. Click **"Push origin"**
11. **Done!** ✓

---

## STEP 4: Deploy to Vercel (1 minute)

Now Vercel will automatically convert your code into a live website.

### 4a. Go to Vercel Dashboard
- Go to **https://vercel.com/dashboard**

### 4b. Import Project
- Click **"Add New"** → **"Project"**
- You'll see your "happiness-index-360" repository
- Click **"Import"**

### 4c. Configure Project
Vercel shows you settings. Just click:
- **"Deploy"** (bottom button)

**Wait for the deployment...**
- You'll see: "Building..." → "Deploying..." → "Ready"
- This takes about 2-3 minutes

### 4d. Get Your Live URL
When it says **"Ready"**, you'll see:
```
https://happiness-index-360.vercel.app
```

**Your app is now LIVE on the internet!** 🎉

---

## STEP 5: Add Environment Variables (2 minutes)

Your app needs to connect to Supabase (the database). Vercel needs your Supabase secrets.

### 5a. Get Your Supabase Secrets
- Go to **https://supabase.com** and log in
- Click your project
- Click **"Settings"** → **"API"**
- Copy these values:
  ```
  Project URL:        https://xxx.supabase.co
  Public Anon Key:    eyJ...
  Service Role Key:   eyJ...
  ```

### 5b. Add to Vercel
- Go to **Vercel Dashboard** → Your Project
- Click **"Settings"** (top menu)
- Click **"Environment Variables"** (left menu)
- Add these variables:

```
NEXT_PUBLIC_SUPABASE_URL          = [Project URL from above]
NEXT_PUBLIC_SUPABASE_ANON_KEY     = [Public Anon Key from above]
SUPABASE_SERVICE_ROLE_KEY         = [Service Role Key from above]
```

- After adding each, click **"Save"**

### 5c. Redeploy
- Go back to **"Deployments"** tab
- Click the three dots on latest deployment
- Click **"Redeploy"**
- Wait for "Ready" ✓

**Your app is now connected to the database!** ✓

---

## STEP 6: Run SQL Migrations (2 minutes)

Now you need to create the database tables.

### 6a. Go to Supabase
- Log in to **https://supabase.com**
- Click your project

### 6b. Open SQL Editor
- Click **"SQL Editor"** (left menu)
- Click **"New Query"**

### 6c. Copy & Paste SQL Scripts

In v0, you should see these files:
- `scripts/001_initial_schema.sql`
- `scripts/002_profile_trigger.sql`
- `scripts/003_default_questions.sql`
- `scripts/004_happiness_index_questions.sql`
- `scripts/005_add_survey_and_analytics.sql`
- `scripts/006_add_school_branding.sql`

**For each file:**
1. Open it in v0
2. Copy all the SQL code
3. Paste into Supabase SQL Editor
4. Click **"Run"** (blue button)
5. Wait for success message (usually says "success" or shows table names)

**Run them in order (001, 002, 003, etc.)**

**When all 6 are done:** ✓

---

## STEP 7: Test Your App (2 minutes)

### 7a. Visit Your App
- Go to: **https://happiness-index-360.vercel.app**
- You should see the login page

### 7b. Create Admin Account
- Click **"Sign Up"**
- Email: `admin@school.edu`
- Password: Something strong
- Role: **"Admin"**
- School: **"Your School Name"**
- Click **"Sign Up"**
- Check your email for confirmation link
- Click the link
- **Account created!** ✓

### 7c. Log In
- Go back to login page
- Email: `admin@school.edu`
- Password: Your password
- Click **"Sign In"**
- You should see the admin dashboard

**You're deployed!** 🎉

---

## STEP 8: What's Your Live URL?

Your app is now at:
```
https://happiness-index-360.vercel.app
```

You can share this link with students!

### Want a Custom Domain? (Optional)
- Custom domain costs ~$12/year
- Go to Vercel → Project Settings → Domains
- Add your domain there

### Want a Free Domain? (Also Optional)
- Go to **https://freenom.com**
- Get a free `.tk` or `.ml` domain
- Point it to your Vercel URL
- Takes 10 minutes

---

## Troubleshooting

### Problem: "Build Failed" on Vercel
**Solution:**
1. Go to Vercel → Deployments
2. Click the failed deployment
3. Check the error message (usually shows what's missing)
4. Make sure you added all environment variables
5. Click "Redeploy"

### Problem: "Page Not Found" 
**Solution:**
1. Wait 5 minutes (Vercel is still deploying)
2. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
3. Check your URL is exactly: `https://happiness-index-360.vercel.app`

### Problem: Can't Log In
**Solution:**
1. Check email for confirmation link
2. Click the confirmation link first
3. Then try to log in
4. If still broken, ask me for help

### Problem: Database says "no tables"
**Solution:**
1. Go back to Supabase SQL Editor
2. Run the migration scripts again (001-006)
3. Check for error messages
4. If errors, share them with me

---

## Summary: You're Done! 🎉

| Step | What You Did | Status |
|------|-------------|--------|
| 1 | Created GitHub account | ✓ |
| 2 | Created Vercel account | ✓ |
| 3 | Pushed code to GitHub | ✓ |
| 4 | Deployed to Vercel | ✓ |
| 5 | Added environment variables | ✓ |
| 6 | Ran SQL migrations | ✓ |
| 7 | Created admin account | ✓ |
| 8 | Tested the app | ✓ |

**Your app is live at:**
```
https://happiness-index-360.vercel.app
```

**Next: Follow GETTING_STARTED.md to set up your school**

---

## Need Help?

- Problems? Check the Troubleshooting section above
- Still stuck? Come back and ask me - I can help!
