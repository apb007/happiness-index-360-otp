# Quick Reference Guide

## The Survey Link You Need

### Where to Find It

1. **Login as Administrator**
   - URL: `https://[your-domain].com`
   - Login with admin email/password

2. **Create Survey Link**
   - Click: **Dashboard → Principal → Public Survey Links**
   - Click: **"+ New Survey Link"**
   - Copy the generated link

3. **Your Survey Link Will Look Like**
   ```
   https://[your-domain].com/survey/a7b2c8d9e1f4g5h6
   ```
   (The token is auto-generated, yours will be different)

### How to Share It

- **Email**: Paste link in email, students click to complete
- **QR Code**: Go to qrcode.com, paste link, print/display
- **Learning Management System**: Paste in Canvas, Google Classroom, etc.
- **School Website**: Add link to announcements
- **Classroom**: Display on board, students click from phone

---

## Where to Find Your Data

### Student Results Location

**Dashboard → Reports**

You'll see:
- **School Average Happiness Index**: Single number (0-100)
- **Risk Distribution Pie Chart**: Visual breakdown
- **Class Averages Bar Chart**: Each class's score
- **CSV Download Button**: Click to get Excel file

### CSV File Contents

File name: `happiness-index-report-2026-01-13.csv`

Contains columns:
```
Student ID | Name | Email | Raw Score | Scaled Score | Risk Level | Date
student-1  | John | john@ | 96        | 50           | moderate   | 2026-01-13
student-2  | Jane | jane@ | 128       | 75           | high       | 2026-01-13
```

---

## Key Numbers to Remember

### Scoring Scale
- **Raw Score Range**: 32 (minimum) to 160 (maximum)
- **Scaled Score Range**: 0 (low wellbeing) to 100 (excellent wellbeing)

### Risk Levels
| Risk Level | Scaled Score | Action |
|-----------|-------------|--------|
| Critical | 75-100 | Immediate counselor referral |
| High | 50-75 | Counselor meeting recommended |
| Moderate | 25-50 | Monitor and offer support |
| Low | 0-25 | Continue positive practices |

### Assessment Length
- **32 questions** total
- **Time needed**: 10 minutes average
- **Likert scale**: 1 = Never, 5 = Always

---

## Main Dashboard Views

### Administrator Dashboard (Main View)
Shows:
- School average score (large number at top)
- Total students assessed
- Total classes
- Total assessments
- At-risk student count
- Risk distribution pie chart
- Class comparison bar chart

### Teacher Dashboard
Shows:
- Their assigned classes (cards)
- Student count per class
- At-risk count per class
- Click to see individual class details

### Student Dashboard (After Assessment)
Shows:
- Their score with color-coded gauge
- Risk level interpretation
- Personal recommendations
- Link to see full history

---

## Common Tasks

### Task 1: Share First Survey
1. Go to Dashboard
2. Click **Principal → Public Survey Links**
3. Click **"+ New Survey Link"**
4. Copy link
5. Email to students
6. Done!

### Task 2: Check Results
1. Go to **Dashboard → Reports**
2. See school average score
3. See pie chart of risk levels
4. See bar chart of class averages

### Task 3: Download Data for Excel
1. Go to **Dashboard → Reports**
2. Scroll to "Data Export"
3. Click **"Download CSV Report"**
4. Open file in Excel
5. Analyze as needed

### Task 4: View Individual Student History
1. Go to **Dashboard → Students**
2. Click student name
3. See all past assessments
4. See line chart of scores over time

### Task 5: See Class Breakdown
1. Go to **Dashboard → Classes**
2. Click on a class
3. See all students in class with latest scores
4. See at-risk count
5. Click student for full history

---

## Important URLs

### Public Sites
- **Login**: `https://[your-domain].com/auth/login`
- **Sign Up**: `https://[your-domain].com/auth/sign-up`
- **Student Survey**: `https://[your-domain].com/survey/[token]`
- **Thank You Page**: `https://[your-domain].com/survey/[token]/thank-you`

### Admin Pages (Login Required)
- **Dashboard Home**: `https://[your-domain].com/dashboard`
- **Reports/Analytics**: `https://[your-domain].com/dashboard/principal`
- **Survey Links**: `https://[your-domain].com/dashboard/principal/surveys`
- **Data Export**: `https://[your-domain].com/dashboard/principal/reports`
- **Classes**: `https://[your-domain].com/dashboard/principal/classes`
- **Students**: `https://[your-domain].com/dashboard/principal/students`
- **Alerts**: `https://[your-domain].com/dashboard/principal/alerts`

### Teacher Pages (Login Required)
- **Dashboard**: `https://[your-domain].com/dashboard/teacher`
- **My Classes**: `https://[your-domain].com/dashboard/teacher`
- **All Students**: `https://[your-domain].com/dashboard/teacher/students`
- **Alerts**: `https://[your-domain].com/dashboard/teacher/alerts`

### Student Pages (Login Required)
- **Take Assessment**: `https://[your-domain].com/dashboard/student`
- **View Results**: `https://[your-domain].com/dashboard/student/results`
- **History**: `https://[your-domain].com/dashboard/student/history`

---

## Crisis Resources (Auto-Shown in Results)

These are automatically displayed to students who score high risk:

- **National Suicide Prevention Lifeline**: 988 (call or text)
- **Crisis Text Line**: Text HOME to 741741
- **School Counselor**: Available during school hours

---

## Data Security Summary

### Who Can See What?

| Role | Can See |
|------|---------|
| Student | Only their own assessments |
| Teacher | Their class students' assessments |
| Principal/Admin | All school assessments |
| Others | Nothing (access denied) |

### Data Protection

✓ Encrypted in transit (HTTPS/TLS 1.3)
✓ Encrypted at rest (AES-256)
✓ Password hashing (bcrypt)
✓ Row-Level Security at database level
✓ Audit logging for all admin access
✓ No data shared with third parties
✓ GDPR/COPPA/FERPA compliant

---

## Support Docs

| Need Help With... | See... |
|------------------|--------|
| General setup | GETTING_STARTED.md |
| Sharing surveys | SURVEY_SHARING_GUIDE.md |
| Data privacy | DATA_SECURITY.md |
| Your questions answered | YOUR_QUESTIONS_ANSWERED.md |
| Full implementation | IMPLEMENTATION_SUMMARY.md |
| Deployment | DEPLOYMENT_CHECKLIST.md |
| This quick ref | QUICK_REFERENCE.md |

---

## Key Statistics to Track

### Baseline (First Assessment)
- Record school average score
- Note number of students assessed
- Count at-risk students (high + critical)

### Monthly
- Compare school average to baseline
- Track response rate (% of students assessed)
- Monitor at-risk count (should decrease over time)

### Quarterly
- Analyze class-by-class trends
- Calculate improvement percentage
- Identify most at-risk groups

---

## Before You Start

✓ Deploy to Vercel
✓ Run SQL migrations in Supabase
✓ Create admin account
✓ Test end-to-end (take a sample assessment)
✓ Create first public survey link
✓ Share link with students or test group
✓ Wait for responses
✓ Download CSV to verify data
✓ Share findings with staff

---

## Year 1 Timeline

**Month 1**: Launch & Baseline
- Create school account
- Deploy surveys
- Get 50-100 student responses
- Establish baseline metrics

**Months 2-6**: Ongoing Assessment
- Monthly or quarterly surveys
- Track trends
- Implement interventions
- Monitor at-risk students

**Months 6-12**: Analysis & Planning
- Review annual data
- Compare baseline to latest
- Plan next year's approach
- Train new staff

---

**Version**: 1.0
**Last Updated**: January 2026
**Status**: Ready to Use ✓
