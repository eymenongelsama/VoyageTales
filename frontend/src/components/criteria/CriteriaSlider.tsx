import React from 'react';

interface Props {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const CriteriaSlider: React.FC<Props> = ({ label, value, onChange }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-sm text-gray-500">{value}/10</span>
      </div>
      <input
        type="range"
        min="0"
        max="10"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1e90ff]"
      />
    </div>
  );
};

export default CriteriaSlider;