// src/components/criteria/CountryCard.tsx

import React from 'react';
import { Globe2 } from 'lucide-react';
import { Country } from '../../types/country';

interface Props {
  country: Country;
}

const CountryCard: React.FC<Props> = ({ country }) => {
  // Varsayılan görsel URL'si
  const defaultImage = "http://127.0.0.1:8000/media/defaults/default_world_image.jpg";

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
      <div className="relative h-24">
        <img
          src={country.image_url || defaultImage}
          alt={country.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
          <Globe2 className="h-4 w-4 text-[#1e90ff]" />
          <span className="text-xs font-semibold">{country.match_percentage}% Match</span>
        </div>
      </div>
      <div className="p-2">
        <h3 className="text-lg font-bold text-gray-900">{country.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{country.description}</p>
        <div className="flex flex-wrap gap-1">
          {country.features && country.features.length > 0 ? (
            country.features.map((feature) => (
              <span
                key={feature.id}
                className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full"
              >
                {feature.name}
              </span>
            ))
          ) : (
            <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">
              Özellik yok
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryCard;