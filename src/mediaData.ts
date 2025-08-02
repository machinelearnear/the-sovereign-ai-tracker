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
        id: "news-alia",
        title: "ALIA: Europe's First Public, Open, and Multilingual AI Infrastructure",
        type: "News",
        date: "2025-01-21",
        thumbnailUrl: "https://www.bsc.es/sites/default/files/public/styles/large/public/bsc_logo_1.png",
        sourceUrl: "https://www.bsc.es/es/noticias/noticias-del-bsc/alia-la-primera-infraestructura-p%C3%BAblica-abierta-y-multiling%C3%BCe-de-ia-en-europa",
        creator: "Barcelona Supercomputing Center",
        sourceProvider: "BSC",
        description: "Spain launches ALIA, Europe's first public, open, and multilingual AI infrastructure, representing a major milestone in European technological sovereignty.",
        tags: ["Infrastructure", "Spain", "Europe", "Multilingual", "AI Strategy"]
    },
    {
        id: "article-meltemi",
        title: "Meltemi: A Large Language Model for Greek",
        type: "Research",
        date: "2024-03-28",
        thumbnailUrl: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*26m4oi6LLahTkq5eGLqfVA.jpeg",
        sourceUrl: "https://medium.com/institute-for-language-and-speech-processing/meltemi-a-large-language-model-for-greek-9f5ef1d4a10f",
        creator: "Institute for Language and Speech Processing",
        sourceProvider: "Medium",
        description: "Learn about Meltemi, the first open-source Large Language Model specifically for Greek language, showing a 14.9% improvement compared to Mistral-7B on Greek language tasks.",
        tags: ["LLM", "Greek", "Research", "Europe", "Language Model"]
    },
    {
        id: "youtube-1",
        title: "Sovereign AI: A Geopolitical Analysis",
        type: "YouTube",
        date: "2023-08-09",
        youtubeId: "Vw0XjhfAWis", 
        sourceUrl: "https://www.youtube.com/watch?v=Vw0XjhfAWis",
        creator: "Andreessen Horowitz (a16z)",
        sourceProvider: "YouTube",
        tags: ["geopolitics", "AI", "policy"]
    },
    {
        id: "report-1",
        title: "Understanding the Artificial Intelligence Diffusion Framework",
        type: "Report",
        date: "2025-01-14",
        thumbnailUrl: "https://www.rand.org/content/dam/rand/pubs/perspectives/PEA3700/PEA3776-1/images/pea-3776-1-cover-image.jpg",
        sourceUrl: "https://www.rand.org/pubs/perspectives/PEA3776-1.html",
        creator: "Lennart Heim",
        sourceProvider: "RAND Corporation",
        description: "Can Export Controls Create a U.S.-Led Global Artificial Intelligence Ecosystem?",
        tags: ["policy", "export controls", "AI ecosystem"]
    },
    {
        id: "winning-ai-race-part1",
        title: "Winning the AI Race Part 1: Michael Kratsios, Kelly Loeffler, Shyam Sankar, Chris Power",
        type: "YouTube",
        date: "2025-01-23",
        youtubeId: "Nmw43vcSFhw",
        sourceUrl: "https://www.youtube.com/watch?v=Nmw43vcSFhw",
        creator: "All-In Podcast",
        sourceProvider: "YouTube",
        description: "This video kicks off the series with discussions from key figures on the pillars of the 'Winning the AI Race' plan. Michael Kratsios, former U.S. CTO, details the plan's focus on innovation, infrastructure, and fostering a robust AI ecosystem.",
        tags: ["USA", "AI Strategy", "Innovation", "Infrastructure", "Policy"]
    },
    {
        id: "winning-ai-race-part3",
        title: "Winning the AI Race Part 3: Jensen Huang, Lisa Su, James Litinsky, Chase Lochmiller",
        type: "YouTube",
        date: "2025-01-23",
        youtubeId: "8qT2SAJI_HQ",
        sourceUrl: "https://www.youtube.com/watch?v=8qT2SAJI_HQ",
        creator: "All-In Podcast",
        sourceProvider: "YouTube",
        description: "This part gathers leaders from the semiconductor and materials industries. Jensen Huang of Nvidia and Lisa Su of AMD delve into the future of AI chips and the critical need for a strong U.S. talent base.",
        tags: ["USA", "Semiconductors", "AI Chips", "Nvidia", "AMD"]
    },
    {
        id: "winning-ai-race-part4",
        title: "Winning the AI Race Part 4: Scott Bessent, Howard Lutnick, Chris Wright, and Doug Burgum",
        type: "YouTube",
        date: "2025-01-23",
        youtubeId: "9WkGNe27r_Q",
        sourceUrl: "https://www.youtube.com/watch?v=9WkGNe27r_Q",
        creator: "All-In Podcast",
        sourceProvider: "YouTube",
        description: "This segment concentrates on the financial and energy strategies for the AI race. It features Treasury Secretary Scott Bessent and Commerce Secretary Howard Lutnick discussing economic plans and a significant trade deal with Japan.",
        tags: ["USA", "Finance", "Energy", "Trade", "Government"]
    },
    {
        id: "trump-ai-speech-recap",
        title: "Trump AI Speech & Action Plan, DC Summit Recap, Hot GDP Print, Trade Deals, Altman Warns No Privacy",
        type: "YouTube",
        date: "2025-01-01",
        youtubeId: "jp9jDINt1mM",
        sourceUrl: "https://www.youtube.com/watch?v=jp9jDINt1mM",
        creator: "All-In Podcast",
        sourceProvider: "YouTube",
        description: "The hosts review their 'Winning the AI Race' summit held in Washington D.C. and provide an analysis of President Trump's speech. They break down the main elements of his AI action plan, such as deregulation, infrastructure investment, and the promotion of AI exports.",
        tags: ["USA", "Trump", "AI Policy", "Summit", "Analysis"]
    },
    {
        id: "winning-ai-race-part5-trump",
        title: "Winning the AI Race Part 5: President Trump on the AI Action Plan",
        type: "YouTube",
        date: "2025-01-24",
        youtubeId: "HmxbPH1PL_A",
        sourceUrl: "https://www.youtube.com/watch?v=HmxbPH1PL_A",
        creator: "All-In Podcast",
        sourceProvider: "YouTube",
        description: "This video presents the complete speech by President Donald Trump at the 'Winning the AI Race' event. He asserts that the United States will emerge victorious in the global AI competition and lays out his administration's corresponding action plan.",
        tags: ["USA", "Trump", "Presidential Speech", "AI Strategy", "Executive Order"]
    }
];
