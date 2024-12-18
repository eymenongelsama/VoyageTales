import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Flag, DollarSign, Building2, ChevronDown, ChevronUp } from 'lucide-react';
import useCountry from '../../hooks/useCountry';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorDisplay } from '../common/ErrorDisplay';

// Helper function to create short description
const truncateText = (text: string, wordLimit: number) => {
  const words = text.split(' ');
  if (words.length > wordLimit) {
    return {
      shortDescription: words.slice(0, wordLimit).join(' ') + '...',
      fullText: text,
    };
  }
  return { shortDescription: text, fullText: text };
};

interface Coordinates {
  lat: number;
  lng: number;
}

interface CountryDetailProps {
  coordinates: Coordinates;
}

const CountryDetail: React.FC<CountryDetailProps> = ({ coordinates }) => {
  const { id } = useParams<{ id: string }>();
  const countryId = parseInt(id || '1', 10); // Default olarak "1" kullanılacak.
  const { loading, error, country } = useCountry(countryId);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => setIsExpanded(!isExpanded);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error.message} />;
  if (!country || !country.name) return <ErrorDisplay message="Country not found" />;

  // Short description logic
  const { shortDescription, fullText } = truncateText(country.long_description || 'No description available.', 90);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${country.image_url || '/defaults/default_world_image.jpg'})`,
            filter: 'brightness(0.7)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h1 className="text-6xl font-bold text-white mb-4">
            {country.name} {country.flag && <span>{country.flag}</span>}
          </h1>
        </div>
      </div>

      {/* Quick Facts Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <QuickFact icon={<Building2 />} label="Capital" value={country.capital || 'N/A'} />
          <QuickFact icon={<MapPin />} label="Population" value={country.population?.toLocaleString() || 'Unknown'} />
          <QuickFact icon={<DollarSign />} label="Currency" value={country.currency || 'Not Available'} />
          <QuickFact icon={<Flag />} label="Language" value={country.language || 'Not Specified'} />
          <QuickFact icon={<MapPin />} label="Match Percentage" value={`${country.match_percentage}%`} />
        </div>
      </div>

      {/* Description Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-semibold mb-6">About {country.name}</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {isExpanded ? fullText : shortDescription}
            </p>
          </div>
          <button
            onClick={toggleDescription}
            className="mt-4 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            {isExpanded ? (
              <>
                Show Less <ChevronUp className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                Read More <ChevronDown className="ml-1 h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-semibold mb-6">Location</h2>
          <div className="h-[400px] w-full rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">Map is not available yet</p>
          </div>
          <div className="mt-4">
            <p>Latitude: {country.latitude || coordinates.lat}</p>
            <p>Longitude: {country.longitude || coordinates.lng}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Quick Fact Component
interface QuickFactProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const QuickFact: React.FC<QuickFactProps> = ({ icon, label, value }) => (
  <div className="flex items-center space-x-4">
    <div className="h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full text-blue-600">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);

export default CountryDetail;