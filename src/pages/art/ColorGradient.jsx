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
    <div className="relative w-full h-screen overflow-hidden">
      <Link
        to="/"
        className="fixed top-6 left-6 z-50 text-white hover:text-purple-200 transition-colors drop-shadow-lg"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </Link>

      <div className="absolute inset-0 transition-all duration-100" style={gradientStyle} />
    </div>
  );
};

export default ColorGradient;
