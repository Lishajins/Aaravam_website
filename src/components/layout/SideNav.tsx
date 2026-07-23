// src/components/layout/SideNav.tsx
import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { X, Home, Table2, Trophy, Star, ShieldCheck } from 'lucide-react';
import agastyaLogo from '../../assets/logo-agastya.jpg';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: Home, exact: true },
  { to: '/scorecard', label: 'Score Card', icon: Table2 },
  { to: '/winners', label: 'Winners', icon: Trophy },
  { to: '/achievers', label: 'Individual Achievers', icon: Star },
];

export default function SideNav({ isOpen, onClose }: Props) {
  const location = useLocation();

  useEffect(() => { onClose(); }, [location.pathname]); // eslint-disable-line

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 40,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Panel */}
      <aside
        style={{
          position: 'fixed', top: 0, left: 0, height: '100%', width: 280, zIndex: 50,
          display: 'flex', flexDirection: 'column',
          background: 'linear-gradient(160deg, rgba(22,16,9,0.98) 0%, rgba(31,22,13,0.98) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(201,162,39,0.15)',
          boxShadow: '4px 0 40px rgba(0,0,0,0.8)',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px 16px',
          borderBottom: '1px solid rgba(201,162,39,0.1)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img
              src={agastyaLogo}
              alt="Agastya"
              style={{
                width: 36, height: 36, borderRadius: '50%',
                objectFit: 'cover', objectPosition: 'center',
                filter: 'drop-shadow(0 0 8px rgba(201,162,39,0.7))',
              }}
            />
            <div>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A227', margin: 0 }}>Agastya</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#7A6E58', margin: 0 }}>Students' Union 25–26</p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 32, height: 32, borderRadius: 4, border: 'none',
              background: 'transparent', cursor: 'pointer', color: '#7A6E58',
              transition: 'color 0.2s',
            }}
            aria-label="Close"
          >
            <X size={18} color="currentColor" />
          </button>
        </div>

        {/* Nav Links */}
        <nav style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV_ITEMS.map(({ to, label, icon: Icon, exact }) => (
            <NavLink
              key={to}
              to={to}
              end={exact}
              style={{ textDecoration: 'none' }}
            >
              {({ isActive }) => (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '12px 16px', borderRadius: 4,
                  background: isActive ? 'rgba(199,57,26,0.1)' : 'transparent',
                  border: `1px solid ${isActive ? 'rgba(199,57,26,0.25)' : 'transparent'}`,
                  cursor: 'pointer', transition: 'all 0.2s ease',
                }}>
                  <Icon size={15} color={isActive ? '#F2601E' : '#7A6E58'} style={{ flexShrink: 0 }} />
                  <span style={{
                    fontFamily: "'Cinzel', serif", fontSize: 11,
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: isActive ? '#F2601E' : '#B8A98A',
                  }}>{label}</span>
                  {isActive && (
                    <div style={{
                      marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%',
                      background: '#F2601E',
                    }} />
                  )}
                </div>
              )}
            </NavLink>
          ))}

          <div style={{ margin: '12px 0', height: 1, background: 'rgba(201,162,39,0.08)' }} />

          {/* Admin */}
          <NavLink to="/admin" style={{ textDecoration: 'none' }}>
            {({ isActive }) => (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '12px 16px', borderRadius: 4,
                background: isActive ? 'rgba(201,162,39,0.08)' : 'transparent',
                border: `1px solid ${isActive ? 'rgba(201,162,39,0.2)' : 'transparent'}`,
                cursor: 'pointer', transition: 'all 0.2s ease',
              }}>
                <ShieldCheck size={15} color={isActive ? '#C9A227' : '#7A6E58'} style={{ flexShrink: 0 }} />
                <span style={{
                  fontFamily: "'Cinzel', serif", fontSize: 11,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: isActive ? '#C9A227' : '#7A6E58',
                }}>Admin</span>
              </div>
            )}
          </NavLink>
        </nav>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid rgba(201,162,39,0.08)',
          textAlign: 'center',
        }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#7A6E58', lineHeight: 1.6, margin: 0 }}>
            Kerala Agricultural University<br />
            College of Agriculture, Vellayani
          </p>
        </div>
      </aside>
    </>
  );
}
