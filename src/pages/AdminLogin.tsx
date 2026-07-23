// src/pages/AdminLogin.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authStore } from '../data/store';
import { ShieldCheck, Lock, Eye, EyeOff } from 'lucide-react';
import agastyaLogo from '../assets/logo-agastya.jpg';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      if (authStore.login(password)) {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid password. Please try again.');
        setLoading(false);
      }
    }, 600);
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
      background: 'radial-gradient(ellipse at center, #1F160D 0%, #0A0704 70%)',
    }}>
      <div style={{
        width: '100%', maxWidth: 380, borderRadius: 4, padding: '40px 32px',
        background: 'rgba(22,16,9,0.97)',
        border: '1px solid rgba(201,162,39,0.2)',
        boxShadow: '0 0 60px rgba(92,24,8,0.3), 0 8px 32px rgba(0,0,0,0.8)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Top gold accent */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, transparent, #C9A227, transparent)',
        }} />

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <img src={agastyaLogo} alt="Agastya" style={{
            width: 64, height: 64, borderRadius: '50%',
            objectFit: 'cover', objectPosition: 'center',
            margin: '0 auto 16px', display: 'block',
            filter: 'drop-shadow(0 0 12px rgba(201,162,39,0.7))',
          }} />
          <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 18, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F5EFE0', margin: '0 0 6px' }}>
            Admin Access
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#7A6E58', margin: 0 }}>
            Aaravam 2025–26 Dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label style={{
              display: 'block', fontFamily: "'Cinzel', serif", fontSize: 10,
              letterSpacing: '0.3em', textTransform: 'uppercase', color: '#7A6E58', marginBottom: 8,
            }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={14} color="#7A6E58" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                id="admin-password"
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                autoFocus
                style={{
                  width: '100%', padding: '12px 36px 12px 36px',
                  fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#F5EFE0',
                  background: '#0A0704', border: '1px solid rgba(201,162,39,0.2)',
                  borderRadius: 4, outline: 'none', boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(199,57,26,0.5)'; }}
                onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(201,162,39,0.2)'; }}
              />
              <button
                type="button"
                onClick={() => setShowPw(p => !p)}
                style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: '#7A6E58',
                  display: 'flex', alignItems: 'center',
                }}
                tabIndex={-1}
              >
                {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {error && (
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: 12,
              color: '#F2601E', background: 'rgba(199,57,26,0.1)',
              border: '1px solid rgba(199,57,26,0.2)', borderRadius: 4,
              padding: '10px 14px', margin: 0,
            }}>{error}</p>
          )}

          <button
            type="submit"
            id="admin-login-btn"
            disabled={loading || !password}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '13px 24px',
              fontFamily: "'Cinzel', serif", fontSize: 12,
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: '#F5EFE0', background: loading || !password ? 'rgba(199,57,26,0.4)' : '#C7391A',
              border: '1px solid rgba(199,57,26,0.5)', borderRadius: 4,
              cursor: loading || !password ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => { if (!loading && password) (e.target as HTMLElement).style.background = '#F2601E'; }}
            onMouseLeave={e => { if (!loading && password) (e.target as HTMLElement).style.background = '#C7391A'; }}
          >
            {loading ? (
              <div style={{
                width: 16, height: 16, borderRadius: '50%',
                border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white',
                animation: 'spin 0.8s linear infinite',
              }} />
            ) : <ShieldCheck size={16} />}
            {loading ? 'Verifying...' : 'Enter Dashboard'}
          </button>
        </form>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}
