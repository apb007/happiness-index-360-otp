# Complete Deployment Checklist

## Pre-Deployment Setup (15 minutes)

### 1. Environment Variables
Verify these are set in your Vercel project:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DATABASE_URL=your_postgres_url
```

**Where to get these**:
- Go to Supabase Dashboard → Settings → API Keys
- Copy the values and paste into Vercel → Settings → Environment Variables

### 2. Database Migrations
Run these SQL scripts in Supabase SQL Editor (in order):

1. Execute: `scripts/001_initial_schema.sql`
   - Creates all base tables
   - Takes ~30 seconds
   
2. Execute: `scripts/002_profile_trigger.sql`
   - Creates automatic profile trigger
   - Takes ~10 seconds
   
3. Execute: `scripts/003_default_questions.sql`
   - Creates placeholder questions
   - Takes ~5 seconds
   
4. Execute: `scripts/004_happiness_index_questions.sql`
   - Inserts 32 Happiness Index questions
   - Takes ~5 seconds
   
5. Execute: `scripts/005_add_survey_and_analytics.sql`
   - Adds survey & analytics tables
   - Takes ~10 seconds

**Total time**: ~60 seconds

### 3. Test Database Connection
Run this in Supabase SQL Editor:

```sql
SELECT COUNT(*) as question_count FROM public.questions;
-- Should return: 33 (1 placeholder + 32 questions)
```

---

## Deployment Steps (5 minutes)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Complete Happiness Index 360° implementation"
git push origin main
```

### Step 2: Deploy to Vercel
Option A: Manual Deploy
1. Go to vercel.com
2. Select your project
3. Click "Deploy"
4. Wait 2-3 minutes

Option B: Auto Deploy (Recommended)
- Vercel automatically deploys when you push to GitHub
- Check Vercel dashboard for deployment status
- Should see green checkmark when complete

### Step 3: Verify Deployment
1. Go to `https://[your-vercel-url].vercel.app`
2. You should see the login page
3. Try creating an account
4. Verify assessment form loads

### Step 4: Test Full Flow
1. **Sign up** as Principal/Admin
2. **Create a class**
3. **Create a public survey link**
4. **Copy the survey link** (looks like: `https://[domain].com/survey/[token]`)
5. **Open link in incognito window** (to test as student)
6. **Complete assessment** (answer all 32 questions)
7. **Submit** and see results page
8. **Go back to admin dashboard**
9. **Check Reports page** - should see 1 new assessment
10. **Download CSV** - should include your test response

---

## Post-Deployment Configuration (10 minutes)

### 1. Custom Domain (Optional)
If using free domain:

**Option A: Freenom (.tk, .ml)**
1. Go to freenom.com
2. Search for domain
3. Register for 1 year (free)
4. Go to Management → Nameservers
5. Set nameservers to Vercel's:
   - ns1.vercel-dns.com
   - ns2.vercel-dns.com
6. Go to Vercel → Project Settings → Domains
7. Add your domain
8. Wait 24-48 hours for DNS propagation

**Option B: Vercel Free Domain**
1. Use `[project-name].vercel.app` (no additional setup)
2. This is your default domain

### 2. Email Configuration (Optional)
For password reset emails:

Currently uses Supabase Auth emails. To add custom emails:
1. Go to Supabase → Auth → Email Templates
2. Customize if desired
3. Or integrate Resend (free 100/month): 
   - Go to Supabase → Auth → Email Provider
   - Select "Custom Email"
   - Add Resend API key

### 3. Test Email Verification
1. Sign up with a new email
2. Check spam/inbox for verification email
3. Click link to confirm email
4. Login should now work

---

## First Use Walkthrough (20 minutes)

### Administrator Setup

#### Step 1: Create School
1. Sign up at `https://[your-domain].com/auth/sign-up`
2. Select **"Principal/Administrator"** role
3. Create password
4. Click confirmation email link
5. Fill in school info:
   - School name: "Lincoln High School" (example)
   - District (optional)
   - Phone (optional)

#### Step 2: Create Classes
1. Go to **Dashboard → Classes**
2. Click **"+ New Class"**
3. Create 2-3 test classes:
   - Class: "10th Grade Biology"
   - Grade: "10"
   - Teacher: Select from dropdown
4. Save

#### Step 3: Create Student Accounts (Optional)
1. Go to **Dashboard → Users**
2. Click **"+ Add Student"**
3. Enter student info:
   - Email: john@school.com
   - Password: (auto-generate)
4. Repeat for 5-10 test students
5. Optional: Assign students to classes

#### Step 4: Create Public Survey Link
1. Go to **Dashboard → Principal → Public Survey Links**
2. Click **"+ New Survey Link"**
3. Copy the link shown
4. Share with students via email or QR code

---

## Student Testing

### Send Email to Students
```
Subject: Help with Happiness Survey

Hi Students,

Please take 10 minutes to complete our Happiness Index 360° survey.
Your honest responses help us support your wellbeing.

Link: [PASTE SURVEY LINK HERE]

The survey is completely anonymous - no login required.

Thanks!
- [Your School]
```

### Expected Student Experience
1. Click link
2. See 32 questions
3. Answer each (Never/Rarely/Sometimes/Often/Always)
4. Click "Next" to navigate
5. Submit final answer
6. See results page with:
   - Happiness Index score (0-100)
   - Risk level (critical/high/moderate/low)
   - Personal resources
   - Crisis contacts
7. See thank you page with crisis resources

---

## Viewing Results

### After Students Complete Surveys

#### View in Dashboard
1. Go to **Dashboard → Reports**
2. See:
   - **School Average**: Overall score (0-100)
   - **Total Students**: Number who took assessment
   - **Assessments**: Number completed
   - **At Risk**: Students in high/critical categories
   - **Pie Chart**: Risk distribution
   - **Class Breakdown**: Each class's average

#### View Class Average
1. Go to **Dashboard → Classes**
2. Click on class
3. See student list with scores
4. Calculate average manually or export CSV

#### Export Data
1. Go to **Dashboard → Reports**
2. Click **"Download CSV Report"**
3. Open in Excel/Google Sheets
4. See all assessment data:
   - Student names
   - Scores (raw and scaled)
   - Risk levels
   - Dates

---

## Troubleshooting

### Problem: "Database connection failed"
**Solution**:
- Verify environment variables in Vercel
- Check Supabase project is running
- Run SQL test query in Supabase console

### Problem: "Questions not loading"
**Solution**:
- Verify SQL script 004 was executed
- Run this in Supabase SQL:
```sql
SELECT COUNT(*) FROM public.questions;
-- Should return 33
```

### Problem: "Can't download CSV"
**Solution**:
- Ensure you're admin role
- Try different browser
- Check internet connection
- Contact support if persistent

### Problem: "Survey link not working"
**Solution**:
- Copy full URL (including domain)
- Verify token is correct
- Try in incognito window
- Check if token was recently created

### Problem: "Can't see student results"
**Solution**:
- Wait 30 seconds after submission
- Refresh page (Ctrl+R or Cmd+R)
- Check if assessment actually submitted
- View CSV export to verify

---

## Security Verification Checklist

- [ ] HTTPS enabled (should see 🔒 in browser)
- [ ] Passwords are hashed (try incorrect password, should deny)
- [ ] Row-Level Security working (student can't see other students)
- [ ] Teachers see only their classes (not all classes)
- [ ] Admins see school data (not other schools)
- [ ] Survey tokens are unique
- [ ] CSV downloads are restricted to admins only

---

## Monitoring After Launch

### Weekly Checklist
- [ ] Check school average score (Dashboard → Overview)
- [ ] Review new at-risk students
- [ ] Respond to any critical/high risk alerts
- [ ] Monitor response rate

### Monthly Checklist
- [ ] Export CSV report
- [ ] Analyze trends
- [ ] Share report with teachers
- [ ] Plan interventions

### Quarterly Checklist
- [ ] Review compliance (GDPR/COPPA/FERPA)
- [ ] Check data retention policies
- [ ] Verify backup status
- [ ] Update parent communications

---

## Success Metrics

### Initial Launch
- ✓ All pages load without errors
- ✓ Students can complete assessment
- ✓ Results display correctly
- ✓ Admins can view/export data

### First Week
- Target: 50+ student responses
- Monitor: 0-1 critical risk cases
- Goal: Establish baseline data

### First Month
- Target: 80%+ student completion rate
- Monitor: Trends in scores
- Goal: Identify support needs

### Ongoing
- Monitor: Class averages vs. school average
- Track: Improvement over time
- Measure: Intervention effectiveness

---

## Support Resources

If you need help:

1. **Technical Issues**: 
   - See DATA_SECURITY.md
   - Check Vercel status page
   - Check Supabase status page

2. **Setup Questions**:
   - See GETTING_STARTED.md
   - See SURVEY_SHARING_GUIDE.md

3. **Compliance Questions**:
   - See DATA_SECURITY.md (full GDPR/COPPA/FERPA guide)
   - See YOUR_QUESTIONS_ANSWERED.md

4. **Data Questions**:
   - See YOUR_QUESTIONS_ANSWERED.md
   - See IMPLEMENTATION_SUMMARY.md

---

## Final Checklist Before Going Live

- [ ] All SQL migrations executed
- [ ] Environment variables set
- [ ] Test assessment completed
- [ ] Results display correctly
- [ ] CSV export works
- [ ] Teachers can see their classes
- [ ] Admins can see all data
- [ ] Survey link works in incognito
- [ ] Domain configured (or using vercel.app)
- [ ] Parent notification sent (if needed)
- [ ] Staff trained on dashboard
- [ ] Data privacy policy available
- [ ] Crisis resources displayed in results
- [ ] Backup confirmed working
- [ ] Monitoring setup complete

---

**Deployment Status**: Ready for Production ✓
**Estimated Setup Time**: ~45 minutes
**First Survey Deployment**: Same day
**Data Ready for Analysis**: 1 week (after student responses)

Questions? See the other documentation files or contact support.
