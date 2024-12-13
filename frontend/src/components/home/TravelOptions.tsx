import React, { useState } from 'react';
import { TravelGroup, HolidayType, UserPreferences } from '../../types';
import { Users, Plane, Building, Sun, Laptop } from 'lucide-react';

const travelGroups: TravelGroup[] = ['Solo', 'Family', 'Friends', 'Couples', 'Retired Couples', 'Digital Nomads'];

const holidayTypes: { type: HolidayType; icon: React.ReactNode }[] = [
  { type: 'Short Term Holiday', icon: <Plane className="h-6 w-6" /> },
  { type: 'Medium Term Accommodation', icon: <Building className="h-6 w-6" /> },
  { type: 'Long Term Settlement', icon: <Building className="h-6 w-6" /> },
  { type: 'Seasonal Escape', icon: <Sun className="h-6 w-6" /> },
  { type: 'Business Focused', icon: <Laptop className="h-6 w-6" /> },
];

interface Props {
  onComplete: (preferences: UserPreferences) => void;
}

const TravelOptions: React.FC<Props> = ({ onComplete }) => {
  const [selectedGroup, setSelectedGroup] = useState<TravelGroup | null>(null);
  const [selectedType, setSelectedType] = useState<HolidayType | null>(null);

  const handleConfirm = () => {
    if (selectedGroup && selectedType) {
      onComplete({ travelGroup: selectedGroup, holidayType: selectedType });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Who are you traveling with?</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {travelGroups.map((group) => (
            <button
              key={group}
              onClick={() => setSelectedGroup(group)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedGroup === group
                  ? 'border-[#1e90ff] bg-[#1e90ff]/10'
                  : 'border-gray-200 hover:border-[#1e90ff]/50'
              }`}
            >
              <Users className="h-6 w-6 mb-2" />
              <span className="font-medium">{group}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What type of stay are you looking for?</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {holidayTypes.map(({ type, icon }) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedType === type
                  ? 'border-[#1e90ff] bg-[#1e90ff]/10'
                  : 'border-gray-200 hover:border-[#1e90ff]/50'
              }`}
            >
              {icon}
              <span className="font-medium block mt-2">{type}</span>
            </button>
          ))}
        </div>
      </div>

      {selectedGroup && selectedType && (
        <div className="flex justify-center">
          <button
            onClick={handleConfirm}
            className="group relative px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-[#1e90ff] to-[#32cd32] rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <span className="relative z-10">Confirm Now</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TravelOptions;