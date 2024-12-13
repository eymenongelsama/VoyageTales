import React from 'react';
import CountryCard from './CountryCard';
import { Country } from '../../types/country';

interface Props {
  countries: Country[];
}

const CountryList: React.FC<Props> = ({ countries }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Matching Countries</h3>
        <span className="text-sm text-gray-500">{countries.length} matches found</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {countries.map((country) => (
          <CountryCard key={country.name} country={country} />
        ))}
      </div>
    </div>
  );
};

export default CountryList;