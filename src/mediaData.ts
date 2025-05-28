// Media Gallery - Data File
// A collection of videos, podcasts, articles, and other media related to Sovereign AI

export type MediaItem = {
    id: string;                 // Unique identifier
    title: string;              // Title of the video/article/podcast
    type: "YouTube" | "News" | "Research" | "Report" | "Other";  // Type of media
    date: string;               // Publication date (YYYY-MM-DD)
    thumbnailUrl?: string;      // URL to thumbnail image (will be auto-fetched for YouTube)
    sourceUrl: string;          // Link to the original content
    creator: string;            // Author or channel name
    sourceProvider: string;     // Platform (YouTube, RAND, etc.)
    description?: string;       // Brief description (optional)
    tags?: string[];            // For filtering/categorization
    youtubeId?: string;         // For YouTube videos to fetch thumbnails
}

// Real content based on the provided links
export const mediaData: MediaItem[] = [
    {
        id: "youtube-1",
        title: "The Geopolitics of AI: Balancing Competition & Cooperation for a Brighter Future",
        type: "YouTube",
        date: "2023-08-09", // Publication date from YouTube
        youtubeId: "Vw0XjhfAWis", 
        sourceUrl: "https://www.youtube.com/watch?v=Vw0XjhfAWis",
        creator: "a16z",
        sourceProvider: "YouTube",
        tags: ["geopolitics", "AI", "policy"]
    },
    {
        id: "report-1",
        title: "The Department of Defense Posture for Artificial Intelligence: Assessment and Recommendations",
        type: "Report",
        date: "2023-09-20", // Publication date from RAND
        thumbnailUrl: "https://www.rand.org/content/dam/rand/pubs/perspectives/PEA3700/PEA3776-1/images/pea-3776-1-cover-image.jpg",
        sourceUrl: "https://www.rand.org/pubs/perspectives/PEA3776-1.html",
        creator: "Danielle C. Tarraf, Yuna Huh Wong, et al.",
        sourceProvider: "RAND Corporation",
        tags: ["defense", "strategy", "military"]
    }
];
