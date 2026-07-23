// src/pages/Achievers.tsx
import { useAchievers } from '../hooks/useStore';
import PageHeader from '../components/layout/PageHeader';
import Footer from '../components/layout/Footer';
import { Star, User } from 'lucide-react';

const TITLE_META: Record<string, { icon: string; desc: string }> = {
  'Kalaprathibha':    { icon: '🏆', desc: 'Best All-Round Performer' },
  'Kalathilakam':     { icon: '👑', desc: 'Best Female Performer' },
  'Kalathilakam (M)': { icon: '🌟', desc: 'Best Male Performer' },
  'Sargaprathibha':   { icon: '🎨', desc: 'Best Creative Artist' },
  'Chithraprathibha': { icon: '🖌️', desc: 'Best Visual Artist' },
  'Sahithyaprathibha':{ icon: '📖', desc: 'Best Literary Artist' },
};

export default function Achievers() {
  const { achievers } = useAchievers();

  return (
    <div style={{ minHeight: '100vh', background: '#0A0704' }}>
      <PageHeader title="Individual Achievers" subtitle="Celebrating the stars of Aaravam 2025–26" />
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '48px 16px' }}>
        {achievers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px', border: '1px solid rgba(201,162,39,0.1)', borderRadius: 4 }}>
            <Star size={36} color="rgba(199,57,26,0.3)" style={{ margin: '0 auto 16px', display: 'block' }} />
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7A6E58' }}>No achievers yet</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#7A6E58', marginTop: 8 }}>
              Individual awardees will appear here after the fest concludes
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 24,
          }}>
            {achievers.map(achiever => {
              const meta = TITLE_META[achiever.title] ?? { icon: '⭐', desc: '' };
              return (
                <div key={achiever.id} style={{
                  borderRadius: 4, overflow: 'hidden',
                  border: '1px solid rgba(201,162,39,0.2)',
                  background: 'linear-gradient(145deg, #1F160D 0%, #161009 100%)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
                  position: 'relative',
                }}>
                  {/* Top shimmer line */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                    background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.6), transparent)',
                  }} />

                  {/* Photo */}
                  <div style={{
                    width: '100%', aspectRatio: '1',
                    background: 'radial-gradient(ellipse at center, rgba(92,24,8,0.3) 0%, #0A0704 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative', overflow: 'hidden',
                  }}>
                    {achiever.photoUrl ? (
                      <img
                        src={achiever.photoUrl}
                        alt={achiever.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 52 }}>{meta.icon}</span>
                        <User size={36} color="rgba(122,110,88,0.3)" />
                      </div>
                    )}
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
                      background: 'linear-gradient(transparent, #161009)',
                    }} />
                  </div>

                  {/* Content */}
                  <div style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{ fontSize: 16 }}>{meta.icon}</span>
                      <span style={{
                        padding: '2px 8px', fontFamily: "'Cinzel', serif", fontSize: 10,
                        letterSpacing: '0.2em', textTransform: 'uppercase',
                        color: '#C9A227', background: 'rgba(201,162,39,0.1)',
                        border: '1px solid rgba(201,162,39,0.25)', borderRadius: 999,
                      }}>{achiever.title}</span>
                    </div>
                    <h3 style={{
                      fontFamily: "'Cinzel', serif", fontSize: 20, fontWeight: 700,
                      color: '#F5EFE0', margin: '0 0 4px',
                      textShadow: '0 0 16px rgba(201,162,39,0.4)',
                    }}>{achiever.name}</h3>
                    {meta.desc && (
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#7A6E58', margin: '0 0 12px' }}>{meta.desc}</p>
                    )}
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      paddingTop: 12, borderTop: '1px solid rgba(201,162,39,0.1)',
                    }}>
                      <Star size={12} color="#C9A227" />
                      <span style={{ fontFamily: "'Cinzel', serif", fontSize: 15, fontWeight: 600, color: '#C9A227' }}>{achiever.points}</span>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#7A6E58' }}>points</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
