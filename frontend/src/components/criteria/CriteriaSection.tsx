import React, { useState, useEffect } from 'react';
import CriteriaSlider from './CriteriaSlider';
import { allCriteria, CriteriaType } from '../../constants/criteria';
import axios from 'axios';

const CriteriaSection: React.FC = () => {
  // Kriterleri 5 değeriyle başlatıyoruz
  const [values, setValues] = useState<Record<CriteriaType, number>>(
    allCriteria.reduce((acc, criteria) => ({
      ...acc,
      [criteria]: 5,
    }), {} as Record<CriteriaType, number>)
  );

  // Eşleşen ülkeler
  const [countries, setCountries] = useState<{ country: string; description: string; match_percentage: number; }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // API çağrısını yapmak için fonksiyon
  const fetchMatchingCountries = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_CALCULATE_URL}`, 
        { criteria: values }, 
        {
          headers: {
            Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        });
      setCountries(response.data);
    } catch (err) {
      setError('Veriler alınırken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  // Slider değişikliklerini yönetme
  const handleChange = (criteria: CriteriaType, value: number) => {
    setValues((prev) => ({ ...prev, [criteria]: value }));
  };

  useEffect(() => {
    // İlk yüklemede API'yi çağırabiliriz
    fetchMatchingCountries();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Set Your Preferences</h2>
      <div className="space-y-4">
        {allCriteria.map((criteria) => (
          <div key={criteria} className="transform transition-all duration-300 hover:scale-[1.02]">
            <CriteriaSlider
              label={criteria}
              value={values[criteria]}
              onChange={(value) => handleChange(criteria, value)}
            />
          </div>
        ))}
      </div>
      <button
        onClick={fetchMatchingCountries}
        className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
      >
        Get Matching Countries
      </button>

      {/* Yükleniyor durumu */}
      {loading && <p>Loading...</p>}

      {/* Hata mesajı */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Eşleşen ülkeler */}
      <div className="space-y-4">
        {countries.map((country) => (
          <div key={country.country} className="border p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold">{country.country}</h3>
            <p>{country.description}</p>
            <p className="text-sm text-gray-600">Match: {country.match_percentage}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CriteriaSection;