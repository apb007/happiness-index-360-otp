'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(to right, #f0f9ff, #e0e7ff)',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Happiness Index 360
      </h1>
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem', textAlign: 'center', maxWidth: '500px' }}>
        OTP-based Student Assessment Platform
      </p>
      
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/auth/otp-login">
          <button style={{
            padding: '0.75rem 2rem',
            background: '#0284c7',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            OTP Login
          </button>
        </Link>
        
        <Link href="/dashboard/student">
          <button style={{
            padding: '0.75rem 2rem',
            background: '#64748b',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Dashboard
          </button>
        </Link>
      </div>
    </div>
  )
}
