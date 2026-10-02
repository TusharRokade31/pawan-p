'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAction } from '@/actions/portfolio-actions';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('password', password);

    try {
      const res = await loginAction(formData);
      if (res.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(res.error || 'Invalid password');
      }
    } catch (err: any) {
      setError(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0d0d12',
        padding: '24px',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: '420px',
          width: '100%',
          background: '#161620',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '40px 32px',
          boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
          color: '#fff',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              display: 'inline-flex',
              padding: '12px 18px',
              borderRadius: '50px',
              background: 'rgba(124,58,237,0.15)',
              border: '1px solid rgba(124,58,237,0.3)',
              color: '#a78bfa',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '1px',
              marginBottom: '16px',
            }}
          >
            ✦ CMS PORTAL
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '8px' }}>
            Portfolio Admin
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
            Sign in to manage videos, reels, experience, and profile content.
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: '12px 16px',
              background: 'rgba(239,68,68,0.15)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '10px',
              color: '#f87171',
              fontSize: '13px',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '24px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              required
              autoFocus
              style={{
                width: '100%',
                padding: '14px 16px',
                background: '#0d0d14',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '15px',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'transform 0.15s, box-shadow 0.2s',
              boxShadow: '0 4px 20px rgba(124,58,237,0.35)',
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard →'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <a
            href="/"
            style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.4)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
          >
            ← Back to Public Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
