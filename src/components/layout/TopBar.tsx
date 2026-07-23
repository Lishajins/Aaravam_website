// src/components/layout/TopBar.tsx
import { useState, useCallback } from 'react';
import { Menu } from 'lucide-react';
import agastyaLogo from '../../assets/logo-agastya.jpg';
import SideNav from './SideNav';

export default function TopBar() {
  const [navOpen, setNavOpen] = useState(false);
  const openNav = useCallback(() => setNavOpen(true), []);
  const closeNav = useCallback(() => setNavOpen(false), []);

  return (
    <>
      <header
        id="topbar"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 30,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 20px',
          background: 'linear-gradient(180deg, rgba(10,7,4,0.95) 0%, rgba(10,7,4,0) 100%)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        {/* Left side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Hamburger */}
          <button
            id="nav-toggle"
            onClick={openNav}
            aria-label="Open navigation"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 36, height: 36, borderRadius: 4, border: 'none',
              background: 'transparent', cursor: 'pointer',
              color: '#B8A98A', transition: 'color 0.2s, background 0.2s',
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.color = '#F2601E'; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.color = '#B8A98A'; }}
          >
            <Menu size={20} color="currentColor" />
          </button>

          {/* Agastya logo (small) + name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img
              src={agastyaLogo}
              alt="Agastya"
              style={{
                width: 28, height: 28, borderRadius: '50%',
                objectFit: 'cover', objectPosition: 'center',
                filter: 'drop-shadow(0 0 6px rgba(201,162,39,0.7))',
              }}
            />
            <span style={{
              fontFamily: "'Cinzel', serif", fontSize: 11,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#B8A98A',
            }}>
              Agastya Students' Union 25–26
            </span>
          </div>
        </div>

        {/* Right: AARAVAM label */}
        <span style={{
          fontFamily: "'Cinzel', serif", fontSize: 12,
          letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'rgba(201,162,39,0.6)',
        }}>
          ആരവം · AARAVAM
        </span>
      </header>

      <SideNav isOpen={navOpen} onClose={closeNav} />
    </>
  );
}
