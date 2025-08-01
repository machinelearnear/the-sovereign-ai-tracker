import { Search, ChevronDown } from 'lucide-react';

interface FilterControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  regions: string[];
  regionCounts: Record<string, number>;
  totalInitiatives: number;
  view?: 'grid' | 'detail';
  selectedCountry?: string;
  allExpanded?: boolean;
  toggleAllSections?: () => void;
}

export const FilterControls = ({
  searchTerm,
  setSearchTerm,
  selectedRegion,
  setSelectedRegion,
  regions,
  regionCounts,
  totalInitiatives,
  view = 'grid',
  selectedCountry,
  allExpanded,
  toggleAllSections
}: FilterControlsProps) => {
  return (
    <div className="sticky top-20 z-20 bg-white/90 dark:bg-black/30 backdrop-blur-sm py-3 mb-8 px-4 rounded-2xl transition-colors border border-gray-200/50 dark:border-gray-800/50 shadow-sm">
      <div className="flex flex-wrap gap-4 items-center">
        {/* Search input - only show in grid view */}
        {view === 'grid' && (
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-4 top-3.5 text-gray-500 dark:text-gray-400 pointer-events-none" size={18} />
            <input
              type="text"
              name="search"
              placeholder="Search countries, initiatives, or organizations..."
              className="w-full pl-11 pr-4 py-3 bg-gray-200/80 dark:bg-gray-900/50 backdrop-blur-sm 
                         border border-gray-300 dark:border-gray-800/50 rounded-xl 
                         focus:outline-none focus:border-gray-400 dark:focus:border-gray-700 
                         focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-700 
                         text-gray-900 dark:text-gray-200 placeholder-gray-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}

        {/* Country indicator in detail view */}
        {view === 'detail' && selectedCountry && (
          <div className="flex items-center px-4 py-3 bg-gray-200/80 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-300 dark:border-gray-800/50 rounded-xl text-gray-700 dark:text-gray-300 flex-1">
            <span className="text-sm font-medium">Viewing: {selectedCountry}</span>
          </div>
        )}
        
        {/* Region filter - only show in grid view */}
        {view === 'grid' && (
          <select
            name="region"
            className="px-4 py-3 bg-gray-200/80 dark:bg-gray-900/50 backdrop-blur-sm 
                       border border-gray-300 dark:border-gray-800/50 rounded-xl
                       focus:outline-none focus:border-gray-400 dark:focus:border-gray-700 
                       focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-700
                       text-gray-900 dark:text-gray-200 appearance-none cursor-pointer min-w-[180px] transition-all"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            {regions.map(region => (
              <option key={region} value={region}>
                {region} {region === 'All' 
                  ? `(${totalInitiatives})` 
                  : `(${regionCounts[region] || 0})`}
              </option>
            ))}
          </select>
        )}

        {/* Expand/Collapse All button - only show in grid view */}
        {view === 'grid' && toggleAllSections && (
          <button 
            onClick={toggleAllSections}
            className="flex items-center gap-1 px-4 py-3 bg-gray-200/80 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-300 dark:border-gray-800/50 rounded-xl text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-700 transition-colors flex-none"
          >
            <ChevronDown size={16} className={`transition-transform ${allExpanded ? '' : '-rotate-90'} mr-1`} />
            {allExpanded ? 'Collapse All' : 'Expand All'}
          </button>
        )}
      </div>
    </div>
  );
};