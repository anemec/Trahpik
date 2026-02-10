import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const ParticleSystem = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.radius = Math.random() * 3 + 1;
        this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
        this.life = 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 0.005;

        if (this.life <= 0 || this.x < 0 || this.x > canvas.width ||
            this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const particles = Array.from({ length: 100 }, () => new Particle());

    const animate = () => {
      ctx.fillStyle = 'rgba(17, 24, 39, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(147, 197, 253, ${(1 - distance / 100) * 0.3})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

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
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Particle System</h1>
          <p className="text-gray-300 mb-8 text-lg">
            An interactive particle system where colorful particles drift and connect,
            forming an ever-changing network of relationships.
          </p>

          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
            <canvas
              ref={canvasRef}
              className="w-full aspect-video md:aspect-[16/9]"
            />
          </div>

          <div className="mt-8 bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">About This Piece</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              This generative artwork simulates a particle system where individual particles
              move independently through space. When particles come close to each other,
              they form temporary connections, creating a dynamic network visualization.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Each particle has its own lifecycle, fading in and out of existence while
              continuously moving. The connections between particles vary in opacity based
              on their distance, creating depth and visual interest.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ParticleSystem;
