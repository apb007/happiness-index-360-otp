import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json()

    if (!email || !otp) {
      return NextResponse.json(
        { error: 'Email and OTP required' },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Find matching OTP
    const { data: otpRecord, error: queryError } = await supabase
      .from('otp_requests')
      .select('*')
      .eq('email', email)
      .eq('otp_code', otp)
      .single()

    if (queryError || !otpRecord) {
      return NextResponse.json(
        { error: 'Invalid OTP' },
        { status: 401 }
      )
    }

    // Check if expired
    const expiryTime = new Date(otpRecord.expires_at).getTime()
    const currentTime = new Date().getTime()

    if (currentTime > expiryTime) {
      return NextResponse.json(
        { error: 'OTP has expired' },
        { status: 401 }
      )
    }

    // Check if already used
    if (otpRecord.is_used) {
      return NextResponse.json(
        { error: 'OTP already used' },
        { status: 401 }
      )
    }

    // Mark as used
    await supabase
      .from('otp_requests')
      .update({ is_used: true })
      .eq('id', otpRecord.id)

    // Get or create student user
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single()

    let userId = profile?.id

    if (!profile) {
      // Create new student profile
      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .insert({
          email,
          role: 'student',
          name: email.split('@')[0]
        })
        .select()
        .single()

      if (createError) {
        return NextResponse.json(
          { error: 'Failed to create profile' },
          { status: 500 }
        )
      }

      userId = newProfile.id
    }

    // Create session token (JWT)
    const token = Buffer.from(
      JSON.stringify({
        userId,
        email,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 // 24 hours
      })
    ).toString('base64')

    return NextResponse.json({
      success: true,
      message: 'OTP verified',
      token,
      userId,
      email
    })

  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
