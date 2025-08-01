import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Github } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { FilterControls } from './FilterControls';
import { CountryGridView } from './CountryGridView';
import { CountryDetailView } from './CountryDetailView';
import MediaGrid from './MediaGrid';
import { initiativesData } from '../data';
import { 
  aggregateInitiativesByCountry, 
  getUniqueRegions, 
  getCountryByName
} from '../utils/countryAggregator';

type ViewMode = 'grid' | 'detail';

export const SovereignAICountryView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const [allExpanded, setAllExpanded] = useState(true);

  // Aggregate data by country and region
  const regionData = useMemo(() => {
    return aggregateInitiativesByCountry(initiativesData);
  }, []);

  // Get unique regions and model types for filters
  const regions = useMemo(() => {
    return ['All', ...getUniqueRegions(regionData)];
  }, [regionData]);

  // Calculate counts for filter labels
  const regionCounts = useMemo(() => {
    return regionData.reduce((acc, region) => {
      acc[region.region] = region.totalInitiatives;
      return acc;
    }, {} as Record<string, number>);
  }, [regionData]);

  // Toggle all sections (expand/collapse)
  const toggleAllSections = () => {
    setAllExpanded(!allExpanded);
  };

  // Handle country selection
  const handleCountryClick = (country: string) => {
    setSelectedCountry(country);
    setViewMode('detail');
  };

  // Handle back to grid
  const handleBackToGrid = () => {
    setSelectedCountry(null);
    setViewMode('grid');
  };

  // Get selected country data
  const selectedCountryData = useMemo(() => {
    if (!selectedCountry) return null;
    return getCountryByName(regionData, selectedCountry);
  }, [regionData, selectedCountry]);

  return (
    <div className="min-h-screen bg-gradient-to-b dark:from-black dark:via-gray-950 dark:to-black from-white to-white text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-gray-900 dark:via-gray-950 dark:to-black transition-colors duration-300" />
      
      {/* Navigation and Theme Toggle */}
      <div className="flex justify-between items-center absolute top-4 left-0 right-0 px-6 z-30">
        <div className="flex space-x-2 items-center">
          <Link 
            to="/about"
            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors px-3 py-1.5 rounded-lg text-sm"
          >
            About
          </Link>
          <span className="text-gray-400">|</span>
          <Link 
            to="/contribute"
            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors px-3 py-1.5 rounded-lg text-sm"
          >
            How to Contribute
          </Link>
        </div>
        <ThemeToggle />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-12 pt-20 overflow-visible">
        <header className="text-center mb-12">
          <Link to="/" className="block mb-2">
            <h1 className="font-geist text-7xl font-normal text-black dark:text-white tracking-tight hover:opacity-80 transition-opacity cursor-pointer">
              The Sovereign AI Tracker
            </h1>
          </Link>
          <p className="text-xl text-gray-400 tracking-wide mb-6 font-geist">
            An open-source repository of small and large scale AI programs around the world
          </p>
        </header>

        {/* Filters */}
        <FilterControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          regions={regions}
          regionCounts={regionCounts}
          totalInitiatives={initiativesData.length}
          view={viewMode}
          selectedCountry={selectedCountry || undefined}
          allExpanded={allExpanded}
          toggleAllSections={toggleAllSections}
        />

        {/* Main Content */}
        <div className="relative mt-4">
          {viewMode === 'grid' ? (
            <CountryGridView
              initiatives={initiativesData}
              searchTerm={searchTerm}
              selectedRegion={selectedRegion}
              selectedModelType="All"
              onCountryClick={handleCountryClick}
            />
          ) : (
            selectedCountryData && (
              <CountryDetailView
                countryData={selectedCountryData}
                onBack={handleBackToGrid}
              />
            )
          )}
        </div>

        {/* Media Section - only show in grid view */}
        {viewMode === 'grid' && (
          <div className="mt-20 border-t border-gray-300/50 dark:border-gray-800/50 pt-16 mb-16">
            <h2 className="text-3xl font-medium mb-8 text-gray-700 dark:text-gray-300 transition-colors font-geist">
              Also Featured
            </h2>
            <MediaGrid />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-300/50 dark:border-gray-800/50 py-4 px-6 flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">Built with ❤️ & 🧉 between London and Madrid.</p>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/machinelearnear/the-sovereign-ai-tracker"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white dark:bg-transparent rounded-full hover:text-gray-900 dark:hover:text-white text-gray-700 dark:text-white transition-colors"
            aria-label="GitHub repository"
            title="GitHub repository"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/nicolas-metallo/"
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 bg-white dark:bg-transparent rounded-full hover:text-gray-900 dark:hover:text-white text-gray-700 dark:text-white transition-colors"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="https://x.com/nicolasmetallo"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white dark:bg-transparent rounded-full hover:text-gray-900 dark:hover:text-white text-gray-700 dark:text-white transition-colors"
            aria-label="Twitter/X"
            title="Twitter/X"
          >
            <Twitter size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};