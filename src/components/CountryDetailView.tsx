import { ArrowLeft } from 'lucide-react';
import { InitiativeCard } from './InitiativeCard';
import { getCountryFlag } from '../utils/countries';
import { CountryData } from '../utils/countryAggregator';

interface CountryDetailViewProps {
  countryData: CountryData;
  onBack: () => void;
}

export const CountryDetailView = ({ countryData, onBack }: CountryDetailViewProps) => {
  const flagEmoji = getCountryFlag(countryData.country);
  const { country, initiatives, initiativeCount } = countryData;

  const handleBackClick = () => {
    onBack();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onBack();
    }
  };

  return (
    <div className="relative">
      {/* Header with back navigation */}
      <div className="mb-8">
        <button
          onClick={handleBackClick}
          onKeyDown={handleKeyDown}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-6 group"
          aria-label="Back to countries"
        >
          <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          <span className="text-base">Back to Countries</span>
        </button>
        
        {/* Country header */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-6xl">{flagEmoji}</span>
          <div>
            <h1 className="text-4xl font-medium text-gray-800 dark:text-white mb-2">
              {country}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {initiativeCount} {initiativeCount === 1 ? 'initiative' : 'initiatives'}
            </p>
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-gray-400 dark:from-gray-800 to-transparent" />
      </div>

      {/* Initiatives grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {initiatives.map((initiative) => (
          <InitiativeCard 
            key={initiative.id} 
            initiative={initiative} 
          />
        ))}
      </div>

      {/* Empty state (shouldn't happen, but good to have) */}
      {initiatives.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No initiatives found for {country}.</p>
        </div>
      )}
    </div>
  );
};