import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    // Create transporter with your SMTP settings
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    })

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // Send email with OTP
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Your OTP for Happiness Index 360 Login',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0284c7;">Happiness Index 360</h2>
          <h3>Your One-Time Password (OTP)</h3>
          <p>Use this OTP to login to your account:</p>
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h1 style="color: #0284c7; letter-spacing: 8px; font-size: 32px; margin: 0;">${otp}</h1>
          </div>
          <p style="color: #666;">This OTP is valid for 10 minutes.</p>
          <p style="color: #999; font-size: 12px;">If you didn't request this OTP, please ignore this email.</p>
        </div>
      `
    }

    // Send the email
    await transporter.sendMail(mailOptions)

    // TODO: Store OTP in Supabase database with 10-minute TTL
    console.log(`OTP sent to ${email}: ${otp}`)

    return NextResponse.json({ 
      success: true,
      message: 'OTP sent successfully to your email'
    })

  } catch (error) {
    console.error('OTP Error:', error)
    return NextResponse.json({ 
      error: 'Failed to send OTP. Please try again.'
    }, { status: 500 })
  }
}
