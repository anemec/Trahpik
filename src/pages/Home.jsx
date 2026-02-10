import { Link } from 'react-router-dom';

const Home = () => {
  const artPieces = [
    { id: 'geometric-waves', title: 'Geometric Waves', description: 'A mesmerizing pattern of geometric waves' },
    { id: 'color-gradient', title: 'Color Gradient', description: 'Smooth color transitions and gradients' },
    { id: 'particle-system', title: 'Particle System', description: 'Dynamic particle animation system' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Art Gallery
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
            Explore our collection of generated art pieces
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artPieces.map((piece) => (
            <Link
              key={piece.id}
              to={`/art/${piece.id}`}
              className="block group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform group-hover:scale-105">
                <div className="aspect-square bg-gradient-to-br from-purple-400 to-blue-500 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-40">
                    View Art
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {piece.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {piece.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
