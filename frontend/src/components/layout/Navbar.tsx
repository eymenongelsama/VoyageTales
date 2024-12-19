import React from 'react';
import { Compass } from 'lucide-react';
import { NavigationProps } from '../../types/navigation';

const Navbar: React.FC<NavigationProps> = ({ currentStep, onNavigate }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <button 
            onClick={() => onNavigate('options')}
            className="flex items-center hover:text-[#1e90ff] transition-colors"
          >
            <Compass className="h-8 w-8 text-[#1e90ff]" />
            <span className="ml-2 text-xl font-bold text-gray-900">TravelMatch</span>
          </button>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => onNavigate('options')}
              className={`text-gray-700 hover:text-[#1e90ff] transition-colors ${
                currentStep === 'options' ? 'text-[#1e90ff] border-b-2 border-[#1e90ff]' : ''
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => onNavigate('criteria')}
              className={`text-gray-700 hover:text-[#1e90ff] transition-colors ${
                currentStep === 'criteria' ? 'text-[#1e90ff] border-b-2 border-[#1e90ff]' : ''
              }`}
            >
              Countries
            </button>
            <button 
              onClick={() => onNavigate('auth')}
              className="bg-[#1e90ff] text-white px-4 py-2 rounded-lg hover:bg-[#1e90ff]/90 transition-colors"
            >
              {currentStep === 'auth' ? 'Sign In' : 'Account'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;