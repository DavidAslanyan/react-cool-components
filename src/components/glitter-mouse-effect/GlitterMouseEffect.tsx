import { useEffect, useState } from 'react';

interface GlitterMouseEffectProps {
  color?: string; 
}

const GlitterMouseEffect: React.FC<GlitterMouseEffectProps> = ({
  color = 'rgba(255, 255, 255, 0.4)', 
}) => {
  const [glows, setGlows] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const id = Date.now() + Math.random();
      const newGlow = { x: e.clientX, y: e.clientY, id };
      setGlows((prev) => [...prev, newGlow]);

      setTimeout(() => {
        setGlows((prev) => prev.filter((g) => g.id !== id));
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0">
        {glows.map((glow) => (
          <div
            key={glow.id}
            className="absolute w-40 h-40 rounded-full"
            style={{
              top: glow.y,
              left: glow.x,
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle, ${color} 0%, rgba(255,255,255,0) 80%)`,
              animation: 'fadeGlow 1s ease-out forwards',
              filter: 'blur(22px)',
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes fadeGlow {
          from {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1);
          }
          to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }
      `}</style>
    </>
  );
};

export default GlitterMouseEffect;
