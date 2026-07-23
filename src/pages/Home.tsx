// src/pages/Home.tsx
import { useMemo } from 'react';
import { useTeams, useScores } from '../hooks/useStore';
import { Trophy, Flame } from 'lucide-react';
import aaravamLogo from '../assets/logo-aaravam.jpg';
import agastyaLogo from '../assets/logo-agastya.jpg';

const RANK_CONFIG = [
  { color: 'linear-gradient(135deg,#F59E0B,#D97706)', textColor: '#FDE68A', border: 'rgba(245,158,11,0.4)', glow: '0 0 30px rgba(245,158,11,0.3)', label: '1ST' },
  { color: 'linear-gradient(135deg,#94A3B8,#64748B)', textColor: '#CBD5E1', border: 'rgba(148,163,184,0.3)', glow: '0 0 20px rgba(148,163,184,0.1)', label: '2ND' },
  { color: 'linear-gradient(135deg,#B45309,#92400E)', textColor: '#FCA5A5', border: 'rgba(180,83,9,0.3)', glow: '0 0 20px rgba(180,83,9,0.1)', label: '3RD' },
  { color: 'linear-gradient(135deg,#5C1808,#3B0D03)', textColor: '#B8A98A', border: 'rgba(255,255,255,0.08)', glow: 'none', label: '4TH' },
  { color: 'linear-gradient(135deg,#1F160D,#161009)', textColor: '#7A6E58', border: 'rgba(255,255,255,0.05)', glow: 'none', label: '5TH' },
];

export default function Home() {
  const { teams } = useTeams();
  const { totalByTeam } = useScores();

  const ranked = useMemo(() => {
    const totals = totalByTeam();
    return [...teams]
      .map(t => ({ ...t, total: totals[t.id] ?? 0 }))
      .sort((a, b) => b.total - a.total);
  }, [teams, totalByTeam]);

  const leader = ranked[0];
  const rest = ranked.slice(1);

  return (
    <main style={{ minHeight: '100vh', background: '#0A0704' }}>
      {/* ── HERO SECTION ── */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '80px 24px 80px',
          position: 'relative',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse at 50% 80%, #5C1808 0%, #1F160D 35%, #0A0704 70%)',
        }}
      >
        {/* Ember particles */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {[...Array(22)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                borderRadius: '50%',
                left: `${4 + i * 4.3}%`,
                bottom: `${2 + (i % 5) * 4}%`,
                background: i % 3 === 0 ? '#F2601E' : i % 3 === 1 ? '#C9A227' : '#C7391A',
                animation: `riseAndFade ${2.5 + (i % 3) * 0.8}s ease-out infinite`,
                animationDelay: `${(i * 0.22) % 2.5}s`,
                opacity: 0.75,
              }}
            />
          ))}
        </div>

        {/* Atmospheric glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, height: 500, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(92,24,8,0.35) 0%, transparent 70%)',
          filter: 'blur(60px)', pointerEvents: 'none',
        }} />

        {/* Top organizer label */}
        <div style={{
          position: 'relative', zIndex: 10,
          display: 'flex', alignItems: 'center', gap: 12,
          marginBottom: 32,
        }}>
          <img
            src={agastyaLogo}
            alt="Agastya"
            style={{
              width: 32, height: 32, borderRadius: '50%',
              objectFit: 'cover', objectPosition: 'center',
              filter: 'drop-shadow(0 0 8px rgba(201,162,39,0.8))',
            }}
          />
          <span style={{
            fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.35em',
            textTransform: 'uppercase', color: '#C9A227',
          }}>
            Agastya Students' Union 25–26
          </span>
          <span style={{ color: 'rgba(201,162,39,0.4)' }}>·</span>
          <span style={{
            fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.25em',
            textTransform: 'uppercase', color: 'rgba(201,162,39,0.6)',
          }}>
            Arangu Arts Club
          </span>
        </div>

        {/* Big Aaravam Logo */}
        <div style={{ position: 'relative', zIndex: 10, marginBottom: 24 }}>
          <div style={{
            position: 'absolute', inset: '-20px', borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(242,96,30,0.3) 0%, transparent 70%)',
            filter: 'blur(30px)', zIndex: -1, pointerEvents: 'none',
          }} />
          <img
            src={aaravamLogo}
            alt="ആരവം AARAVAM"
            style={{
              width: 'min(480px, 85vw)',
              objectFit: 'contain',
              // invert → white calligraphy, black bg
              // contrast(20) → crushes all grey (checkerboard) to pure black → gone via screen
              // sepia+saturate+hue-rotate → tints the white calligraphy to warm amber
              filter: 'invert(1) contrast(20) sepia(1) saturate(4) hue-rotate(350deg) brightness(0.95)',
              mixBlendMode: 'screen',
              animation: 'float 4s ease-in-out infinite',
              display: 'block',
            }}
          />
        </div>

        {/* Subtitles */}
        <div style={{ position: 'relative', zIndex: 10 }}>
          <h1 style={{ display: 'none' }}>Aaravam 2025-2026 Interbatch Arts Festival</h1>
          <p style={{
            fontFamily: "'Cinzel', serif", fontSize: 22,
            letterSpacing: '0.35em', textTransform: 'uppercase',
            color: '#C9A227',
            textShadow: '0 0 20px rgba(201,162,39,0.8), 0 0 40px rgba(201,162,39,0.4)',
            margin: '0 0 8px',
          }}>
            AARAVAM 2025–2026
          </p>
          <p style={{
            fontFamily: "'Cinzel', serif", fontSize: 13,
            letterSpacing: '0.25em', textTransform: 'uppercase',
            color: '#B8A98A', margin: '0 0 16px',
          }}>
            Interbatch Arts Festival
          </p>
          {/* Divider */}
          <div style={{
            width: 80, height: 1, margin: '0 auto 20px',
            background: 'linear-gradient(90deg, transparent, #C9A227, transparent)',
          }} />
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: 13,
            color: '#7A6E58', letterSpacing: '0.1em',
          }}>
            Kerala Agricultural University · College of Agriculture, Vellayani
          </p>
        </div>

        {/* Date badges */}
        <div style={{
          position: 'relative', zIndex: 10,
          display: 'flex', alignItems: 'center', gap: 24, marginTop: 32,
        }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{
              display: 'inline-block', padding: '4px 12px',
              fontFamily: "'Cinzel', serif", fontSize: 10,
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: '#F2601E',
              background: 'rgba(199,57,26,0.12)',
              border: '1px solid rgba(199,57,26,0.3)',
              borderRadius: 2,
            }}>Off Stage</span>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#7A6E58', marginTop: 6 }}>19th – 22nd</p>
          </div>
          <div style={{ width: 1, height: 36, background: 'rgba(201,162,39,0.2)' }} />
          <div style={{ textAlign: 'center' }}>
            <span style={{
              display: 'inline-block', padding: '4px 12px',
              fontFamily: "'Cinzel', serif", fontSize: 10,
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: '#F2601E',
              background: 'rgba(199,57,26,0.12)',
              border: '1px solid rgba(199,57,26,0.3)',
              borderRadius: 2,
            }}>On Stage</span>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#7A6E58', marginTop: 6 }}>23rd – 26th</p>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{
          position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          animation: 'float 3s ease-in-out infinite',
        }}>
          <p style={{
            fontFamily: "'Cinzel', serif", fontSize: 10,
            letterSpacing: '0.3em', textTransform: 'uppercase', color: '#7A6E58',
          }}>Leaderboard</p>
          <Flame size={14} color="#C7391A" />
        </div>
      </section>

      {/* ── LEADERBOARD SECTION ── */}
      <section style={{ padding: '80px 24px', maxWidth: 800, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, #C9A227, transparent)' }} />
            <Trophy size={20} color="#C9A227" />
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, #C9A227, transparent)' }} />
          </div>
          <h2 style={{
            fontFamily: "'Cinzel', serif", fontSize: 28,
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: '#F5EFE0',
            textShadow: '0 0 40px rgba(201,162,39,0.3)',
            margin: '0 0 8px',
          }}>Leaderboard</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#7A6E58' }}>Live points standings</p>
        </div>

        {/* 1st Place Card */}
        {leader && (
          <div style={{
            marginBottom: 16, padding: '24px 28px',
            background: 'linear-gradient(135deg, #1F160D 0%, #161009 100%)',
            border: '1px solid rgba(245,158,11,0.35)',
            borderRadius: 4, position: 'relative', overflow: 'hidden',
            boxShadow: '0 0 40px rgba(245,158,11,0.12), 0 4px 24px rgba(0,0,0,0.6)',
          }}>
            {/* Top gold line */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 2,
              background: 'linear-gradient(90deg, transparent, #F0C040, transparent)',
            }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              {/* Trophy icon */}
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 20px rgba(245,158,11,0.5)',
                flexShrink: 0,
              }}>
                <Trophy size={24} color="#0A0704" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{
                    padding: '2px 8px',
                    fontFamily: "'Cinzel', serif", fontSize: 10,
                    letterSpacing: '0.3em', textTransform: 'uppercase',
                    color: '#C9A227', background: 'rgba(201,162,39,0.1)',
                    border: '1px solid rgba(201,162,39,0.3)', borderRadius: 999,
                  }}>1st Place</span>
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,192,64,0.6)' }}>Leading</span>
                </div>
                <p style={{
                  fontFamily: "'Cinzel', serif", fontSize: 28, fontWeight: 700,
                  color: '#F5EFE0', letterSpacing: '0.05em', margin: 0,
                  textShadow: '0 0 20px rgba(201,162,39,0.5)',
                }}>{leader.name}</p>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <p style={{
                  fontFamily: "'Cinzel', serif", fontSize: 48, fontWeight: 900,
                  color: '#FDE68A', margin: 0,
                  textShadow: '0 0 20px rgba(201,162,39,0.7)',
                }}>{leader.total}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#7A6E58', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Points</p>
              </div>
            </div>
          </div>
        )}

        {/* Ranks 2-5 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {rest.map((team, idx) => {
            const cfg = RANK_CONFIG[idx + 1] ?? RANK_CONFIG[4];
            return (
              <div
                key={team.id}
                style={{
                  display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px',
                  background: 'rgba(31,22,13,0.6)',
                  border: `1px solid ${cfg.border}`,
                  borderRadius: 4,
                  boxShadow: cfg.glow !== 'none' ? cfg.glow : '0 2px 8px rgba(0,0,0,0.3)',
                  transition: 'border-color 0.2s ease',
                }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                  background: cfg.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: 10, fontWeight: 700, color: 'white' }}>
                    {cfg.label}
                  </span>
                </div>
                <p style={{
                  flex: 1, fontFamily: "'Cinzel', serif", fontSize: 18, fontWeight: 600,
                  color: cfg.textColor, letterSpacing: '0.05em', margin: 0,
                }}>
                  {team.name}
                </p>
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    fontFamily: "'Cinzel', serif", fontSize: 24, fontWeight: 700,
                    color: cfg.textColor,
                  }}>{team.total}</span>
                  <span style={{
                    fontFamily: "'Inter', sans-serif", fontSize: 11,
                    color: '#7A6E58', marginLeft: 4,
                  }}>pts</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {ranked.every(t => t.total === 0) && (
          <div style={{
            textAlign: 'center', padding: '60px 24px', marginTop: 16,
            border: '1px solid rgba(201,162,39,0.1)', borderRadius: 4,
          }}>
            <Flame size={32} color="rgba(199,57,26,0.35)" style={{ margin: '0 auto 16px', display: 'block' }} />
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7A6E58' }}>
              Scores not yet updated
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#7A6E58', marginTop: 8 }}>
              Check back after events begin
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
