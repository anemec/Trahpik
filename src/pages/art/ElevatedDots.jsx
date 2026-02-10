import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const ElevatedDots = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const dots = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    row: Math.floor(i / 2),
    col: i % 2,
  }));

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <header className="bg-slate-950/50 backdrop-blur-sm p-4 shadow-2xl border-b border-slate-800/50 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-lg font-semibold">Back to Gallery</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 relative overflow-hidden">
        {/* Grainy texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="container mx-auto px-[10%] py-[15%] min-h-screen" ref={containerRef}>
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-100 mb-4">
              Elevated Dots
            </h1>
            <p className="text-lg md:text-xl text-slate-400">
              A minimalist composition exploring depth, shadow, and spatial relationships
            </p>
          </div>

          {/* Dots Grid */}
          <div className="relative max-w-2xl mx-auto aspect-[2/3] flex items-center justify-center">
            <div className="grid grid-cols-2 gap-x-32 gap-y-24 md:gap-x-40 md:gap-y-32">
              {dots.map((dot) => {
                const dotX = dot.col * 200 + 100;
                const dotY = dot.row * 150 + 100;
                const distance = Math.sqrt(
                  Math.pow(mousePos.x - dotX, 2) + Math.pow(mousePos.y - dotY, 2)
                );
                const maxDistance = 400;
                const influence = Math.max(0, 1 - distance / maxDistance);
                const elevation = 2 + influence * 8;

                return (
                  <div
                    key={dot.id}
                    className="relative flex items-center justify-center"
                    style={{
                      transform: `translateZ(${elevation}px) scale(${1 + influence * 0.2})`,
                      transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                  >
                    {/* Main dot with elevation effect */}
                    <div
                      className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 relative"
                      style={{
                        boxShadow: `
                          0 ${elevation * 2}px ${elevation * 4}px rgba(0, 0, 0, ${0.3 + influence * 0.2}),
                          0 ${elevation}px ${elevation * 2}px rgba(0, 0, 0, ${0.2 + influence * 0.1}),
                          0 0 ${10 + influence * 20}px rgba(59, 130, 246, ${0.3 + influence * 0.5}),
                          inset 0 1px 2px rgba(255, 255, 255, 0.3)
                        `,
                      }}
                    >
                      {/* Glow ring */}
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: 'radial-gradient(circle, rgba(147, 197, 253, 0.4) 0%, transparent 70%)',
                          transform: `scale(${2 + influence * 2})`,
                          opacity: 0.6 + influence * 0.4,
                          transition: 'all 0.3s ease-out',
                        }}
                      />

                      {/* Reflection highlight */}
                      <div
                        className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-white opacity-60"
                      />
                    </div>

                    {/* Ambient occlusion shadow */}
                    <div
                      className="absolute w-6 h-1 rounded-full bg-black/30 blur-sm"
                      style={{
                        top: '100%',
                        marginTop: `${elevation * 1.5}px`,
                        opacity: 0.3 - influence * 0.15,
                        transform: `scale(${1 - influence * 0.3})`,
                        transition: 'all 0.3s ease-out',
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Info section */}
          <div className="mt-24 max-w-2xl mx-auto">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-slate-100 mb-4">Design Approach</h2>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  This piece explores <span className="text-blue-400 font-medium">elevation and depth</span> through
                  multiple shadow layers and interactive parallax effects. The dots respond to cursor
                  proximity, creating a sense of three-dimensional space.
                </p>
                <p>
                  Inspired by awwwards-winning designs, this composition uses:
                </p>
                <ul className="list-none space-y-2 ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span><strong className="text-slate-200">Layered shadows</strong> - Multiple shadow depths simulate physical elevation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">•</span>
                    <span><strong className="text-slate-200">Ambient occlusion</strong> - Soft shadows beneath create grounding</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span><strong className="text-slate-200">Gradient mesh</strong> - Blue-to-purple gradient adds dimensionality</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">•</span>
                    <span><strong className="text-slate-200">Grain texture</strong> - Subtle noise adds tactile quality</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span><strong className="text-slate-200">Dynamic lighting</strong> - Glows intensify with interaction</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ElevatedDots;
