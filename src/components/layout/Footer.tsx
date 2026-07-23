// src/components/layout/Footer.tsx
import agastyaLogo from '../../assets/logo-agastya.jpg';

export default function Footer() {
  return (
    <footer style={{ marginTop: 48, borderTop: '1px solid rgba(201,162,39,0.1)', background: '#161009' }}>
      <div style={{
        maxWidth: 1000, margin: '0 auto', padding: '36px 24px',
        display: 'flex', flexWrap: 'wrap', alignItems: 'center',
        justifyContent: 'space-between', gap: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src={agastyaLogo} alt="Agastya" style={{
            width: 36, height: 36, borderRadius: '50%',
            objectFit: 'cover', objectPosition: 'center', opacity: 0.8,
          }} />
          <div>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A227', margin: 0 }}>
              Agastya Students' Union 25–26
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#7A6E58', margin: 0 }}>Arangu Arts Club</p>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#7A6E58', margin: 0 }}>
            ആരവം · AARAVAM 2025–26
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#7A6E58', marginTop: 4 }}>Interbatch Arts Festival</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#7A6E58', lineHeight: 1.7, margin: 0 }}>
            Kerala Agricultural University<br />
            College of Agriculture, Vellayani
          </p>
        </div>
      </div>
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(92,24,8,0.5), transparent)' }} />
      <p style={{ textAlign: 'center', fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#7A6E58', padding: '12px 0', margin: 0 }}>
        © 2025–2026 Agastya Students' Union. All rights reserved.
      </p>
    </footer>
  );
}
