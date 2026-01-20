# Administrator Guide

## Overview

This guide covers managing MindWell as a school administrator or system admin.

## User Management

### Creating User Accounts

Users create accounts through sign-up, but you can pre-create accounts:

1. Share sign-up link: `https://your-domain/auth/sign-up`
2. Users select their role during signup
3. Users confirm email
4. Account is active

### User Roles

#### Student
- Takes assessments
- Views personal results
- Sees assessment history
- Can retake assessments anytime

#### Teacher
- Views assessments from students in their classes
- Monitors class health
- Receives alerts for at-risk students
- Can filter and search students

#### Principal/Admin
- School-wide dashboard
- All student and teacher data
- Export capabilities
- Alert management

#### System Admin
- Multi-school management
- System-wide analytics
- Account provisioning

## Assessment Management

### Default Questions

The platform comes with 8 default questions. To customize:

1. Edit `/lib/scoring.ts`
2. Modify `DEFAULT_QUESTIONS` array
3. Update `maxScore` if adding/removing questions
4. Redeploy to Vercel

### Scoring Configuration

Risk levels are determined by:
- **Low**: 0-40%
- **Moderate**: 40-60%
- **High**: 60-80%
- **Critical**: 80-100%

To adjust:
1. Edit `/lib/scoring.ts`
2. Modify `DEFAULT_SCORING_CONFIG.thresholds`
3. Redeploy

### Alert System

Alerts are automatically created when students score high or critical. To review:

1. Go to Alerts page
2. View all active alerts
3. Click "Resolve" when addressed
4. Resolved alerts archived

## Dashboard Metrics

### Overview Dashboard Shows
- Total students
- Total classes
- Total assessments completed
- Students at high/critical risk
- Risk distribution pie chart
- Risk level summary

### Class Management
- All classes and enrollment
- Teacher assignments
- Student count per class
- At-risk student count

### Student Management
- All students school-wide
- Latest assessment scores
- Risk levels
- Search and filter
- Assessment history

### Reports & Export
- CSV export of all assessments
- Includes: student ID, score, risk level, date
- Import into Excel/Google Sheets
- FERPA compliant data

## Data Management

### Viewing Assessment Data

1. Go to Reports page
2. View summary statistics
3. Click "Download CSV Report"
4. Opens assessment data in Excel

### Student Assessment History

1. Go to Students page
2. Click on student name
3. View all assessment results
4. See trend over time

### Privacy & Security

- All data protected by RLS (Row Level Security)
- Only authorized users see student data
- Emails not visible to students
- FERPA compliant

## Troubleshooting

### Student can't sign up

**Solution:**
- Check email syntax
- Verify Supabase auth enabled
- Check email confirmation

### Assessment not submitting

**Solution:**
- Verify student is authenticated
- Check database connection
- Review browser console for errors

### Missing student data

**Solution:**
- Ensure student email is confirmed
- Verify student enrolled in class
- Check RLS policies in Supabase

### Can't export data

**Solution:**
- Verify you have admin role
- Check school_id is set
- Ensure assessments exist

## Maintenance

### Regular Tasks

#### Daily
- Review alerts
- Check for system errors

#### Weekly
- Review assessment completion rates
- Check for at-risk students
- Monitor database usage

#### Monthly
- Export data for records
- Review usage metrics
- Plan improvements

### Database Backup

Supabase automatically backs up your database. To download:

1. Go to Supabase Dashboard
2. Settings → Backups
3. Download latest backup
4. Store securely

### Monitoring

#### Vercel Analytics
- Visit Vercel Dashboard
- View page loads, errors, performance
- Monitor traffic patterns

#### Supabase Usage
- Go to Supabase Dashboard
- View storage usage
- Monitor API calls
- Check auth logs

## Security

### Best Practices

1. **Strong Passwords**
   - All users should use strong passwords
   - Admin accounts especially critical

2. **Email Verification**
   - Require email confirmation
   - Check Supabase auth settings

3. **Regular Backups**
   - Download Supabase backups monthly
   - Store in secure location

4. **Access Control**
   - Only admins access analytics
   - Teachers see only their classes
   - Students see only own data

### FERPA Compliance

- Student data protected by RLS
- Assessments are anonymous (ID only)
- Teachers can't see other teachers' classes
- Detailed logging of access

## Customization

### Branding

To customize colors/branding:

1. Edit `/app/globals.css`
2. Change color tokens:
   ```css
   --primary: oklch(...);  /* Main color */
   --accent: oklch(...);   /* Alert color */
   ```
3. Redeploy to Vercel

### Questions

To modify assessment questions:

1. Edit `/lib/scoring.ts`
2. Update `DEFAULT_QUESTIONS` array
3. Adjust `maxScore` if needed
4. Redeploy

### Resources

To update support resources shown after assessment:

1. Edit `/app/dashboard/student/results/page.tsx`
2. Modify `getRiskInfo()` function
3. Update resources for each risk level
4. Redeploy

## Getting Help

- Email: admin@mindwellhealth.edu
- Vercel Support: https://vercel.com/help
- Supabase Support: https://supabase.com/support
- Documentation: See README.md

---

**Last Updated:** January 2026
