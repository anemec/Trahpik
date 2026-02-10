import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GeometricWaves from './pages/art/GeometricWaves';
import ColorGradient from './pages/art/ColorGradient';
import ParticleSystem from './pages/art/ParticleSystem';
import ElevatedDots from './pages/art/ElevatedDots';

function App() {
  return (
    <Router basename="/Trahpik">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/art/geometric-waves" element={<GeometricWaves />} />
        <Route path="/art/color-gradient" element={<ColorGradient />} />
        <Route path="/art/particle-system" element={<ParticleSystem />} />
        <Route path="/art/elevated-dots" element={<ElevatedDots />} />
      </Routes>
    </Router>
  );
}

export default App;
