import React, { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';

const backgrounds = [
  'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1504214208698-ea446addfa7e?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80'
];

const groupTypes = [
  'Solo', 'Family', 'Friends', 'Couples', 'Retired Couples', 'Digital Nomads'
];

const Hero = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('Select Group Type');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[calc(100vh-64px)] overflow-hidden">
      {/* Background Image */}
      {backgrounds.map((bg, index) => (
        <div
          key={bg}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: currentBg === index ? 1 : 0,
          }}
        />
      ))}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl md:text-6xl text-white font-bold text-center mb-6">
          Discover Your Perfect Destination
        </h1>
        <p className="text-xl text-white/90 mb-8 text-center max-w-2xl">
          Find the ideal location that matches your lifestyle and preferences
        </p>

        {/* Search Section */}
        <div className="w-full max-w-3xl space-y-4">
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Where would you like to go?"
                className="w-full px-4 py-3 rounded-lg pl-10 bg-white/95"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>

            {/* Group Type Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full sm:w-48 px-4 py-3 bg-white/95 rounded-lg flex items-center justify-between"
              >
                <span className="truncate">{selectedGroup}</span>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </button>

              {isDropdownOpen && (
                <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg py-2 z-20">
                  {groupTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setSelectedGroup(type);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button className="bg-[#1e90ff] text-white px-6 py-3 rounded-lg hover:bg-[#1e90ff]/90 transition-colors">
              Explore Destinations
            </button>
            <button className="bg-white text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Start Planning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;