import React from 'react';
import { Globe2 } from 'lucide-react';
import { Country } from '../../types/country';

interface Props {
  country: Country;
}

const CountryCard: React.FC<Props> = ({ country }) => {

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02] h-full">
      {/* Görsel Bölgesi */}
      <div className="relative h-64">
        <img
        src={
          country.image 
            ? `http://127.0.0.1:8000${country.image}`
            : "http://127.0.0.1:8000/media/defaults/default_world_image.jpg"
        }
          alt={country.name}
          className="w-full h-full object-cover"
          loading="lazy" // Performans için lazy loading eklendi
        />
        {/* Eşleşme Yüzdesi */}
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
          <Globe2 className="h-5 w-5 text-[#1e90ff]" />
          <span className="text-sm font-semibold">{country.match_percentage}% Match</span>
        </div>
      </div>

      {/* Bilgi Bölgesi */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900">{country.name}</h3>
        <p className="text-base text-gray-600 mb-4">{country.description}</p>
        <div className="flex flex-wrap gap-2">
          {country.features && country.features.length > 0 ? (
            country.features.map((feature, index) => (
              <span
                key={index}
                className="text-sm px-3 py-1 bg-blue-200 text-blue-700 rounded-full hover:bg-blue-300"
              >
                {feature}
              </span>
            ))
          ) : (
            <span className="text-sm px-3 py-1 bg-red-100 text-red-800 rounded-full">
              Özellik yok
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryCard;