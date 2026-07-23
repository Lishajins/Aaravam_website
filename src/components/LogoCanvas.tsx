// src/components/LogoCanvas.tsx
// Renders a black-on-white JPEG logo with transparent background + amber tint
import { useEffect, useRef, useState } from 'react';

interface Props {
  src: string;
  alt: string;
  width?: number;  // max pixel width
  style?: React.CSSProperties;
}

export default function LogoCanvas({ src, alt, width = 800, style }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Maintain aspect ratio
      const scale = Math.min(1, width / img.width);
      canvas.width  = Math.round(img.width  * scale);
      canvas.height = Math.round(img.height * scale);

      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imageData.data;

      for (let i = 0; i < d.length; i += 4) {
        const r = d[i], g = d[i + 1], b = d[i + 2];
        const brightness = (r + g + b) / 3;

        if (brightness > 140) {
          // Near-white / light pixel → fully transparent
          d[i + 3] = 0;
        } else {
          // Dark pixel (the calligraphy ink) → tint to warm amber/gold
          // Map 0 (black) → amber (#C9A227) and darker greys → darker amber
          const t = 1 - brightness / 140; // 0 = near-threshold, 1 = pure black
          // Target amber: R=201, G=162, B=39
          d[i]     = Math.round(r + (201 - r) * t);
          d[i + 1] = Math.round(g + (162 - g) * t);
          d[i + 2] = Math.round(b + (39  - b) * t);
          d[i + 3] = Math.round(255 * t * 1.1); // opacity follows darkness + slight boost
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setReady(true);
    };
  }, [src, width]);

  return (
    <canvas
      ref={canvasRef}
      aria-label={alt}
      role="img"
      style={{
        display: 'block',
        opacity: ready ? 1 : 0,
        transition: 'opacity 0.4s ease',
        animation: 'float 4s ease-in-out infinite',
        ...style,
      }}
    />
  );
}
