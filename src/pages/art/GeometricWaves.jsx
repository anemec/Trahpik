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
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
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
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
      <Link
        to="/"
        className="fixed top-6 left-6 z-50 text-white hover:text-purple-400 transition-colors"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </Link>

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default GeometricWaves;
