import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Configure your email service (Gmail example)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
})

// Generate random 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const supabase = createClient()
    const otp = generateOTP()

    // Delete old OTP for this email if exists
    await supabase
      .from('otp_requests')
      .delete()
      .eq('email', email)

    // Insert new OTP
    const { error: insertError } = await supabase
      .from('otp_requests')
      .insert({
        email,
        otp_code: otp,
        expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString()
      })

    if (insertError) {
      console.error('Error inserting OTP:', insertError)
      return NextResponse.json(
        { error: 'Failed to generate OTP' },
        { status: 500 }
      )
    }

    // Send email
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: 'Your OTP for Happiness Index 360',
        html: `
          <h2>Your One-Time Password (OTP)</h2>
          <p>Your OTP is: <strong style="font-size: 24px; letter-spacing: 5px;">${otp}</strong></p>
          <p>This OTP will expire in 10 minutes.</p>
          <p>Do not share this OTP with anyone.</p>
        `
      })
    } catch (emailError) {
      console.error('Error sending email:', emailError)
      // Still return success - OTP was generated
    }

    return NextResponse.json({
      success: true,
      message: 'OTP sent to email',
      email // Return email for confirmation
    })

  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
