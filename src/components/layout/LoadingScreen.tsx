// src/components/layout/LoadingScreen.tsx
import { useEffect, useState } from 'react';

interface Props {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  const [phase, setPhase] = useState<'enter' | 'exit'>('enter');
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(d => {
        if (d === '...') return '.';
        return d + '.';
      });
    }, 500);

    const exitTimer = setTimeout(() => setPhase('exit'), 2800);
    const doneTimer = setTimeout(() => onComplete(), 3400);

    return () => {
      clearInterval(dotsInterval);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at center bottom, #300d05 0%, #150d09 50%, #060403 100%)',
        opacity: phase === 'exit' ? 0 : 1,
        transition: 'opacity 0.6s ease',
        pointerEvents: phase === 'exit' ? 'none' : 'all',
      }}
    >
      {/* Cinematic slow rising ember particles */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              borderRadius: '50%',
              width: `${1.5 + (i % 3)}px`,
              height: `${1.5 + (i % 3)}px`,
              left: `${10 + i * 6}%`,
              bottom: `${10 + (i % 4) * 8}%`,
              background: i % 2 === 0 ? '#F2601E' : '#C9A227',
              animation: `riseAndFade 4s ease-out infinite`,
              animationDelay: `${(i * 0.3) % 4}s`,
              opacity: 0.5,
            }}
          />
        ))}
      </div>

      {/* Quote Container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '576px',
          padding: '0 24px',
          textAlign: 'center',
          gap: '24px',
          transform: phase === 'exit' ? 'scale(0.98) translateY(-10px)' : 'scale(1) translateY(0)',
          transition: 'transform 0.6s ease',
        }}
      >
        {/* Quote itself */}
        <p
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '18px',
            lineHeight: '1.8',
            letterSpacing: '0.15em',
            color: '#EAD39E',
            textShadow: '0 0 12px rgba(201,162,39,0.3)',
            margin: 0,
            fontStyle: 'italic',
          }}
        >
          "Let the stage speak, Let the talents roar"
        </p>

        {/* Cycling Dots */}
        <div
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '24px',
            color: '#F2601E',
            letterSpacing: '0.2em',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {dots}
        </div>
      </div>
    </div>
  );
}
