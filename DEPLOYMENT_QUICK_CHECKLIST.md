# Deployment Quick Checklist ✓

## Before You Start
- [ ] Computer with web browser (Chrome, Firefox, Safari, Edge)
- [ ] Your email address
- [ ] The v0 code downloaded from v0 (the ZIP file)

## Step 1: Create Accounts (5 minutes)
- [ ] GitHub: https://github.com/signup
  - Email: ________
  - Password: ________
  - Username: ________
- [ ] Vercel: https://vercel.com/signup
  - Sign up with GitHub (easiest)

## Step 2: Upload Code (3 minutes)
- [ ] Go to https://github.com/new
- [ ] Create repo: "happiness-index-360"
- [ ] Upload ZIP file contents
- [ ] Commit changes

## Step 3: Deploy (2 minutes)
- [ ] Go to Vercel Dashboard: https://vercel.com/dashboard
- [ ] Click "Add New" → "Project"
- [ ] Select "happiness-index-360"
- [ ] Click "Deploy"
- [ ] **COPY YOUR URL:**
  ```
  https://happiness-index-360.vercel.app
  ```

## Step 4: Environment Variables (2 minutes)
- [ ] Get from Supabase (https://supabase.com)
  - [ ] NEXT_PUBLIC_SUPABASE_URL
  - [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
  - [ ] SUPABASE_SERVICE_ROLE_KEY
- [ ] Add to Vercel → Project Settings → Environment Variables
- [ ] Redeploy project

## Step 5: Database Setup (5 minutes)
- [ ] Supabase → SQL Editor → New Query
- [ ] Copy/paste and run each script in order:
  - [ ] scripts/001_initial_schema.sql
  - [ ] scripts/002_profile_trigger.sql
  - [ ] scripts/003_default_questions.sql
  - [ ] scripts/004_happiness_index_questions.sql
  - [ ] scripts/005_add_survey_and_analytics.sql
  - [ ] scripts/006_add_school_branding.sql

## Step 6: Test (2 minutes)
- [ ] Visit: https://happiness-index-360.vercel.app
- [ ] Click "Sign Up"
- [ ] Create admin account
- [ ] You should see admin dashboard

## Done! 🎉
- [ ] App is live at: https://happiness-index-360.vercel.app
- [ ] Next: Read GETTING_STARTED.md for setup

---

## Your Deployment Info

| What | Value |
|------|-------|
| GitHub Username | ________________ |
| GitHub Repo | happiness-index-360 |
| Vercel Project | happiness-index-360 |
| Live URL | https://happiness-index-360.vercel.app |
| Supabase Project | ________________ |

---

## Troubleshooting Quick Links

- Build failed? Check Vercel Deployments tab for error
- Can't log in? Check email for confirmation link
- No tables? Run SQL scripts again in Supabase
- Page not found? Wait 5 minutes and refresh
