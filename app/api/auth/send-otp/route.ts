import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
})

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Your OTP for Happiness Index 360',
      html: `
        <h2>Login OTP</h2>
        <p>Your one-time password is:</p>
        <h1 style="color: #0284c7; font-size: 32px; letter-spacing: 8px;">${otp}</h1>
        <p>This OTP expires in 10 minutes.</p>
      `
    })

    return NextResponse.json({ 
      success: true,
      message: 'OTP sent to email'
    })

  } catch (error) {
    console.error('OTP error:', error)
    return NextResponse.json({ 
      error: 'Failed to send OTP' 
    }, { status: 500 })
  }
}
