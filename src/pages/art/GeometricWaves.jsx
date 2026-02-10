import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const GeometricWaves = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const waves = 6;
      const amplitude = 50;
      const frequency = 0.02;

      for (let i = 0; i < waves; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `hsl(${(i * 60 + time * 50) % 360}, 70%, 50%)`;
        ctx.lineWidth = 3;

        for (let x = 0; x <= canvas.width; x++) {
          const y = canvas.height / 2 +
                   Math.sin(x * frequency + time + i * 0.5) * amplitude +
                   Math.sin(x * frequency * 2 - time) * (amplitude / 2);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <header className="bg-gray-800 p-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-white hover:text-purple-400 transition-colors flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-lg font-semibold">Back to Gallery</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Geometric Waves</h1>
          <p className="text-gray-300 mb-8 text-lg">
            Watch the mesmerizing patterns of geometric waves flowing across the canvas.
            Each wave moves at its own rhythm, creating an ever-changing display of colors and motion.
          </p>

          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
            <canvas
              ref={canvasRef}
              className="w-full aspect-video md:aspect-[16/9]"
            />
          </div>

          <div className="mt-8 bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">About This Piece</h2>
            <p className="text-gray-300 leading-relaxed">
              This generative art piece uses mathematical sine waves to create flowing patterns.
              The waves continuously animate, with each layer moving at different frequencies and phases,
              creating a hypnotic visual experience. The colors cycle through the hue spectrum,
              adding depth and vibrancy to the composition.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GeometricWaves;
