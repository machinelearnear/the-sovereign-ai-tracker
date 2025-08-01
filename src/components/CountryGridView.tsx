import { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { CountryCard } from './CountryCard';
import { Initiative } from '../data';
import { 
  aggregateInitiativesByCountry, 
  filterCountries, 
  RegionData, 
  CountryData 
} from '../utils/countryAggregator';

interface CountryGridViewProps {
  initiatives: Initiative[];
  searchTerm: string;
  selectedRegion: string;
  selectedModelType: string;
  onCountryClick: (country: string) => void;
}

// Region Section Component for countries
interface RegionSectionProps {
  region: string;
  countries: CountryData[];
  isExpanded: boolean;
  onToggle: () => void;
  onCountryClick: (country: string) => void;
  totalInitiatives: number;
}

const RegionSection = ({ 
  region, 
  countries, 
  isExpanded, 
  onToggle,
  onCountryClick,
  totalInitiatives
}: RegionSectionProps) => (
  <div className="col-span-full" data-region={region}>
    <div className="flex items-center gap-4 my-10 relative z-10">
      <div className="flex items-center gap-2 cursor-pointer" onClick={onToggle}>
        <ChevronDown 
          size={24} 
          className={`transition-transform duration-300 ${isExpanded ? '' : '-rotate-90'} text-gray-500 dark:text-gray-400`} 
        />
        <h2 className="text-3xl font-medium text-gray-700 dark:text-gray-300 transition-colors font-sans">
          {region}
          <span className="text-lg text-gray-500 dark:text-gray-400 ml-2">
            ({countries.length} {countries.length === 1 ? 'country' : 'countries'}, {totalInitiatives} {totalInitiatives === 1 ? 'initiative' : 'initiatives'})
          </span>
        </h2>
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-gray-400 dark:from-gray-800 to-transparent transition-colors" />
    </div>
    <div 
      className={`transition-all duration-500 origin-top ${
        isExpanded ? 'max-h-[5000px] opacity-100 transform-none overflow-visible' : 'max-h-0 opacity-0 overflow-hidden'
      }`}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-3 mb-8 pt-2 px-1">
        {countries.map((country) => (
          <CountryCard
            key={country.country}
            country={country.country}
            initiativeCount={country.initiativeCount}
            region={country.region}
            onClick={onCountryClick}
          />
        ))}
      </div>
    </div>
  </div>
);

export const CountryGridView = ({
  initiatives,
  searchTerm,
  selectedRegion,
  selectedModelType,
  onCountryClick
}: CountryGridViewProps) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [allExpanded, setAllExpanded] = useState(true);

  // Aggregate initiatives by country and region
  const regionData = useMemo(() => {
    return aggregateInitiativesByCountry(initiatives);
  }, [initiatives]);

  // Apply filters
  const filteredRegionData = useMemo(() => {
    return filterCountries(regionData, searchTerm, selectedRegion, selectedModelType);
  }, [regionData, searchTerm, selectedRegion, selectedModelType]);

  // Helper function to generate unique section keys
  const getSectionKey = (region: string) => region;
  
  // Toggle function to expand/collapse a section
  const toggleSection = (region: string) => {
    const sectionKey = getSectionKey(region);
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };
  
  // Toggle all sections (expand/collapse)
  const toggleAllSections = () => {
    const newExpandState = !allExpanded;
    setAllExpanded(newExpandState);
    
    const updatedState: Record<string, boolean> = {};
    filteredRegionData.forEach(region => {
      const sectionKey = getSectionKey(region.region);
      updatedState[sectionKey] = newExpandState;
    });
    
    setExpandedSections(updatedState);
  };

  return (
    <div className="relative">
      {/* Render regions with countries */}
      {filteredRegionData.map((region) => {
        const sectionKey = getSectionKey(region.region);
        // If the key doesn't exist in state yet, default to the global expanded state
        const isExpanded = expandedSections[sectionKey] === undefined ? 
          allExpanded : expandedSections[sectionKey];
        
        return (
          <RegionSection 
            key={sectionKey}
            region={region.region}
            countries={region.countries}
            isExpanded={isExpanded}
            onToggle={() => toggleSection(region.region)}
            onCountryClick={onCountryClick}
            totalInitiatives={region.totalInitiatives}
          />
        );
      })}

      {/* No results message */}
      {filteredRegionData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No countries match your search criteria.</p>
        </div>
      )}
    </div>
  );
};