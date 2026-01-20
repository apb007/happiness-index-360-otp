# Deployment Guide - MindWell Mental Health Assessment Platform

## Overview

MindWell is a fully hosted platform with zero setup required. This guide covers deploying to Vercel (free) with a free domain.

## Prerequisites

- GitHub account (for easy deployment)
- Supabase account (provided via integration)
- A free domain (options below)

## Step 1: Deploy to Vercel (Free)

Vercel offers free hosting with automatic deployments from GitHub.

### Option A: Deploy via GitHub (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial MindWell commit"
   git remote add origin https://github.com/YOUR_USERNAME/mindwell.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js configuration
   - Click "Deploy"

3. **Add Environment Variables**
   - In Vercel Dashboard → Settings → Environment Variables
   - Add all variables from your Supabase integration:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `POSTGRES_URL` (if needed for server-side operations)
   - These are already configured in your v0 workspace

### Option B: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

## Step 2: Configure Free Domain

### Option 1: Free .tk/.ml Domain (Recommended for MVP)

Using [Freenom](https://www.freenom.com):

1. Go to [freenom.com](https://www.freenom.com)
2. Search for your desired domain (e.g., `mindwell.tk`)
3. Select 12-month free registration
4. Complete registration (requires free account)
5. Go to Management Tools → My Domains
6. Click on your domain → Manage Domain
7. Go to Management Tools → Nameservers
8. Change to Custom Nameservers:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
9. In Vercel Dashboard → Settings → Domains
   - Add your domain
   - Verify DNS configuration
10. Wait 24-48 hours for DNS propagation

### Option 2: Vercel Provided Domain (Alternative)

Vercel provides a free `.vercel.app` domain automatically:
- Your site will be at: `mindwell.vercel.app`
- No configuration needed
- Professional and reliable

### Option 3: Premium Domain (Production Ready)

For production deployment, consider:
- `.app` domains: ~$12/year (Google Domains, Namecheap)
- `.io` domains: ~$35/year
- `.edu` domains: Free for educational institutions

## Step 3: Database Setup

### Supabase Setup (Already Configured)

Your Supabase database is already set up with:
- ✓ Authentication enabled
- ✓ Row-Level Security (RLS) policies
- ✓ All tables created
- ✓ Free tier: 500MB storage, unlimited API calls

### Run Database Migrations

The SQL scripts in `/scripts` have been prepared. You can run them:

1. **Via Supabase Dashboard**
   - Go to SQL Editor
   - Copy/paste content from `scripts/001_initial_schema.sql`
   - Execute
   - Repeat for `002_profile_trigger.sql` and `003_default_questions.sql`

2. **Via v0 Scripts Folder** (Recommended)
   - The scripts folder in your v0 project can execute SQL directly
   - Execute in order: 001, 002, 003

## Step 4: Verify Deployment

After deployment:

1. **Test Authentication**
   - Visit your domain
   - Create a test account
   - Verify email confirmation works

2. **Test Assessment Flow**
   - As a student, complete an assessment
   - Verify results display correctly
   - Check that alerts are created

3. **Test Teacher Dashboard**
   - Create a teacher account
   - Verify student data displays
   - Check filtering and sorting

4. **Test Admin Dashboard**
   - Create an admin account
   - Verify analytics display
   - Test CSV export

## Environment Variables Checklist

These should already be set in your Supabase integration:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
POSTGRES_URL=postgresql://...
```

## Monitoring & Maintenance

### Vercel Analytics
- Monitor performance at Vercel Dashboard
- Automatic HTTPS/SSL enabled
- CDN caching enabled by default

### Supabase Monitoring
- Storage usage at Supabase Dashboard
- Real-time database stats
- Free tier limits: 500MB storage

### Scaling Considerations

When you outgrow free tier:

**Vercel Pro**: $20/month
- 100GB bandwidth included
- Advanced analytics

**Supabase Pro**: $25/month
- 1GB storage
- Priority support

## Troubleshooting

### Domain not resolving
- Wait 24-48 hours for DNS propagation
- Verify nameservers in Freenom match Vercel
- Check Vercel domain settings

### Students can't confirm email
- Check `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` environment variable
- Ensure callback URL matches your domain

### RLS policies blocking access
- Check that user is authenticated in browser
- Verify profile table has user data
- Check RLS policies in Supabase Dashboard

### Database errors
- Verify all SQL scripts executed successfully
- Check that tables exist in Supabase
- Ensure RLS policies are enabled on tables

## Cost Summary

| Service | Free Tier | Cost |
|---------|-----------|------|
| Vercel Hosting | Yes | $0/month |
| Supabase Database | 500MB | $0/month |
| Freenom Domain | .tk/.ml for 1 year | $0 |
| HTTPS/SSL | Yes | Included |
| **Total** | | **$0/month** |

## Next Steps

1. Deploy to Vercel
2. Configure free domain
3. Run database migrations
4. Create test accounts for each role
5. Test complete assessment workflow
6. Share with stakeholders

## Support

- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs
