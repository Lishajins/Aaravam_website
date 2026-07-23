// src/components/layout/LoadingScreen.tsx
import { useEffect, useState } from 'react';

interface Props {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => Math.min(p + 4, 100));
    }, 35);

    const holdTimer = setTimeout(() => setPhase('hold'), 400);
    const exitTimer = setTimeout(() => setPhase('exit'), 1400);
    const doneTimer = setTimeout(() => onComplete(), 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center"
      style={{
        background: 'radial-gradient(ellipse at center bottom, #5C1808 0%, #1F160D 40%, #0A0704 80%)',
        opacity: phase === 'exit' ? 0 : 1,
        transition: 'opacity 0.6s ease',
        pointerEvents: phase === 'exit' ? 'none' : 'all',
      }}
    >
      {/* Ember particles rising */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              left: `${5 + i * 5}%`,
              bottom: `${5 + (i % 4) * 5}%`,
              background: i % 3 === 0 ? '#F2601E' : i % 3 === 1 ? '#C9A227' : '#C7391A',
              animation: `riseAndFade ${2 + (i % 3)}s ease-out infinite`,
              animationDelay: `${(i * 0.2) % 2}s`,
              opacity: 0.8,
            }}
          />
        ))}
      </div>

      {/* Central flame icon */}
      <div
        className="relative flex flex-col items-center gap-6"
        style={{
          opacity: phase === 'enter' ? 0 : 1,
          transform: phase === 'enter' ? 'scale(0.8) translateY(16px)' : 'scale(1) translateY(0)',
          transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        {/* Flame SVG */}
        <div className="animate-float" style={{ filter: 'drop-shadow(0 0 24px rgba(242,96,30,0.9))' }}>
          <svg width="64" height="80" viewBox="0 0 64 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M32 4C32 4 52 24 52 44C52 55.046 43.046 64 32 64C20.954 64 12 55.046 12 44C12 24 32 4Z"
              fill="url(#flameFill)"
              opacity="0.9"
            />
            <path
              d="M32 20C32 20 44 34 44 46C44 52.627 38.627 58 32 58C25.373 58 20 52.627 20 46C20 34 32 20Z"
              fill="url(#flameInner)"
            />
            <path
              d="M32 34C32 34 38 42 38 48C38 51.314 35.314 54 32 54C28.686 54 26 51.314 26 48C26 42 32 34Z"
              fill="#FDE68A"
              opacity="0.8"
            />
            <defs>
              <linearGradient id="flameFill" x1="32" y1="4" x2="32" y2="64" gradientUnits="userSpaceOnUse">
                <stop stopColor="#C9A227" />
                <stop offset="0.5" stopColor="#F2601E" />
                <stop offset="1" stopColor="#C7391A" />
              </linearGradient>
              <linearGradient id="flameInner" x1="32" y1="20" x2="32" y2="58" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FDE68A" />
                <stop offset="1" stopColor="#F2601E" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Malayalam + English title */}
        <div className="text-center">
          <p
            className="font-display text-5xl font-bold tracking-widest"
            style={{
              background: 'linear-gradient(135deg, #C9A227 0%, #F0C040 50%, #F2601E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none',
              filter: 'drop-shadow(0 0 16px rgba(201,162,39,0.6))',
            }}
          >
            ആരവം
          </p>
          <p className="font-display text-sm tracking-[0.5em] uppercase text-gold/70 mt-1">
            AARAVAM
          </p>
          <p className="font-body text-[11px] tracking-[0.3em] uppercase text-text-muted mt-2">
            2025 – 2026 · Interbatch Arts Festival
          </p>
        </div>

        {/* Divider line */}
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

        <p className="font-display text-[10px] tracking-[0.4em] uppercase text-gold/50">
          Agastya Students' Union · KAU Vellayani
        </p>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-12 w-48 h-px bg-white/10 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-ember-deep via-ember-bright to-gold"
          style={{ width: `${progress}%`, transition: 'width 0.035s linear' }}
        />
      </div>
    </div>
  );
}
