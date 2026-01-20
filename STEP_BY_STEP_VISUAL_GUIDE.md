# Complete Step-by-Step Visual Deployment Guide

## 📌 STEP 1: Create GitHub Account

### What is GitHub?
- Free website for storing and sharing code
- Think of it like Google Drive, but for programming projects
- Companies use it to collaborate on code

### How to Create Account:

**1. Open your web browser (Chrome, Firefox, Safari, Edge)**

**2. Go to:** `https://github.com`

**3. You'll see the GitHub homepage**
```
You'll see:
- GitHub logo (top left)
- "Sign up" button (top right, green/white)
```

**4. Click the green "Sign up" button**

**5. Fill in the form:**
```
✓ Email:      admin@school.edu (or your email)
✓ Password:   Something strong (use 12+ characters)
✓ Username:   SchoolAdmin (or any name you like)
```

**6. GitHub sends you an email**
```
- Open your email inbox
- Find email from "GitHub"
- Click the blue "Verify email address" link
- You're done! ✓
```

**Save these somewhere safe:**
```
GitHub Username: ________________
GitHub Password: ________________
```

---

## 📌 STEP 2: Create Vercel Account

### What is Vercel?
- Free website hosting platform
- Takes your code and puts it on the internet
- So anyone can visit your app

### How to Create Account:

**1. Open new browser tab**

**2. Go to:** `https://vercel.com/signup`

**3. You'll see the Vercel signup page**

**4. Click: "Continue with GitHub"**
```
You'll see a button that says:
"Continue with GitHub" (with GitHub logo)
```

**5. GitHub asks permission**
```
GitHub will show a popup asking:
"Authorize Vercel to access your repositories?"
Click: "Authorize vercel"
```

**6. Vercel asks for team name**
```
It says: "What's your team name?"
Enter: "School Name" or "Happiness Index"
Click: "Create"
```

**7. Check your email**
```
- Vercel sends confirmation email
- Open it and verify
- You're done! ✓
```

**Save:**
```
Vercel Email:    ________________
Vercel Username: ________________
```

---

## 📌 STEP 3: Download Code from v0

### Where is the code?

**In the v0 chat where you're reading this:**

**1. Look for a box that says "Code" or has code in it**

**2. Click the "Download ZIP" button**
```
Usually in the top-right of the code box
Says: "Download ZIP" or has a ⬇️ icon
```

**3. A ZIP file downloads to your computer**
```
Probably in your "Downloads" folder
Named something like: "happiness-index-360.zip"
```

**4. Unzip/Extract the file**
```
Windows: Right-click → "Extract All" → Choose folder
Mac: Double-click (auto-extracts)
```

**5. A folder appears with all the code**
```
Inside you'll see:
- app/ (folder)
- lib/ (folder)
- scripts/ (folder)
- components/ (folder)
- package.json (file)
- etc.
```

**Keep this folder somewhere easy to find** (like Desktop or Documents)

---

## 📌 STEP 4: Upload Code to GitHub

### Method A: Easy Web Upload (No Installation)

**1. Go to GitHub**
- Visit: `https://github.com`
- Log in with your username/password

**2. Create New Repository**
```
- Click "+" (top right)
- Click "New repository"
```

**3. Fill in Repository Details**
```
Repository name: happiness-index-360
Description:     Student Happiness Assessment Platform
Public:          ✓ (make sure it's selected)
```

**4. Click "Create repository"**

**5. You'll see an empty repository page**
```
Shows a message:
"...or upload an existing repository from the command line"
```

**6. Click "uploading an existing file"**
```
It's a link in the blue section
```

**7. Drag and drop your code files**
```
- Take the unzipped folder from Step 3
- Drag the CONTENTS into GitHub
- Don't drag the folder itself, drag what's INSIDE

You should see:
- app/ (folder)
- lib/ (folder)  
- components/ (folder)
- package.json
- etc.
```

**8. Scroll down and click "Commit changes"**

**9. GitHub now has your code!** ✓

---

## 📌 STEP 5: Deploy to Vercel

### Vercel deploys automatically!

**1. Go to Vercel**
- Visit: `https://vercel.com/dashboard`
- Log in with GitHub (use your GitHub account)

**2. You'll see your Vercel Dashboard**
```
Shows:
- "Add New" button (top right)
- Possibly "Import Git Repository" option
```

**3. Click "Add New" → "Project"**

**4. You'll see your GitHub repositories**
```
You should see:
- happiness-index-360 (YOUR repository!)
```

**5. Click the "Import" button next to it**

**6. Vercel shows configuration screen**
```
Just click "Deploy" button (don't change anything)
```

**7. Wait for deployment** (2-3 minutes)
```
You'll see:
- "Building..." (gray)
- "Deploying..." (blue)  
- "Ready" (green) ✓
```

**8. When it says "Ready", click it**

**9. You'll see your live URL:**
```
https://happiness-index-360.vercel.app
```

**COPY THIS URL - You'll need it!**

---

## 📌 STEP 6: Get Supabase Information

### What is Supabase?
- Database (place to store all student data)
- You already have it from v0
- We just need to add its secrets to Vercel

### How to Get Supabase Secrets:

**1. Go to Supabase**
- Visit: `https://supabase.com`
- Log in (or sign up if needed)

**2. Click your project**
```
You should see a project already created
(v0 created it for you)
```

**3. Click "Settings" (left sidebar)**

**4. Click "API" (left sidebar, under Settings)**

**5. You'll see three pieces of information:**
```
Project URL:              https://xxx.supabase.co
anon public key:          eyJ...
service_role key:         eyJ...
(These are long codes, that's normal!)
```

**6. COPY each one somewhere safe**
```
NEXT_PUBLIC_SUPABASE_URL:       https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY:  eyJ...
SUPABASE_SERVICE_ROLE_KEY:      eyJ...
```

---

## 📌 STEP 7: Add Secrets to Vercel

### Vercel needs these secrets to connect to the database

**1. Go back to Vercel**
- Visit: `https://vercel.com/dashboard`

**2. Click your "happiness-index-360" project**

**3. Click "Settings" (top menu, next to "Deployments")**

**4. Click "Environment Variables" (left sidebar)**

**5. You'll see an input form**

**6. Add First Variable:**
```
Name:  NEXT_PUBLIC_SUPABASE_URL
Value: (paste the Project URL from Supabase)
       https://xxx.supabase.co
Click "Add"
```

**7. Add Second Variable:**
```
Name:  NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: (paste the anon public key from Supabase)
Click "Add"
```

**8. Add Third Variable:**
```
Name:  SUPABASE_SERVICE_ROLE_KEY
Value: (paste the service_role key from Supabase)
Click "Add"
```

**9. Go back to "Deployments" tab**

**10. Click the three dots (•••) on the latest deployment**

**11. Click "Redeploy"**

**12. Wait for "Ready"** ✓

---

## 📌 STEP 8: Create Database Tables

### Database needs tables to store data

**1. Go to Supabase**
- Visit: `https://supabase.com`
- Log in
- Click your project

**2. Click "SQL Editor" (left sidebar)**

**3. Click "New Query"**

**4. You'll see a blank text area**

**5. In v0, find this file:**
```
scripts/001_initial_schema.sql
```

**6. Open it and COPY all the text**

**7. PASTE into Supabase query box**

**8. Click "Run" (blue button, bottom right)**

**9. You should see green "success"**

**10. Repeat for these files (in order):**
```
- scripts/002_profile_trigger.sql
- scripts/003_default_questions.sql
- scripts/004_happiness_index_questions.sql
- scripts/005_add_survey_and_analytics.sql
- scripts/006_add_school_branding.sql
```

**For each file:**
1. Copy the SQL code from v0
2. Paste into new Supabase query
3. Click "Run"
4. See green "success"

**When all 6 are done:** ✓

---

## 📌 STEP 9: Test Your App

### Make sure everything works!

**1. Open a new browser tab**

**2. Go to your Vercel URL:**
```
https://happiness-index-360.vercel.app
```

**3. You should see the login page**
```
Shows:
- "Happiness Index 360°"
- Email and password fields
- "Sign Up" link
```

**4. Click "Sign Up"**

**5. Fill in the form:**
```
Email:      admin@school.edu
Password:   Something strong
Confirm:    Same password
Role:       Select "Admin" from dropdown
School:     Type your school name
```

**6. Click "Sign Up"**

**7. Check your email**
```
- GitHub/Vercel sends a confirmation email
- Open it
- Click the blue link to confirm
```

**8. Go back to app and click "Sign In"**
```
Email:    admin@school.edu
Password: Your password
```

**9. Click "Sign In"**

**10. You should see the admin dashboard!**
```
Shows:
- Header with school name
- Sidebar with menu
- Dashboard cards and charts
```

**SUCCESS!** 🎉

---

## 📊 Summary: You're Done!

| Step | Completed |
|------|-----------|
| 1. Create GitHub account | ✓ |
| 2. Create Vercel account | ✓ |
| 3. Download code | ✓ |
| 4. Upload to GitHub | ✓ |
| 5. Deploy to Vercel | ✓ |
| 6. Get Supabase secrets | ✓ |
| 7. Add to Vercel | ✓ |
| 8. Create database tables | ✓ |
| 9. Test the app | ✓ |

**Your app is live!**
```
https://happiness-index-360.vercel.app
```

---

## 🎯 Your Login Info

**Save this somewhere safe:**
```
Admin Email:    admin@school.edu
Admin Password: ________________

GitHub Username:  ________________
Vercel Project:   happiness-index-360
Supabase Project: ________________

Live URL: https://happiness-index-360.vercel.app
```

---

## If Something Goes Wrong

### Problem: "Page not found"
- Wait 5 minutes (Vercel is deploying)
- Hard refresh: Press Ctrl+Shift+R (or Cmd+Shift+R on Mac)

### Problem: "Can't log in"
- Check your email for confirmation link
- Click the link from GitHub/Vercel
- Then try logging in again

### Problem: "Database error"
- Go to Supabase
- Make sure all 6 SQL scripts ran (check for "success")
- If any failed, try running it again

### Problem: Still not working?
- Come back and tell me what you see
- I can help! Just describe the problem

---

## Next Steps

1. ✓ App is deployed
2. → Follow "GETTING_STARTED.md" to set up your school
3. → Upload your school logo
4. → Create your first survey link
5. → Share with students!
