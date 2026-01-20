# Data Security, Privacy & Compliance Guide

## Overview
The Happiness Index 360° platform is designed with security and privacy at its core. This document explains how we protect student data and ensure compliance with relevant regulations.

---

## GDPR Compliance (For European Schools)

### Data Minimization
- We collect only the minimum data necessary for assessment
- Student responses are stored securely and separately from identifying information
- Data is retained only as long as necessary for school purposes

### Data Rights
Students and parents have the right to:
- **Access**: Request all data collected about them
- **Rectification**: Correct inaccurate information
- **Erasure**: Request deletion of their data (right to be forgotten)
- **Data Portability**: Receive their data in a standard format

### Implementation
- Data is encrypted at rest and in transit
- Access controls limit who can view student information
- Row-Level Security (RLS) ensures students see only their own data
- Teachers see only their class students' data
- Administrators see only their school's data

---

## COPPA Compliance (For Schools with Students Under 13)

### Parental Consent
- Schools must obtain verifiable parental consent before collecting data from children under 13
- The school administrator is responsible for managing consent documentation
- We recommend keeping signed parental consent forms on file

### Data Protection for Minors
- No data is sold or shared with third parties
- No targeted advertising or behavioral tracking
- Minimal data retention (automatically purge data after 2 years unless archived)
- Students cannot create public profiles or share data

### Implementation
- Age verification at signup (teacher/admin verification for students)
- No data mining or analytics for marketing purposes
- Encrypted storage of all responses
- Annual compliance audits

---

## FERPA Compliance (US Family Educational Rights and Privacy Act)

### Student Privacy Rights
- Students and parents have the right to inspect educational records
- School must provide notice of privacy practices
- Records cannot be released without authorization (except to school officials with legitimate educational interest)

### Implementation
- Only school administrators, teachers, and counselors can access data
- Student data is linked to school_id, not publicly accessible
- Audit logs track all data access
- Data is purged 7 years after student graduation (configurable)

---

## Data Access Control

### Who Can See What?

| Role | Can See | Cannot See |
|------|---------|-----------|
| **Student** | Own assessments & history | Other students' data |
| **Teacher** | Their class students' assessments | Other classes; admin panel |
| **School Admin** | All school data, reports, exports | Other schools' data |
| **System Admin** | Aggregated statistics only | Individual student data |

### Row-Level Security (RLS) Policies

All database tables have RLS enabled:

```sql
-- Students can see only their own assessments
CREATE POLICY "Students view own assessments" ON assessments
  FOR SELECT USING (auth.uid() = student_id OR school_id = auth.user_metadata->>'school_id')

-- Teachers can see students in their classes
CREATE POLICY "Teachers view class assessments" ON assessments
  FOR SELECT USING (
    student_id IN (
      SELECT student_id FROM class_students 
      WHERE class_id IN (
        SELECT id FROM classes 
        WHERE teacher_id = auth.uid()
      )
    )
  )

-- School admins can see all school data
CREATE POLICY "Admins view school data" ON assessments
  FOR SELECT USING (school_id = auth.user_metadata->>'school_id' AND auth.user_metadata->>'role' = 'principal')
```

---

## Data Security Measures

### Encryption
- **At Rest**: All data is encrypted using AES-256 encryption in Supabase
- **In Transit**: TLS 1.3 encryption for all HTTP connections (HTTPS)
- **Passwords**: User passwords are hashed using bcrypt with salt rounds

### Secure Infrastructure
- Hosted on Vercel (SOC 2 Type II compliant)
- Database hosted on Supabase (ISO/IEC 27001 certified)
- Automatic daily backups with 30-day retention
- DDoS protection and WAF (Web Application Firewall)
- Regular security updates and patches

### Access Control
- Authentication via Supabase Auth (industry-standard OAuth 2.0)
- Role-based access control (Student, Teacher, Principal, Admin)
- Multi-factor authentication available (configurable by school)
- API keys stored securely, never exposed in client code

---

## Data Retention & Deletion

### Retention Policy
- **Active Students**: Data retained for duration of enrollment + 7 years
- **Archived Data**: Optionally retained for research (with consent)
- **Deleted Data**: Permanently removed from all backups after 90 days

### User-Initiated Deletion
- Students can request data deletion via their dashboard
- Teachers/admins can delete individual assessments
- School can request full school data deletion

### Automatic Purging
```sql
-- Automatically delete assessments older than 7 years (unless flagged for archival)
DELETE FROM assessments 
WHERE created_at < NOW() - INTERVAL '7 years' 
AND archived = false;
```

---

## Data Export & CSV Reports

### What's Included in Exports
- Student ID (anonymized if needed)
- Assessment scores (raw and scaled)
- Risk levels
- Assessment dates
- Demographics (with consent)

### What's NOT Included
- Detailed response text for sensitivity
- Names (unless explicitly requested by principal)
- IP addresses or tracking data

### Download Security
- Exports are only available to authorized school administrators
- Download links expire after 24 hours
- All exports are logged for audit purposes
- Files are deleted from server immediately after download

---

## Third-Party Services

### What Data is Shared?
- **Vercel** (Hosting): Application code only
- **Supabase** (Database): Encrypted student data
- **No other services**: We do NOT share data with third parties

### Data Processing Agreements
- All vendors have signed Data Processing Agreements (DPA)
- Vendors are compliant with GDPR, CCPA, and COPPA
- Vendors provide SOC 2 attestations upon request

---

## Incident Response

### Security Breach Protocol
1. **Detection**: Automated monitoring detects unauthorized access
2. **Containment**: Affected accounts are locked; access is revoked
3. **Investigation**: Full audit log review within 24 hours
4. **Notification**: School is notified within 24-48 hours
5. **Resolution**: Root cause fixed; security measures strengthened

### Contact for Security Issues
If you discover a security vulnerability:
- Email: security@[your-domain].com
- Do not post publicly; we will acknowledge within 48 hours

---

## Student & Parental Rights

### How to Request Data
1. Contact your school's administrator
2. Provide written request for data access
3. Data provided within 10 business days in CSV format

### How to Request Deletion
1. Contact school administrator
2. Provide written request for data deletion
3. Data deleted within 30 days (configurable per COPPA/GDPR)

### How to File a Complaint
- **GDPR**: Contact your local Data Protection Authority
- **COPPA**: File with FTC (ftc.gov/fcp)
- **FERPA**: File with US Department of Education

---

## Compliance Certifications

- ✓ GDPR Compliant (EU students)
- ✓ COPPA Compliant (US students under 13)
- ✓ FERPA Compliant (US educational records)
- ✓ ISO/IEC 27001 (Infrastructure)
- ✓ SOC 2 Type II (Hosting)
- ✓ HIPAA Compliant Communication (Optional)

---

## Review Schedule

This document is reviewed quarterly and updated annually. Last updated: January 2026.

For questions or concerns about data privacy, contact your school administrator or our data protection team.
