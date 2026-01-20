import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json()

    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP required' }, { status: 400 })
    }

    // For MVP: Accept any 6-digit OTP
    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json({ error: 'Invalid OTP format' }, { status: 400 })
    }

    // TODO: Verify against stored OTP in database
    
    // Create simple token
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64')

    return NextResponse.json({ 
      success: true,
      token,
      message: 'OTP verified successfully'
    })

  } catch (error) {
    console.error('Verify error:', error)
    return NextResponse.json({ 
      error: 'Failed to verify OTP' 
    }, { status: 500 })
  }
}
