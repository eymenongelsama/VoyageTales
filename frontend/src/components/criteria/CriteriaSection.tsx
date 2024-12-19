import React, { useState } from 'react';
import CriteriaSlider from './CriteriaSlider';
import { allCriteria, CriteriaType } from '../../constants/criteria';
import { fetchMatchingCountries } from '../../api/calculateMatchAPI';

interface CriteriaSectionProps {
  onUpdate: (countries: any[]) => void;
}

const CriteriaSection: React.FC<CriteriaSectionProps> = ({ onUpdate }) => {
  const [values, setValues] = useState<Record<CriteriaType, number>>(
    allCriteria.reduce(
      (acc, criteria) => ({ ...acc, [criteria]: 5 }),
      {} as Record<CriteriaType, number>
    )
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (criteria: CriteriaType, value: number) => {
    setValues((prev) => ({ ...prev, [criteria]: value }));
  };

  const handleFetch = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchMatchingCountries(values);
      const fetchedCountries = data.results || [];
      onUpdate(fetchedCountries); // Ülkeleri üst bileşene bildir
    } catch (err) {
      setError((err as Error).message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Set Your Preferences</h2>

      {/* Kriterler için Slider */}
      <div className="space-y-4">
        {allCriteria.map((criteria) => (
          <div key={criteria}>
            <CriteriaSlider
              label={criteria}
              value={values[criteria]}
              onChange={(value) => handleChange(criteria, value)}
            />
          </div>
        ))}
      </div>

      {/* Fetch Butonu */}
      <button
        onClick={handleFetch}
        className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
      >
        Get Matching Countries
      </button>

      {/* Loading ve Hata Durumları */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default CriteriaSection;