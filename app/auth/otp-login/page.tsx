'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function OTPLoginPage() {
  const router = useRouter()
  const [step, setStep] = useState<'email' | 'otp'>('email')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to send OTP')
        return
      }

      setMessage('OTP sent to your email!')
      setStep('otp')
    } catch (err) {
      setError('Error sending OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to verify OTP')
        return
      }

      localStorage.setItem('authToken', data.token)
      localStorage.setItem('userEmail', email)

      router.push('/dashboard/student')
    } catch (err) {
      setError('Error verifying OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(to right, #f0f9ff, #e0e7ff)', padding: '1rem' }}>
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', padding: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Happiness Index 360</h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>Student Login with OTP</p>

        {step === 'email' ? (
          <form onSubmit={handleSendOTP} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem' }}
              />
            </div>

            {error && <p style={{ color: '#ef4444', fontSize: '0.875rem' }}>{error}</p>}
            {message && <p style={{ color: '#22c55e', fontSize: '0.875rem' }}>{message}</p>}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.5rem',
                background: '#0284c7',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.5 : 1
              }}
            >
              {loading ? 'Sending OTP...' : 'Send OTP to Email'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Enter 6-Digit OTP
              </label>
              <input
                type="text"
                placeholder="000000"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                required
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '2rem',
                  textAlign: 'center',
                  letterSpacing: '8px'
                }}
              />
              <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
                OTP sent to: <strong>{email}</strong>
              </p>
            </div>

            {error && <p style={{ color: '#ef4444', fontSize: '0.875rem' }}>{error}</p>}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.5rem',
                background: '#0284c7',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.5 : 1
              }}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>

            <button
              type="button"
              onClick={() => {
                setStep('email')
                setError('')
                setOtp('')
              }}
              style={{
                width: '100%',
                padding: '0.5rem',
                background: 'white',
                color: '#0284c7',
                border: '1px solid #0284c7',
                borderRadius: '4px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Change Email
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
