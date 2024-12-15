// src/components/criteria/CountryList.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CountriesResponse, Country } from '../../types/country';
import CountryCard from './CountryCard';

const CountryList: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState<string | null>(null);

  const fetchCountries = async (url: string) => {
    try {
      setLoading(true);
      const response = await axios.get<CountriesResponse>(url);
      setCountries(response.data.results);
      setNextPage(response.data.next);
      setPreviousPage(response.data.previous);
      setLoading(false);
    } catch (err) {
      setError('Veriler çekilirken bir hata oluştu.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries('http://127.0.0.1:8000/api/matching-countries/');
  }, []);

  const handleNext = () => {
    if (nextPage) {
      fetchCountries(nextPage);
    }
  };

  const handlePrevious = () => {
    if (previousPage) {
      fetchCountries(previousPage);
    }
  };

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Ülkeler</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {countries.map((country) => (
          <CountryCard key={country.id} country={country} />
        ))}
      </div>
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={handlePrevious}
          disabled={!previousPage}
          className={`px-4 py-2 bg-blue-500 text-white rounded ${
            !previousPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
        >
          Önceki Sayfa
        </button>
        <button
          onClick={handleNext}
          disabled={!nextPage}
          className={`px-4 py-2 bg-blue-500 text-white rounded ${
            !nextPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
        >
          Sonraki Sayfa
        </button>
      </div>
    </div>
  );
};

export default CountryList;