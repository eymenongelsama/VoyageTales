import React, { useState } from 'react';
import CriteriaSlider from './CriteriaSlider';
import CountryList from './CountryList';
import { initialCriteria, additionalCriteria, CriteriaType } from '../../constants/criteria';
import { sampleCountries } from '../../types/country';

const CriteriaSection = () => {
  const [showAll, setShowAll] = useState(false);
  const [values, setValues] = useState<Record<CriteriaType, number>>(
    [...initialCriteria, ...additionalCriteria].reduce((acc, criteria) => ({
      ...acc,
      [criteria]: 5,
    }), {} as Record<CriteriaType, number>)
  );

  const handleChange = (criteria: CriteriaType, value: number) => {
    setValues((prev) => ({ ...prev, [criteria]: value }));
  };

  const activeCriteria = showAll
    ? [...initialCriteria, ...additionalCriteria]
    : initialCriteria;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Set Your Preferences</h2>
            <div className="space-y-4">
              {activeCriteria.map((criteria) => (
                <div
                  key={criteria}
                  className="transform transition-all duration-300 hover:scale-[1.02]"
                >
                  <CriteriaSlider
                    label={criteria}
                    value={values[criteria]}
                    onChange={(value) => handleChange(criteria, value)}
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowAll(!showAll)}
              className="w-full py-3 px-4 bg-[#1e90ff]/10 text-[#1e90ff] rounded-lg font-medium hover:bg-[#1e90ff]/20 transition-colors"
            >
              {showAll ? 'Show Less Options' : 'More Options'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <CountryList countries={sampleCountries} />
        </div>
      </div>
    </div>
  );
};

export default CriteriaSection;