# Complete Setup Guide

## Overview

This guide walks you through setting up MindWell from scratch to live deployment.

## Part 1: Local Development Setup

### 1.1 Clone and Install

```bash
git clone https://github.com/your-username/mindwell.git
cd mindwell
npm install
```

### 1.2 Supabase Configuration

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
   - Project name: MindWell
   - Database password: [Generate strong password]
   - Region: Choose closest to you
3. Wait for project to initialize (2-3 minutes)

### 1.3 Environment Variables

Create `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
POSTGRES_URL=postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_ID.supabase.co:5432/postgres
```

Get these from Supabase Dashboard → Settings → API

### 1.4 Initialize Database

Option A: Using Supabase Dashboard
1. Go to SQL Editor in Supabase Dashboard
2. Create new query
3. Copy content from `/scripts/001_initial_schema.sql`
4. Click "Run"
5. Repeat for 002 and 003 scripts

Option B: Using v0 Scripts (if available)
- Use the scripts folder to execute SQL files

### 1.5 Start Development

```bash
npm run dev
```

Visit `http://localhost:3000`

### 1.6 Create Test Accounts

1. Go to Sign Up page
2. Create accounts with different roles:
   - Student: test-student@school.edu
   - Teacher: test-teacher@school.edu
   - Principal: test-principal@school.edu
3. Confirm emails via Supabase Auth

## Part 2: Deployment to Vercel

### 2.1 Prepare for Deployment

```bash
# Test build locally
npm run build

# Check for TypeScript errors
npm run lint

# Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2.2 Deploy to Vercel

#### Option A: Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Select your mindwell repository
5. Vercel auto-detects Next.js
6. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
7. Click "Deploy"
8. Wait for build to complete (~2 minutes)

#### Option B: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
# Follow prompts
```

### 2.3 Verify Deployment

- Visit your Vercel URL (e.g., `mindwell.vercel.app`)
- Test sign up flow
- Verify emails are sent
- Test assessment submission

## Part 3: Domain Configuration

### 3.1 Using Vercel's Free Domain

No setup needed! Your site is automatically available at:
```
https://mindwell.vercel.app
```

This is professional and works great for MVP/pilot phases.

### 3.2 Using Free Freenom Domain (Optional)

1. Go to [freenom.com](https://www.freenom.com)
2. Search domain name (e.g., mindwell.tk)
3. Select 12 months FREE
4. Complete registration
5. My Domains → Manage Domain
6. Management Tools → Nameservers
7. Custom Nameservers:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
8. In Vercel Dashboard:
   - Settings → Domains
   - Add your domain
   - Wait 24-48 hours for DNS

### 3.3 Using Custom Domain (Production)

1. Purchase domain (e.g., mindwellhealth.app)
2. In Vercel:
   - Settings → Domains
   - Add your domain
   - Follow DNS instructions for your registrar
3. Update registrar nameservers or DNS records
4. Verify in Vercel (usually 24 hours)

## Part 4: Production Configuration

### 4.1 Environment Variables for Production

In Vercel Dashboard → Settings → Environment Variables, add:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
POSTGRES_URL=postgresql://...
```

### 4.2 Supabase Production Settings

1. Go to Supabase Dashboard
2. Settings → SSL
   - Enable SSL enforcement
3. Settings → Security
   - Configure CORS origins
4. Auth → Email Templates
   - Customize email messages
   - Set correct callback URLs

### 4.3 Enable Email Verification

In Supabase:
1. Auth → Settings
2. User signup: Enable Confirm email before signing in
3. Email template: Update to match your domain

## Part 5: Testing Checklist

- [ ] User can sign up with email
- [ ] Confirmation email received
- [ ] User can log in
- [ ] Student can complete assessment
- [ ] Results display correctly
- [ ] Risk alerts created
- [ ] Teacher can see student data
- [ ] Principal can see analytics
- [ ] Admin can export data
- [ ] Mobile responsive

## Part 6: Launch

### Pre-Launch

1. Create test user accounts
2. Document login credentials
3. Prepare user onboarding materials
4. Set up support email

### Launch Day

1. Share login URL with users
2. Monitor error logs
3. Respond to support emails
4. Track usage metrics

### Post-Launch

1. Monitor Vercel analytics
2. Check Supabase storage usage
3. Review user feedback
4. Plan future improvements

## Troubleshooting

### Can't access Supabase

- Verify URL is correct
- Check anon key is correct
- Ensure firewall allows requests

### Build fails on Vercel

- Check Node.js version (18+)
- Review build logs
- Ensure all env vars set

### Email not sending

- Verify Supabase email auth enabled
- Check SMTP configuration
- Test with Supabase dashboard

### Database errors

- Verify SQL scripts executed
- Check RLS policies
- Ensure user is authenticated

## Getting Help

- Vercel Support: https://vercel.com/help
- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs
- GitHub Issues: Report bugs

## Next Steps

1. Configure analytics
2. Set up monitoring
3. Create admin documentation
4. Plan customizations
5. Schedule regular backups
