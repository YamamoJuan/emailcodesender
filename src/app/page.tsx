'use client'
import { useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess('')
    setError('')

    try {
      const res = await fetch('/api/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()
      if (res.ok && !data.error) {
        setSuccess('Kode berhasil dikirim ke email!')
        setEmail('')
      } else {
        setError(data.error || 'Gagal mengirim email.')
      }
    } catch {
      setError('Terjadi kesalahan.')
    }

    setLoading(false)
  }

  return (
    <div 
      style={{
        minHeight: '100vh',
        background: '#0f2d26',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: success ? '500px' : '400px',
          background: 'rgba(34, 65, 58, 0.8)',
          borderRadius: '20px',
          border: '1px solid rgba(52, 125, 108, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(10px)',
          padding: '32px',
          transition: 'all 0.3s ease'
        }}
      >
        <h1 
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#a7f3d0',
            marginBottom: '24px'
          }}
        >
          Email Code Sender
        </h1>
        
        {success ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>✅</div>
            <div 
              style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#a7f3d0',
                marginBottom: '24px'
              }}
            >
              Kode berhasil dikirim!
            </div>
            <button
              onClick={() => setSuccess('')}
              style={{
                padding: '8px 24px',
                backgroundColor: 'rgba(52, 125, 108, 0.8)',
                color: '#a7f3d0',
                borderRadius: '8px',
                border: '1px solid rgba(52, 125, 108, 0.5)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                backdropFilter: 'blur(5px)'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(52, 125, 108, 1)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(52, 125, 108, 0.8)'}
            >
              Kirim Lagi
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email kamu"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid rgba(52, 125, 108, 0.3)',
                backgroundColor: 'rgba(15, 45, 38, 0.5)',
                color: '#a7f3d0',
                marginBottom: '16px',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box',
                backdropFilter: 'blur(5px)'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(52, 125, 108, 0.8)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(52, 125, 108, 0.3)'}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid rgba(52, 125, 108, 0.5)',
                background: loading ? 'rgba(107, 114, 128, 0.5)' : 'rgba(52, 125, 108, 0.8)',
                color: '#a7f3d0',
                fontWeight: '600',
                fontSize: '16px',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                backdropFilter: 'blur(5px)'
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = 'rgba(52, 125, 108, 1)'
                }
              }}
              onMouseOut={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = 'rgba(52, 125, 108, 0.8)'
                }
              }}
            >
              {loading ? 'Mengirim...' : 'Kirim Kode'}
            </button>
          </form>
        )}
        
        {error && (
          <p 
            style={{
              marginTop: '16px',
              color: '#fca5a5',
              fontSize: '14px',
              textAlign: 'center'
            }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  )
}