import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CountriesResponse, Country } from '../../types/country';
import { useNavigate } from 'react-router-dom';
import CountryCard from './CountryCard';

// API URL ve Token'ı çevre değişkenlerinden alıyoruz
const BASE_URL = import.meta.env.VITE_API_BASE_URL; // Temel URL
const API_URL = `${BASE_URL}/api/matching-countries/`; // Spesifik uç nokta
const TOKEN = import.meta.env.VITE_API_TOKEN;

const CountryList: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState<string | null>(null);

  const navigate = useNavigate();

  const fetchCountries = async (url: string, retries = 3) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<CountriesResponse>(url, {
        headers: {
          Authorization: `Token ${TOKEN}`,
        },
      });
      setCountries(response.data.results);
      setNextPage(response.data.next);
      setPreviousPage(response.data.previous);
    } catch (err) {
      if (retries > 0) {
        // Retry mekanizması
        fetchCountries(url, retries - 1);
      } else {
        setError('Veriler çekilirken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries(API_URL);
  }, []);

  const handleNext = () => {
    if (nextPage) fetchCountries(nextPage);
  };

  const handlePrevious = () => {
    if (previousPage) fetchCountries(previousPage);
  };

  const handleCardClick = (id: number) => {
    navigate(`/country/${id}`);
  };

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!countries.length) return <p className="text-gray-500">Listelenecek ülke bulunamadı.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Ülkeler</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {countries.map((country) => (
          <div
            key={country.id}
            onClick={() => handleCardClick(country.id)}
            className="cursor-pointer"
          >
            <CountryCard country={country} />
          </div>
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