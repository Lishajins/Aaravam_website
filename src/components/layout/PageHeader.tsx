// src/components/layout/PageHeader.tsx
import agastyaLogo from '../../assets/logo-agastya.jpg';
import aaravamLogo from '../../assets/logo-aaravam.jpg';

interface Props {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: Props) {
  return (
    <div
      style={{
        position: 'relative',
        paddingTop: 100, paddingBottom: 48, paddingLeft: 24, paddingRight: 24,
        textAlign: 'center', overflow: 'hidden',
        background: 'linear-gradient(180deg, rgba(92,24,8,0.25) 0%, rgba(10,7,4,0) 100%)',
        borderBottom: '1px solid rgba(201,162,39,0.1)',
      }}
    >
      {/* Faint aaravam watermark */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: 0.04, pointerEvents: 'none', userSelect: 'none',
      }}>
        <img src={aaravamLogo} alt="" style={{ width: 240, filter: 'invert(1)' }} />
      </div>

      {/* Agastya logo + fest label */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
        <img
          src={agastyaLogo}
          alt="Agastya"
          style={{
            width: 22, height: 22, borderRadius: '50%',
            objectFit: 'cover', objectPosition: 'center',
            filter: 'drop-shadow(0 0 4px rgba(201,162,39,0.6))',
            opacity: 0.8,
          }}
        />
        <span style={{
          fontFamily: "'Cinzel', serif", fontSize: 10,
          letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'rgba(201,162,39,0.6)',
        }}>
          Aaravam 2025–26
        </span>
      </div>

      {/* Page Title */}
      <h1 style={{
        fontFamily: "'Cinzel', serif", fontSize: 'clamp(24px, 5vw, 36px)',
        letterSpacing: '0.3em', textTransform: 'uppercase',
        color: '#F5EFE0', margin: '0 0 12px',
        textShadow: '0 0 40px rgba(201,162,39,0.2)',
      }}>{title}</h1>

      {/* Divider */}
      <div style={{
        width: 80, height: 1, margin: '0 auto 12px',
        background: 'linear-gradient(90deg, transparent, #C9A227, transparent)',
      }} />

      {subtitle && (
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: 13,
          color: '#7A6E58', margin: 0,
        }}>{subtitle}</p>
      )}
    </div>
  );
}
