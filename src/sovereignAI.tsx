import { useState, useEffect, useMemo } from 'react';
import { Search, ExternalLink, Globe, Code, FileText, Github, Sun, Moon, ChevronDown, Play, Mic, BookOpen, Linkedin, Twitter } from 'lucide-react';
import { useTheme } from './components/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import MediaGrid from './components/MediaGrid';
import { Initiative, initiativesData } from './data';
import { MediaItem, mediaData } from './mediaData';

// Utility function to create a map flag URL
const getFlagUrl = (countryCode: string): string => {
  return `https://flagcdn.com/32x24/${countryCode.toLowerCase()}.png`;
};

// Get country code from country name (simplified implementation)
const getCountryCode = (country: string): string => {
  const countryCodes: Record<string, string> = {
    'Netherlands': 'nl',
    'Greece': 'gr',
    'UAE': 'ae',
    'France': 'fr',
    'Brazil': 'br',
    'Singapore': 'sg',
    'India': 'in',
    'Canada': 'ca'
    // To be expanded with more countries
  };
  return countryCodes[country] || 'un'; // Default to UN flag if country not found
};

// Date formatting utility
const formatDate = (dateString: string): string => {
  const [year, month] = dateString.split('-');
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const monthIndex = parseInt(month) - 1;
  return `${monthNames[monthIndex]} ${year}`;
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

// Sector badge component (replacing the status badge)
const SectorBadge = ({ organization }: { organization: string }) => {
  // Determine if government-funded or commercial based on organization name
  const isGovernmentFunded = 
    organization.toLowerCase().includes('government') || 
    organization.toLowerCase().includes('university') || 
    organization.toLowerCase().includes('research') || 
    organization.toLowerCase().includes('iit') || 
    organization.toLowerCase().includes('innovation, science and economic') ||
    organization.toLowerCase().includes('tno') ||
    organization.toLowerCase().includes('fapesp');
  
  const sector = isGovernmentFunded ? 'Government-funded' : 'Commercial';
  
  const colorMap: Record<string, string> = {
    'Government-funded': 'bg-blue-900/70 text-blue-200',
    'Commercial': 'bg-purple-900/70 text-purple-200'
  };

  return (
    <span className={`px-2 py-0.5 text-xs font-medium rounded ${colorMap[sector]}`}>
      {sector}
    </span>
  );
};

// Initiative Card Component
const InitiativeCard = ({ initiative }: { initiative: Initiative }) => {
  const countryCode = getCountryCode(initiative.country);
  
  return (
    <div className="group relative h-full flex flex-col initiative-card transform hover:scale-[1.02] transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 via-blue-900/20 to-gray-900/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative flex-1 flex flex-col bg-white/90 dark:bg-gray-950 rounded-lg p-4 border border-gray-300/50 dark:border-gray-800/50 backdrop-blur-xl transition-all duration-300 group-hover:border-gray-400/60 dark:group-hover:border-gray-700/50">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          {/* Left side */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <img 
                src={getFlagUrl(countryCode)} 
                alt={`${initiative.country} flag`} 
                className="w-6 h-4 rounded-sm object-cover shadow-sm"
              />
              <h3 className="text-lg font-medium tracking-tight text-gray-800 dark:text-white initiative-name font-sans">
                {removeCountryFromTitle(initiative.name, initiative.country)}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              {/* Model Type badge with dynamic colors */}
              <span className={`px-2 py-0.5 text-xs font-medium rounded tracking-wide 
                ${initiative.modelType === 'LLM' ? 'bg-purple-900/70 text-purple-200' : 
                  initiative.modelType === 'Infrastructure' ? 'bg-blue-900/70 text-blue-200' : 
                  initiative.modelType === 'Research' ? 'bg-amber-900/70 text-amber-200' : 
                  'bg-emerald-900/70 text-emerald-200'}`}>
                {initiative.modelType}
              </span>
              <SectorBadge organization={initiative.organization} />
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

        {/* Organization and Date */}
        <div className="text-base text-gray-400 mb-3">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-gray-500">Organization:</span> {initiative.organization}
            </div>
            <div>
              {/* Simplified date format without "Date:" prefix */}
              <span>{formatDate(initiative.dateReleased || initiative.dateAnnounced).substring(0, 3)} {(initiative.dateReleased || initiative.dateAnnounced).split('-')[0]}</span>
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

            {/* Active/Inactive Status */}
            <div className={`text-xs px-2 py-0.5 rounded ${['Released', 'In Development', 'Announced'].includes(initiative.status) ? 
              'bg-green-900/30 text-green-400' : 'bg-gray-800/50 text-gray-400'}`}>
              {['Released', 'In Development', 'Announced'].includes(initiative.status) ? 'Active' : 'Inactive'}
            </div>
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
        <h2 className="text-3xl font-medium text-gray-700 dark:text-gray-300 transition-colors font-sans">
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
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [contributeExpanded, setContributeExpanded] = useState(false);
  
  // Toggle functions for collapsible sections
  const toggleAboutSection = () => setAboutExpanded(!aboutExpanded);
  const toggleContributeSection = () => setContributeExpanded(!contributeExpanded);
  
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
      
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <header className="text-center mb-16">
          <a href="/" className="block mb-2">
            <h1 className="font-[family-name:var(--font-afacad)] text-7xl font-normal text-black dark:text-white tracking-tight hover:opacity-80 transition-opacity cursor-pointer">
              The Sovereign AI List
            </h1>
          </a>
          <p className="text-xl text-gray-400 tracking-wide mb-6 font-sans">
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
        <div className="mt-20 border-t border-gray-300/50 dark:border-gray-800/50 pt-16">
          <h2 className="text-3xl font-medium mb-8 text-gray-700 dark:text-gray-300 transition-colors font-sans">
            Also Featured
          </h2>
          <MediaGrid />
        </div>

        {/* Information Section */}
        <div className="mt-20 border-t border-gray-300/50 dark:border-gray-800/50 pt-16 text-center">
          {/* More about the project */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="flex items-center gap-2 cursor-pointer mb-4" onClick={toggleAboutSection}>
              <ChevronDown 
                size={20} 
                className={`transition-transform duration-300 ${aboutExpanded ? '' : '-rotate-90'} text-gray-500 dark:text-gray-400`} 
              />
              <h2 className="text-3xl font-medium bg-gradient-to-r dark:from-white dark:via-gray-100 dark:to-gray-300 from-gray-700 via-gray-800 to-gray-900 text-transparent bg-clip-text font-sans">
                More about the project
              </h2>
            </div>
            <div className={`text-gray-700 dark:text-gray-300 leading-relaxed text-left space-y-4 transition-all duration-500 overflow-hidden ${
              aboutExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <p>
                The Sovereign AI List is your global tracker for a critical technological and geopolitical shift: the rise of national AI initiatives. 
                As AI models become the new "information stack"—shaping culture, education, and national security—reliance on external AI capabilities 
                creates significant vulnerabilities. This repository documents how nations worldwide are building their own "AI factories," aiming to embed 
                their unique languages, values, and strategic interests directly into the foundational AI that will define their digital future.
              </p>
              <p>
                Understanding this trend is vital. It's not just about technological independence; it's about who controls the lens through which 
                information is processed and realities are shaped. Whether you're in tech, policy, research, or simply an informed citizen, this list 
                provides insight into how the world is preparing for an AI-driven era where digital and cultural sovereignty are paramount.
              </p>
            </div>
          </div>

          {/* How to contribute */}
          <div className="max-w-3xl mx-auto mb-16 pt-8 border-t border-gray-300/50 dark:border-gray-800/50">
            <div className="flex items-center gap-2 cursor-pointer mb-4" onClick={toggleContributeSection}>
              <ChevronDown 
                size={20} 
                className={`transition-transform duration-300 ${contributeExpanded ? '' : '-rotate-90'} text-gray-500 dark:text-gray-400`} 
              />
              <h2 className="text-3xl font-medium bg-gradient-to-r dark:from-white dark:via-gray-100 dark:to-gray-300 from-gray-700 via-gray-800 to-gray-900 text-transparent bg-clip-text font-sans">
                How to contribute
              </h2>
            </div>
            <div className={`text-gray-700 dark:text-gray-300 leading-relaxed space-y-4 transition-all duration-500 overflow-hidden ${
              contributeExpanded ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <p className="text-left">
                This project is open-source and welcomes contributions. There are two main ways to contribute:
              </p>
              
              <div className="mt-8">
                <h3 className="text-xl font-medium mb-2 text-left">1. Adding a National AI Initiative</h3>
                <p className="text-left mb-4">To add a new sovereign AI initiative, edit the <code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded text-gray-800 dark:text-gray-200">src/data.ts</code> file and use this template structure:</p>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-left overflow-auto">
                  <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
{`{
  name: "Initiative Name",
  country: "Country",
  region: "Region",          // E.g., "Europe", "Asia"
  subregion: "Subregion",    // E.g., "Western Europe", "South Asia"
  modelType: "Type",         // Choose: "LLM", "Infrastructure", "Research", "Policy"
  organization: "Organization Name",
  description: "Detailed description of the initiative...",
  dateAnnounced: "YYYY-MM", // Use this format
  dateReleased: "YYYY-MM",  // If applicable
  status: "Status",         // E.g., "Released", "In Development", "Announced"
  links: {
    website: "https://...",
    github: "https://...",  // If applicable
    paper: "https://..."    // If applicable
  }
}`}
                  </pre>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-medium mb-2 text-left">2. Adding Media Content</h3>
                <p className="text-left mb-4">To add content to the "Also Featured" section, edit the <code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded text-gray-800 dark:text-gray-200">src/mediaData.ts</code> file using this structure:</p>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-left overflow-auto">
                  <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
{`{
  id: "unique-id",
  type: "Type",             // Choose: "YouTube", "News", "Research", "Report"
  title: "Content Title",
  creator: "Author/Publication/Channel",
  date: "YYYY-MM-DD",
  sourceUrl: "https://...", // Link to original content
  thumbnailUrl: "https://...", // Image URL
  youtubeId: "VIDEO_ID"     // Only for YouTube content
}`}
                  </pre>
                </div>
              </div>
              
              <ol className="list-decimal pl-6 mt-8 text-left">
                <li className="mb-2">
                  Fork the repository on GitHub
                </li>
                <li className="mb-2">
                  Add or modify the data files using the templates above
                </li>
                <li className="mb-2">
                  Submit a pull request with your changes
                </li>
                <li className="mb-2">
                  Include reliable sources for all information
                </li>
              </ol>
            </div>
            
            <a
              href="https://github.com/machinelearnear/the-sovereign-ai-list"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <span>Contribute on GitHub</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300/50 dark:border-gray-800/50 py-4 px-6 flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">Built with ❤️ & 🧉 between London and Madrid.</p>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/machinelearnear/the-sovereign-ai-list"
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
