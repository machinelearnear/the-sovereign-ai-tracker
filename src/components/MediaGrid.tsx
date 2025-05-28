import { useState, useEffect, useMemo } from 'react';
import { MediaItem, mediaData } from '../mediaData';
import { Play, Mic, BookOpen, FileText, Calendar, FileBarChart2, Newspaper } from 'lucide-react';

// Format date from YYYY-MM-DD to more readable format
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

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

  return (
    <a 
      href={item.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all transform hover:scale-[1.02] bg-white dark:bg-gray-900"
    >
      {/* Thumbnail with gradient overlay */}
      <div className="relative aspect-video">
        <img 
          src={item.thumbnailUrl} 
          alt={item.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
        
        {/* Type indicator */}
        <div className="absolute bottom-2 right-2 bg-black/60 text-white rounded-full p-1.5">
          {typeIcons[item.type]}
        </div>
        
        {/* Date */}
        <div className="absolute bottom-2 left-2 text-xs text-white">
          {formatDate(item.date)}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-3">
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
          {item.type}
        </div>
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
  const [visibleCount, setVisibleCount] = useState(6); // Initial number of visible items
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
        {visibleItems.map(item => (
          <MediaCard key={item.id} item={item} />
        ))}
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
