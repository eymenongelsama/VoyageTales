import React from 'react';
import { Globe2 } from 'lucide-react';
import { Country } from '../../types/country';

interface Props {
  country: Country;
}

const CountryCard: React.FC<Props> = ({ country }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
      <div className="relative h-48">
        <img
          src={country.imageUrl}
          alt={country.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
          <Globe2 className="h-4 w-4 text-[#1e90ff]" />
          <span className="text-sm font-semibold">{country.matchScore}% Match</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{country.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{country.description}</p>
        <div className="flex flex-wrap gap-2">
          {country.highlights.map((highlight, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-[#1e90ff]/10 text-[#1e90ff] rounded-full"
            >
              {highlight}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountryCard;