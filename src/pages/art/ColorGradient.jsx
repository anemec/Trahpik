import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ColorGradient = () => {
  const [gradientAngle, setGradientAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientAngle((prev) => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const gradientStyle = {
    background: `linear-gradient(${gradientAngle}deg,
      #667eea 0%,
      #764ba2 25%,
      #f093fb 50%,
      #4facfe 75%,
      #00f2fe 100%)`,
  };

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
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Color Gradient</h1>
          <p className="text-gray-300 mb-8 text-lg">
            Experience the smooth transition of colors as they rotate and blend seamlessly.
            This piece explores the beauty of color theory and gradient animations.
          </p>

          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl p-4">
            <div
              className="w-full aspect-video md:aspect-[16/9] rounded-lg transition-all duration-100"
              style={gradientStyle}
            />
          </div>

          <div className="mt-8 bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">About This Piece</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              This artwork showcases a continuously rotating gradient that cycles through
              a carefully selected palette of colors. The gradient angle changes smoothly,
              creating a dynamic and calming visual experience.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
              <div className="text-center">
                <div className="w-full aspect-square rounded-lg mb-2" style={{ background: '#667eea' }} />
                <p className="text-gray-400 text-sm">#667eea</p>
              </div>
              <div className="text-center">
                <div className="w-full aspect-square rounded-lg mb-2" style={{ background: '#764ba2' }} />
                <p className="text-gray-400 text-sm">#764ba2</p>
              </div>
              <div className="text-center">
                <div className="w-full aspect-square rounded-lg mb-2" style={{ background: '#f093fb' }} />
                <p className="text-gray-400 text-sm">#f093fb</p>
              </div>
              <div className="text-center">
                <div className="w-full aspect-square rounded-lg mb-2" style={{ background: '#4facfe' }} />
                <p className="text-gray-400 text-sm">#4facfe</p>
              </div>
              <div className="text-center">
                <div className="w-full aspect-square rounded-lg mb-2" style={{ background: '#00f2fe' }} />
                <p className="text-gray-400 text-sm">#00f2fe</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ColorGradient;
