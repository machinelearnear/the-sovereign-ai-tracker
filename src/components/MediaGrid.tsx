import { useState, useEffect, useMemo } from 'react';
import { MediaItem, mediaData } from '../mediaData';
import { Play, BookOpen, FileText, FileBarChart2, Newspaper } from 'lucide-react';

// Media Type Filter Component
const MediaTypeFilter = ({ selectedType, setSelectedType }: { 
  selectedType: string; 
  setSelectedType: (type: string) => void;
}) => {
  const types = ["all", "YouTube", "News", "Research", "Report", "Other"];
  
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {types.map(type => (
        <button
          key={type}
          onClick={() => setSelectedType(type)}
          className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
            selectedType === type 
              ? 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm border border-gray-300/50 dark:border-gray-700/50' 
              : 'bg-gray-200/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400'
          }`}
        >
          {type === 'all' ? 'All Types' : type}
        </button>
      ))}
    </div>
  );
};

// Get country from media item
const getMediaItemCountry = (item: MediaItem): string => {
  // Map items to countries based on content analysis
  const countryMap: Record<string, string> = {
    // Research papers and articles about specific models
    "Meltemi": "Greece",
    "Greek": "Greece",
    "SEA-LION": "Singapore",
    "ASEAN": "Singapore",
    "Southeast Asian": "Singapore",
    "AI4Bharat": "India",
    "Indian languages": "India",
    "India": "India",
    "Canadian": "Canada",
    "Canada": "Canada",
    "GPT-NL": "Netherlands",
    "Netherlands": "Netherlands",
    "Dutch": "Netherlands",
    "KriKri": "Greece",
    "Falcon": "UAE",
    "Mistral": "France",
    "France": "France",
    "French": "France",
    "Bagualu": "Brazil",
    "Brazil": "Brazil",
    "Brazilian": "Brazil",
    "ALIA": "Spain",
    "Spain": "Spain",
    "Spanish": "Spain",
    "EuroLLM": "Portugal",
    "Portugal": "Portugal"
  };
  
  // Look for keywords in the title to determine country
  for (const [keyword, country] of Object.entries(countryMap)) {
    if (
      item.title.includes(keyword) || 
      (item.creator && item.creator.includes(keyword))
    ) {
      return country;
    }
  }
  
  // If no specific country is found, return a default
  return "Global";
};

// Get category-specific background colors
const getCategoryBackground = (type: string): string => {
  const backgroundColors: Record<string, string> = {
    News: 'bg-gradient-to-br from-blue-500/90 to-blue-700/90 dark:from-blue-600/90 dark:to-blue-900/90',
    Research: 'bg-gradient-to-br from-amber-500/90 to-amber-700/90 dark:from-amber-600/90 dark:to-amber-900/90',
    Report: 'bg-gradient-to-br from-emerald-500/90 to-emerald-700/90 dark:from-emerald-600/90 dark:to-emerald-900/90',
    Other: 'bg-gradient-to-br from-purple-500/90 to-purple-700/90 dark:from-purple-600/90 dark:to-purple-900/90'
  };
  
  return backgroundColors[type] || 'bg-gradient-to-br from-gray-500/90 to-gray-700/90 dark:from-gray-600/90 dark:to-gray-900/90';
};

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
    'Canada': '🇨🇦',
    'Global': '🌎'
  };
  return flagMap[country] || '🌎';
};

// Media Card Component
const MediaCard = ({ item }: { item: MediaItem }) => {
  // Type-specific icon mapping
  const typeIcons: Record<string, JSX.Element> = {
    YouTube: <Play size={16} className="text-white" />,
    News: <Newspaper size={16} className="text-white" />,
    Research: <BookOpen size={16} className="text-white" />,
    Report: <FileBarChart2 size={16} className="text-white" />,
    Other: <FileText size={16} className="text-white" />
  };

  // Get the country for this media item
  const country = getMediaItemCountry(item);
  
  return (
    <a 
      href={item.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all bg-white dark:bg-gray-900 border border-transparent hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
    >
      {/* Thumbnail with gradient overlay */}
      <div className="relative aspect-video">
        {item.type === "YouTube" && item.thumbnailUrl ? (
          <img 
            src={item.thumbnailUrl} 
            alt={item.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className={`w-full h-full ${getCategoryBackground(item.type)}`}></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
        
        {/* Type indicator */}
        <div className="absolute bottom-2 right-2 bg-black/60 text-white rounded-full p-1.5">
          {typeIcons[item.type]}
        </div>
        
        {/* Country flag indicator */}
        <div className="absolute bottom-2 right-11 bg-black/60 text-white rounded-full flex items-center justify-center w-7 h-7">
          <span>{getCountryFlagEmoji(country)}</span>
        </div>
        
        {/* Type tag instead of date */}
        <div className="absolute bottom-2 left-2 px-2 py-0.5 text-xs bg-black/60 text-white rounded-full">
          {item.type}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-3">
          <h3 className="font-medium text-gray-800 dark:text-white line-clamp-2 mb-1 text-base">
            {item.title}
          </h3>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {item.creator}
        </div>
      </div>
    </a>
  );
};

// Media Grid Component
const MediaGrid = () => {
  const [items, setItems] = useState<MediaItem[]>(mediaData);
  const [visibleCount] = useState(6); // Initial number of visible items
  const [showAll, setShowAll] = useState(false);
  const [selectedType, setSelectedType] = useState("all");
  
  // Sort by date (newest first)
  useEffect(() => {
    const sortedItems = [...mediaData].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    setItems(sortedItems);
  }, []);
  
  // Filter by selected type
  const filteredItems = useMemo(() => {
    if (selectedType === "all") return items;
    return items.filter(item => item.type === selectedType);
  }, [items, selectedType]);
  
  // Calculate visible items
  const visibleItems = showAll 
    ? filteredItems 
    : filteredItems.slice(0, visibleCount);
    
  // Toggle show all
  const toggleShowAll = () => setShowAll(!showAll);
  
  // Update YouTube thumbnails
  useEffect(() => {
    const fetchYouTubeThumbnails = async () => {
      const updatedItems = mediaData.map((item) => {
        if (item.type === "YouTube" && item.youtubeId && !item.thumbnailUrl) {
          // Use the YouTube image API to get the max resolution thumbnail
          return { 
            ...item, 
            thumbnailUrl: `https://img.youtube.com/vi/${item.youtubeId}/maxresdefault.jpg`
          };
        }
        return item;
      });
      setItems(updatedItems);
    };
    
    fetchYouTubeThumbnails();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6">
      <MediaTypeFilter selectedType={selectedType} setSelectedType={setSelectedType} />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleItems.length > 0 ? (
          visibleItems.map(item => (
            <MediaCard key={item.id} item={item} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No items found</p>
          </div>
        )}
      </div>
      
      {filteredItems.length > visibleCount && !showAll && (
        <div className="text-center mt-8">
          <button 
            onClick={toggleShowAll}
            className="px-6 py-3 bg-gray-200/80 dark:bg-gray-800/80 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            View more ({filteredItems.length - visibleCount})
          </button>
        </div>
      )}
      
      {showAll && filteredItems.length > visibleCount && (
        <div className="text-center mt-8">
          <button 
            onClick={toggleShowAll}
            className="px-6 py-3 bg-gray-200/80 dark:bg-gray-800/80 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            Show less
          </button>
        </div>
      )}
    </div>
  );
};

export default MediaGrid;
