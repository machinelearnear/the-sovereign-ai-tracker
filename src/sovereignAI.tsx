import { useState } from 'react';
import { Search, Globe, FileText, Github, ChevronDown, Linkedin, Twitter } from 'lucide-react';
import { ThemeToggle } from './components/ThemeToggle';
import MediaGrid from './components/MediaGrid';
import { Initiative, initiativesData } from './data';
import { Link } from 'react-router-dom';

// Get flag emoji for a country
const getCountryFlagEmoji = (country: string): string => {
  const flagMap: Record<string, string> = {
    'Spain': '🇪🇸',
    'Portugal': '🇵🇹',
    'Netherlands': '🇳🇱',
    'Greece': '🇬🇷',
    'UAE': '🇦🇪',
    'France': '🇫🇷',
    'Brazil': '🇧🇷',
    'Singapore': '🇸🇬',
    'India': '🇮🇳',
    'Canada': '🇨🇦'
  };
  return flagMap[country] || '🏳️';
};


// Clean country name from initiative title
const removeCountryFromTitle = (name: string, country: string): string => {
  // Remove country name from the beginning of the title (e.g. "Canadian AI Strategy" -> "AI Strategy")
  const regex = new RegExp(`^${country}\\s+`, 'i');
  let cleanedName = name.replace(regex, '');
  
  // Remove country name from the end of the title (e.g. "AI Strategy of France" -> "AI Strategy")
  const endRegex = new RegExp(`\\s+of\\s+${country}$`, 'i');
  cleanedName = cleanedName.replace(endRegex, '');
  
  // Remove country adjective forms (this is a simplified approach)
  const adjectiveMap: Record<string, string[]> = {
    'France': ['French'],
    'Canada': ['Canadian'],
    'Netherlands': ['Dutch'],
    'Greece': ['Greek', 'Hellenic'],
    'UAE': ['Emirati'],
    'Brazil': ['Brazilian'],
    'Singapore': ['Singaporean'],
    'India': ['Indian']
    // Add more as needed
  };
  
  if (adjectiveMap[country]) {
    for (const adjective of adjectiveMap[country]) {
      const adjRegex = new RegExp(`^${adjective}\\s+`, 'i');
      cleanedName = cleanedName.replace(adjRegex, '');
    }
  }
  
  return cleanedName;
};

// Funding source tag component
const FundingSourceTag = ({ organization }: { organization: string }) => {
  // Determine if government-funded or commercial based on organization name
  const isGovernmentFunded = 
    organization.toLowerCase().includes('government') || 
    organization.toLowerCase().includes('university') || 
    organization.toLowerCase().includes('research') || 
    organization.toLowerCase().includes('iit') || 
    organization.toLowerCase().includes('innovation, science and economic') ||
    organization.toLowerCase().includes('tno') ||
    organization.toLowerCase().includes('fapesp');
  
  const fundingSource = isGovernmentFunded ? 'Government-funded' : 'Commercial';
  
  const colorMap: Record<string, string> = {
    'Government-funded': 'bg-blue-100 dark:bg-blue-900/70 text-blue-700 dark:text-blue-200 border border-blue-300 dark:border-blue-800',
    'Commercial': 'bg-purple-100 dark:bg-purple-900/70 text-purple-700 dark:text-purple-200 border border-purple-300 dark:border-purple-800'
  };

  return (
    <span className={`px-2 py-0.5 text-xs font-medium rounded ${colorMap[fundingSource]}`}>
      {fundingSource}
    </span>
  );
};

// Model Type tag component with styling similar to funding source tag
const ModelTypeTag = ({ modelType }: { modelType: string }) => {
  // Color mapping for different model types
  const colorMap: Record<string, string> = {
    'LLM': 'bg-purple-100 dark:bg-purple-900/70 text-purple-700 dark:text-purple-200 border border-purple-300 dark:border-purple-800',
    'Infrastructure': 'bg-blue-100 dark:bg-blue-900/70 text-blue-700 dark:text-blue-200 border border-blue-300 dark:border-blue-800',
    'Research': 'bg-amber-100 dark:bg-amber-900/70 text-amber-700 dark:text-amber-200 border border-amber-300 dark:border-amber-800',
    'Dataset': 'bg-emerald-100 dark:bg-emerald-900/70 text-emerald-700 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800'
  };

  // Default color for unspecified model types
  const tagClass = colorMap[modelType] || 'bg-gray-100 dark:bg-gray-900/70 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-800';

  return (
    <span className={`px-2 py-0.5 text-xs font-medium rounded ${tagClass}`}>
      {modelType}
    </span>
  );
};

// Initiative Card Component
const InitiativeCard = ({ initiative }: { initiative: Initiative }) => {
  // Use flag emojis for all countries
  const flagEmoji = getCountryFlagEmoji(initiative.country);
  
  // Ensure ALIA initiatives use the same organization format
  const displayOrganization = initiative.name.includes("ALIA") && initiative.country === "Spain"
    ? "Government of Spain, Barcelona Supercomputing Center"
    : initiative.organization;
  
  return (
    <div className="group relative h-full flex flex-col initiative-card transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 via-blue-900/20 to-gray-900/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative flex-1 flex flex-col bg-white/90 dark:bg-gray-950 rounded-lg p-4 border border-gray-300/50 dark:border-gray-800/50 backdrop-blur-xl transition-all duration-300 group-hover:border-gray-400 dark:group-hover:border-gray-700 group-hover:bg-gray-50 dark:group-hover:bg-gray-900">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          {/* Left side */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{flagEmoji}</span>
              <h3 className="text-lg font-medium tracking-tight text-gray-800 dark:text-white initiative-name font-geist">
                {removeCountryFromTitle(initiative.name, initiative.country)}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <ModelTypeTag modelType={initiative.modelType} />
              <FundingSourceTag organization={displayOrganization} />
            </div>
          </div>
          
          {/* Right side */}
          <div className="flex flex-col items-end">
            <span className="text-xs uppercase tracking-wider text-gray-500">
              {initiative.region}
            </span>
            <span className="text-sm text-gray-400">
              {initiative.country}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="flex-1 mb-2">
          <p className="text-base leading-relaxed mb-3 line-clamp-6 group-hover:line-clamp-none text-gray-700 dark:text-gray-300 transition-colors">
            {initiative.description}
          </p>
        </div>

        {/* Organization */}
        <div className="text-base text-gray-400 mb-3">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <span className="text-gray-500">Organization:</span> {displayOrganization}
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex-none mt-auto border-t pt-3 border-gray-300/50 dark:border-gray-800/50">
          <div className="flex justify-between items-center">
            {/* Links */}
            <div className="flex gap-2 items-center">
              {initiative.links.website && (
                <a 
                  href={initiative.links.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center"
                  title="Website"
                >
                  <Globe size={18} />
                </a>
              )}
              {initiative.links.github && !initiative.links.github.includes('huggingface') && (
                <a 
                  href={initiative.links.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center"
                  title="GitHub"
                >
                  <Github size={18} />
                </a>
              )}
              {/* HuggingFace links */}
              {initiative.links.github && initiative.links.github.includes('huggingface') && (
                <a 
                  href={initiative.links.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center"
                  title="HuggingFace"
                >
                  <span className="text-base">🤗</span>
                </a>
              )}
              {initiative.links.paper && (
                <a 
                  href={initiative.links.paper} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                  title="Research Paper"
                >
                  <FileText size={16} />
                </a>
              )}
            </div>

            {/* No status indicator here */}
          </div>
        </div>
      </div>
    </div>
  );
};

// Region Section Component
interface RegionSectionProps {
  region: string;
  subregion: string;
  initiatives: Initiative[];
  isExpanded: boolean;
  onToggle: () => void;
  initiativeCount: number;
}

const RegionSection = ({ 
  region, 
  subregion, 
  initiatives, 
  isExpanded, 
  onToggle,
  initiativeCount
}: RegionSectionProps) => (
  <div className="col-span-full" data-region={region} data-subregion={subregion}>
    <div className="flex items-center gap-4 my-10">
      <div className="flex items-center gap-2 cursor-pointer" onClick={onToggle}>
        <ChevronDown 
          size={24} 
          className={`transition-transform duration-300 ${isExpanded ? '' : '-rotate-90'} text-gray-500 dark:text-gray-400`} 
        />
        <h2 className="text-3xl font-medium text-gray-700 dark:text-gray-300 transition-colors font-geist">
          {region}: {subregion} 
          <span className="text-lg text-gray-500 dark:text-gray-400 ml-2">({initiativeCount})</span>
        </h2>
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-gray-400 dark:from-gray-800 to-transparent transition-colors" />
    </div>
    <div 
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-500 origin-top overflow-hidden ${
        isExpanded ? 'max-h-[5000px] opacity-100 transform-none' : 'max-h-0 opacity-0'
      }`}
    >
      {initiatives.map((initiative, index) => (
        <InitiativeCard key={index} initiative={initiative} />
      ))}
    </div>
  </div>
);

// Main Component
const SovereignAIList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedModelType, setSelectedModelType] = useState('All');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [allExpanded, setAllExpanded] = useState(true);
  
  // Helper function to generate unique section keys
  const getSectionKey = (region: string, subregion: string) => `${region}-${subregion}`;
  
  // Toggle function to expand/collapse a section
  const toggleSection = (region: string, subregion: string) => {
    const sectionKey = getSectionKey(region, subregion);
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
    Object.entries(groupedInitiatives).forEach(([region, subregions]) => {
      Object.keys(subregions).forEach(subregion => {
        const sectionKey = getSectionKey(region, subregion);
        updatedState[sectionKey] = newExpandState;
      });
    });
    
    setExpandedSections(updatedState);
  };
  
  // Get unique regions with counts
  const regionCounts = initiativesData.reduce((acc, initiative) => {
    acc[initiative.region] = (acc[initiative.region] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const regions = ['All', ...new Set(initiativesData.map(initiative => initiative.region))];
  
  // Get unique model types with counts
  const modelTypeCounts = initiativesData.reduce((acc, initiative) => {
    acc[initiative.modelType] = (acc[initiative.modelType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const modelTypes = ['All', ...new Set(initiativesData.map(initiative => initiative.modelType))];
  
  // Filter initiatives based on search term, region, and model type
  const filteredInitiatives = initiativesData.filter(initiative => {
    const matchesSearch = 
      initiative.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      initiative.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      initiative.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      initiative.country.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = selectedRegion === 'All' || initiative.region === selectedRegion;
    const matchesModelType = selectedModelType === 'All' || initiative.modelType === selectedModelType;
    
    return matchesSearch && matchesRegion && matchesModelType;
  });

  // Group initiatives by region and subregion
  const groupedInitiatives = filteredInitiatives.reduce<Record<string, Record<string, Initiative[]>>>((acc, initiative) => {
    const { region, subregion } = initiative;
    
    if (!acc[region]) {
      acc[region] = {};
    }
    
    if (!acc[region][subregion]) {
      acc[region][subregion] = [];
    }
    
    acc[region][subregion].push(initiative);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-b dark:from-black dark:via-gray-950 dark:to-black from-white to-white text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-gray-900 dark:via-gray-950 dark:to-black transition-colors duration-300" />
      
      {/* Navigation and Theme Toggle */}
      <div className="flex justify-between items-center absolute top-4 left-0 right-0 px-6 z-10">
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
      
      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <header className="text-center mb-16">
          <Link to="/" className="block mb-2">
            <h1 className="font-[family-name:var(--font-afacad)] text-7xl font-normal text-black dark:text-white tracking-tight hover:opacity-80 transition-opacity cursor-pointer">
              The Sovereign AI Tracker
            </h1>
          </Link>
          <p className="text-xl text-gray-400 tracking-wide mb-6 font-geist">
            An open-source repository of small and large scale AI programs around the world
          </p>
        </header>

        {/* Filters */}
        <div className="sticky top-0 z-20 bg-white/80 dark:bg-black/20 backdrop-blur-sm py-2 mb-8 px-2 rounded-2xl transition-colors">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Search input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 text-gray-500 dark:text-gray-400 pointer-events-none" size={18} />
              <input
                type="text"
                name="search"
                placeholder="Search initiatives, organizations, or countries..."
                className="w-full pl-11 pr-4 py-3 bg-gray-200/80 dark:bg-gray-900/50 backdrop-blur-sm 
                           border border-gray-300 dark:border-gray-800/50 rounded-xl 
                           focus:outline-none focus:border-gray-400 dark:focus:border-gray-700 
                           focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-700 
                           text-gray-900 dark:text-gray-200 placeholder-gray-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Region filter */}
            <select
              name="region"
              className="px-4 py-3 bg-gray-200/80 dark:bg-gray-900/50 backdrop-blur-sm 
                         border border-gray-300 dark:border-gray-800/50 rounded-xl
                         focus:outline-none focus:border-gray-400 dark:focus:border-gray-700 
                         focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-700
                         text-gray-900 dark:text-gray-200 appearance-none cursor-pointer min-w-[160px] transition-all"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              {regions.map(region => (
                <option key={region} value={region}>
                  {region} {region === 'All' 
                    ? `(${initiativesData.length})` 
                    : `(${regionCounts[region]})`}
                </option>
              ))}
            </select>

            {/* Model Type filter */}
            <select 
              name="modelType"
              className="px-4 py-3 bg-gray-200/80 dark:bg-gray-900/50 backdrop-blur-sm 
                         border border-gray-300 dark:border-gray-800/50 rounded-xl
                         focus:outline-none focus:border-gray-400 dark:focus:border-gray-700 
                         focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-700
                         text-gray-900 dark:text-gray-200 appearance-none cursor-pointer min-w-[160px] transition-all"
              value={selectedModelType}
              onChange={(e) => setSelectedModelType(e.target.value)}
            >
              {modelTypes.map(type => (
                <option key={type} value={type}>
                  {type} {type === 'All' 
                    ? `(${initiativesData.length})` 
                    : `(${modelTypeCounts[type]})`}
                </option>
              ))}
            </select>

            {/* Expand/Collapse All button */}
            <button 
              onClick={toggleAllSections}
              className="flex items-center gap-1 px-4 py-3 bg-gray-200/80 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-300 dark:border-gray-800/50 rounded-xl text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-700 transition-colors flex-none"
            >
              <ChevronDown size={16} className={`transition-transform ${allExpanded ? '' : '-rotate-90'} mr-1`} />
              {allExpanded ? 'Collapse All' : 'Expand All'}
            </button>
          </div>
        </div>

        {/* Render grouped initiatives */}
        <div className="relative">
          
          {Object.entries(groupedInitiatives).map(([region, subregions]) => (
            <div key={region}>
              {Object.entries(subregions).map(([subregion, initiatives]) => {
                const sectionKey = getSectionKey(region, subregion);
                // If the key doesn't exist in state yet, default to the global expanded state
                const isExpanded = expandedSections[sectionKey] === undefined ? 
                  allExpanded : expandedSections[sectionKey];
                
                return (
                  <RegionSection 
                    key={sectionKey}
                    region={region}
                    subregion={subregion}
                    initiatives={initiatives}
                    isExpanded={isExpanded}
                    onToggle={() => toggleSection(region, subregion)}
                    initiativeCount={initiatives.length}
                  />
                );
              })}
            </div>
          ))}

          {/* No results message */}
          {Object.keys(groupedInitiatives).length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No initiatives match your search criteria.</p>
            </div>
          )}
        </div>

        {/* Media Section */}
        <div className="mt-20 border-t border-gray-300/50 dark:border-gray-800/50 pt-16 mb-16">
          <h2 className="text-3xl font-medium mb-8 text-gray-700 dark:text-gray-300 transition-colors font-geist">
            Also Featured
          </h2>
          <MediaGrid />
        </div>
      </div>

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

export { SovereignAIList };
