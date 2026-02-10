import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const ElevatedDots = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const dotRefs = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const dots = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    row: Math.floor(i / 2),
    col: i % 2,
  }));

  const getInfluence = (index) => {
    const dotEl = dotRefs.current[index];
    if (!dotEl) return 0;

    const rect = dotEl.getBoundingClientRect();
    const dotCenterX = rect.left + rect.width / 2;
    const dotCenterY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
      Math.pow(mousePos.x - dotCenterX, 2) + Math.pow(mousePos.y - dotCenterY, 2)
    );

    const maxDistance = 300;
    return Math.max(0, 1 - distance / maxDistance);
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Back button - fixed top left */}
      <Link
        to="/"
        className="fixed top-6 left-6 z-50 text-slate-400 hover:text-blue-400 transition-colors"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </Link>

      {/* Grainy texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Centered dots grid */}
      <div
        ref={containerRef}
        className="absolute inset-0 flex items-center justify-center px-[10%] py-[15%]"
      >
        <div className="grid grid-cols-2 gap-x-32 gap-y-24 md:gap-x-40 md:gap-y-32">
          {dots.map((dot, index) => {
            const influence = getInfluence(index);
            const elevation = 2 + influence * 10;

            return (
              <div
                key={dot.id}
                ref={(el) => (dotRefs.current[index] = el)}
                className="relative flex items-center justify-center"
                style={{
                  transform: `translateY(-${influence * 4}px) scale(${1 + influence * 0.3})`,
                  transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                {/* Main dot */}
                <div
                  className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 relative"
                  style={{
                    boxShadow: `
                      0 ${elevation * 2}px ${elevation * 4}px rgba(0, 0, 0, ${0.3 + influence * 0.2}),
                      0 ${elevation}px ${elevation * 2}px rgba(0, 0, 0, ${0.2 + influence * 0.1}),
                      0 0 ${10 + influence * 30}px rgba(59, 130, 246, ${0.3 + influence * 0.6}),
                      inset 0 1px 2px rgba(255, 255, 255, 0.3)
                    `,
                  }}
                >
                  {/* Glow ring */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle, rgba(147, 197, 253, 0.5) 0%, transparent 70%)',
                      transform: `scale(${2 + influence * 3})`,
                      opacity: 0.4 + influence * 0.6,
                      transition: 'all 0.3s ease-out',
                    }}
                  />

                  {/* Highlight */}
                  <div className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-white opacity-70" />
                </div>

                {/* Shadow */}
                <div
                  className="absolute w-6 h-1 rounded-full bg-black/30 blur-sm pointer-events-none"
                  style={{
                    top: '100%',
                    marginTop: `${elevation * 1.5}px`,
                    opacity: 0.4 - influence * 0.2,
                    transform: `scale(${1 - influence * 0.2})`,
                    transition: 'all 0.3s ease-out',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ElevatedDots;
