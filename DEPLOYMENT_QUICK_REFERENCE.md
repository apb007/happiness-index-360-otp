# Deployment Quick Reference Card

## 🔗 Websites You'll Need

| Website | What For |
|---------|----------|
| https://github.com | Store your code |
| https://vercel.com | Host your app |
| https://supabase.com | Store student data |

---

## 📝 Account Creation Checklist

**GitHub:**
- [ ] Go to https://github.com
- [ ] Click "Sign up"
- [ ] Email: admin@school.edu
- [ ] Password: [strong password]
- [ ] Username: [something easy]
- [ ] Verify email from inbox
- [ ] Done!

**Vercel:**
- [ ] Go to https://vercel.com/signup
- [ ] Click "Continue with GitHub"
- [ ] Authorize Vercel
- [ ] Enter team name: "School Name"
- [ ] Done!

---

## 📦 Uploading Code

1. Download ZIP from v0
2. Extract/unzip it
3. Go to GitHub
4. Create new repository: "happiness-index-360"
5. Upload code files (drag & drop)
6. Commit changes

---

## 🚀 Deploying to Vercel

1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Select "happiness-index-360"
4. Click "Deploy"
5. **SAVE YOUR URL:** https://happiness-index-360.vercel.app

---

## 🔑 Adding Secrets

1. Get from Supabase → Settings → API:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY

2. Add to Vercel → Settings → Environment Variables

3. Redeploy project

---

## 📊 Database Setup

In Supabase SQL Editor, run these scripts (in order):
1. scripts/001_initial_schema.sql
2. scripts/002_profile_trigger.sql
3. scripts/003_default_questions.sql
4. scripts/004_happiness_index_questions.sql
5. scripts/005_add_survey_and_analytics.sql
6. scripts/006_add_school_branding.sql

---

## ✅ Test Your App

1. Visit: https://happiness-index-360.vercel.app
2. Click "Sign Up"
3. Create admin account
4. Check email for confirmation
5. Log in
6. See admin dashboard

**If you see the dashboard, you're done!** 🎉

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Page not found | Wait 5 min, hard refresh (Ctrl+Shift+R) |
| Can't log in | Check email for confirmation link |
| Database error | Verify all 6 SQL scripts ran successfully |
| Deploy failed | Check Vercel Deployments for error message |

---

## 📍 Your Deployment Info

```
GitHub Username:    ________________________
GitHub Repo:        happiness-index-360
Vercel Project:     happiness-index-360
Live URL:           https://happiness-index-360.vercel.app
Admin Email:        admin@school.edu
Admin Password:     ________________________
Supabase Project:   ________________________
```

---

## 📚 Full Guides

For more detailed help, see:
- `DEPLOY_WITHOUT_TERMINAL.md` - Complete step-by-step
- `STEP_BY_STEP_VISUAL_GUIDE.md` - With explanations
- `DEPLOYMENT_QUICK_CHECKLIST.md` - Just the checklist
