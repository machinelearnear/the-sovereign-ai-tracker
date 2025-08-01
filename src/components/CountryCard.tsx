import { getCountryFlag } from '../utils/countries';

interface CountryCardProps {
  country: string;
  initiativeCount: number;
  region: string;
  onClick: (country: string) => void;
}

export const CountryCard = ({ 
  country, 
  initiativeCount, 
  region, 
  onClick 
}: CountryCardProps) => {
  const flagEmoji = getCountryFlag(country);

  const handleClick = () => {
    onClick(country);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick(country);
    }
  };

  return (
    <div
      className="group relative h-40 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 z-0"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${initiativeCount} initiative${initiativeCount !== 1 ? 's' : ''} from ${country}`}
    >
      {/* Background with hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 via-blue-900/20 to-gray-900/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
      
      {/* Card content */}
      <div className="relative flex-1 flex flex-col items-center justify-center w-full bg-white/90 dark:bg-gray-950 rounded-xl p-3 border border-gray-300/50 dark:border-gray-800/50 backdrop-blur-xl transition-all duration-300 group-hover:border-gray-400 dark:group-hover:border-gray-700 group-hover:bg-gray-50 dark:group-hover:bg-gray-900 group-hover:shadow-lg">
        
        {/* Flag emoji - large and prominent */}
        <div className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-110">
          {flagEmoji}
        </div>
        
        {/* Text content grouped closer together */}
        <div className="flex flex-col items-center space-y-0.5">
          {/* Country name */}
          <h3 className="text-base font-medium text-gray-800 dark:text-white text-center transition-colors leading-tight">
            {country}
          </h3>
          
          {/* Initiative count */}
          <div className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
            ({initiativeCount})
          </div>
        </div>
        
        {/* Region indicator - subtle */}
        <div className="absolute top-2 right-2 text-xs text-gray-400 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {region}
        </div>
      </div>
    </div>
  );
};