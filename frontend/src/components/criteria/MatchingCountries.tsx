import React from 'react';

interface Country {
  country: string;
  description: string;
  match_percentage: number;
  features?: string[];
  image_url?: string;
}

interface MatchingCountriesProps {
  countries: Country[];
}

const MatchingCountries: React.FC<MatchingCountriesProps> = ({ countries }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {countries.map((countryObj) => (
        <div key={countryObj.country} className="bg-white border p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-2">{countryObj.country}</h3>
          <p className="text-sm text-gray-700 mb-2">{countryObj.description}</p>
          <p className="text-sm text-gray-600 mb-2">Match: {countryObj.match_percentage}%</p>
          <img
            src={
              countryObj.image_url
                ? `http://127.0.0.1:8000${countryObj.image_url}`
                : 'http://127.0.0.1:8000/media/defaults/default_world_image.jpg'
            }
            alt={countryObj.country}
            className="w-full h-32 object-cover mt-2 rounded"
          />
          {countryObj.features && countryObj.features.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {countryObj.features.map((feature, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded"
                >
                  {feature}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MatchingCountries;