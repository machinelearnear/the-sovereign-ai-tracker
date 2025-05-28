// Sovereign AI List - Data File
// A comprehensive collection of Sovereign AI initiatives around the world

export type Initiative = {
    id: string;                     // Unique identifier (slug)
    name: string;                   // Initiative name (e.g., "GPT-NL")
    description: string;            // Concise description (2-3 sentences)
    dateAnnounced: string;          // When initiative was announced (YYYY-MM)
    dateReleased?: string;          // When released, if applicable (YYYY-MM)
    status: "Announced" | "In Development" | "Released" | "Discontinued";
    
    // Geographic classification
    region: string;                 // Continent/Major region
    subregion: string;              // Geographic subregion
    country: string;                // Primary country
    
    // Details
    organization: string;           // Leading organization(s)
    modelType: string;              // E.g., "LLM", "Multimodal", "Computer Vision"
    modelSize?: string;             // Size (e.g., "7B parameters")
    languageFocus?: string[];       // Primary languages supported
    
    // Access & Implementation
    openSource: boolean;            // Is it open source?
    license?: string;               // License type if open source
    
    // Funding & Support
    funding?: {
        amount?: string;            // Funding amount
        currency?: string;          // Currency code
        source: string;             // Funding source(s)
    };
    
    // Partners and collaboration
    collaborators?: string[];       // Collaborating organizations
    
    // Links
    links: {
        website?: string;           // Official website
        paper?: string;             // Technical paper
        github?: string;            // Source code repository
        announcement?: string;      // Announcement article/press release
    };
    
    // Additional metadata
    sovereigntyFocus: string[];     // E.g., ["Data", "Infrastructure", "Language"]
    tags: string[];                 // Additional classification tags
}

// Sample data - to be expanded based on research
const initiativesData: Initiative[] = [
    {
        id: "sea-lion-singapore",
        name: "SEA-LION",
        description: "Southeast Asian Languages In One Network (SEA-LION) is a large language model focused on supporting languages from the ASEAN region. Developed to enhance linguistic diversity and AI accessibility across Southeast Asia.",
        dateAnnounced: "2023-11",
        dateReleased: "2023-12",
        status: "Released",
        region: "Asia",
        subregion: "Southeast Asia",
        country: "Singapore",
        organization: "AI Singapore",
        modelType: "LLM",
        modelSize: "7B parameters",
        languageFocus: ["Burmese", "Filipino", "Indonesian", "Khmer", "Lao", "Malay", "Thai", "Vietnamese"],
        openSource: true,
        license: "Apache 2.0",
        collaborators: ["National University of Singapore", "Nanyang Technological University"],
        links: {
            website: "https://sea-lion.ai/",
            github: "https://huggingface.co/aisingapore/sea-lion-7b"
        },
        sovereigntyFocus: ["Language", "Regional Representation", "Cultural Preservation"],
        tags: ["Southeast Asia", "Multilingual", "Research"]
    },
    {
        id: "ai4bharat-india",
        name: "AI4Bharat",
        description: "An open-source initiative focused on building AI technologies for Indian languages. Aims to overcome linguistic barriers and democratize access to AI applications for India's diverse population.",
        dateAnnounced: "2022-08",
        dateReleased: "2023-06",
        status: "Released",
        region: "Asia",
        subregion: "South Asia",
        country: "India",
        organization: "IIT Madras",
        modelType: "Research",
        languageFocus: ["Hindi", "Tamil", "Bengali", "Telugu", "Marathi", "Kannada", "Gujarati", "Malayalam", "Punjabi", "Odia"],
        openSource: true,
        links: {
            website: "https://ai4bharat.iitm.ac.in/",
            github: "https://github.com/AI4Bharat"
        },
        sovereigntyFocus: ["Language", "Digital Inclusion", "Education"],
        tags: ["India", "Language Technology", "Academic"]
    },
    {
        id: "canadian-sovereign-ai-compute",
        name: "Canadian Sovereign AI Compute Strategy",
        description: "A comprehensive national strategy investing $2 billion over five years to boost AI compute infrastructure in Canada through private sector investment, public supercomputing, and an AI Compute Access Fund of $300 million.",
        dateAnnounced: "2024-04",
        status: "In Development",
        region: "Americas",
        subregion: "North America",
        country: "Canada",
        organization: "Innovation, Science and Economic Development Canada",
        modelType: "Infrastructure",
        openSource: false,
        funding: {
            amount: "2 billion",
            currency: "CAD",
            source: "Canadian Government"
        },
        links: {
            website: "https://ised-isde.canada.ca/site/ised/en/canadian-sovereign-ai-compute-strategy",
            announcement: "https://ised-isde.canada.ca/site/ised/en/canadian-sovereign-ai-compute-strategy#fund"
        },
        sovereigntyFocus: ["Infrastructure", "Compute", "Economic Growth"],
        tags: ["North America", "Government-backed", "Infrastructure"]
    },
    {
        id: "gpt-nl-netherlands",
        name: "GPT-NL",
        description: "A Dutch large language model initiative aimed at creating AI technology that aligns with European values and builds digital sovereignty in the Netherlands.",
        dateAnnounced: "2023-11",
        status: "In Development",
        region: "Europe",
        subregion: "Western Europe",
        country: "Netherlands",
        organization: "TNO, SURF, NFI",
        modelType: "LLM",
        openSource: true,
        funding: {
            amount: "13.5 million",
            currency: "EUR",
            source: "Dutch Government"
        },
        collaborators: ["TNO", "SURF", "NFI"],
        links: {
            website: "https://www.tno.nl/en/newsroom/2023/11/netherlands-starts-realisation-gpt-nl/"
        },
        sovereigntyFocus: ["Language", "Infrastructure", "Governance"],
        tags: ["Dutch", "Europe", "Public Funding"]
    },
    {
        id: "llama-krikri-greece",
        name: "Llama-KriKri",
        description: "A Greek language AI model based on Llama architecture. Developed to provide better Greek language support and improve accessibility to AI in Greece.",
        dateAnnounced: "2023-02",
        dateReleased: "2023-02",
        status: "Released",
        region: "Europe",
        subregion: "Southern Europe",
        country: "Greece",
        organization: "Athena Research Center",
        modelType: "LLM",
        modelSize: "7B parameters",
        languageFocus: ["Greek"],
        openSource: true,
        license: "Llama 2 Community License",
        collaborators: ["ILSP", "Meltemi team"],
        links: {
            website: "https://www.ilsp.gr/en/news/krikri/",
            github: "https://huggingface.co/ILSP/Llama-KriKri"
        },
        sovereigntyFocus: ["Language", "Cultural Heritage"],
        tags: ["Greek", "Europe", "Language Preservation"]
    },
    {
        id: "falcon-uae",
        name: "Falcon",
        description: "A state-backed large language model developed in the UAE, focusing on Arabic language support and regional AI capabilities.",
        dateAnnounced: "2023-03",
        dateReleased: "2023-05",
        status: "Released",
        region: "Middle East",
        subregion: "Gulf",
        country: "UAE",
        organization: "Technology Innovation Institute (TII)",
        modelType: "LLM",
        modelSize: "40B parameters",
        languageFocus: ["Arabic", "English"],
        openSource: true,
        license: "TII License",
        links: {
            website: "https://falconllm.tii.ae/",
            github: "https://huggingface.co/tiiuae"
        },
        sovereigntyFocus: ["Language", "Infrastructure", "Research"],
        tags: ["Arabic", "Middle East", "Open Research"]
    },
    {
        id: "mistral-france",
        name: "Mistral AI",
        description: "A French AI initiative developing open-weight language models as an alternative to U.S. and Chinese AI systems, emphasizing European sovereignty and open innovation.",
        dateAnnounced: "2023-06",
        dateReleased: "2023-09",
        status: "Released",
        region: "Europe",
        subregion: "Western Europe",
        country: "France",
        organization: "Mistral AI",
        modelType: "LLM",
        modelSize: "7B to 70B parameters",
        openSource: true,
        license: "Apache 2.0",
        funding: {
            amount: "105 million",
            currency: "EUR",
            source: "Private Investment"
        },
        links: {
            website: "https://mistral.ai/",
            github: "https://github.com/mistralai"
        },
        sovereigntyFocus: ["Infrastructure", "Research", "Governance"],
        tags: ["France", "Europe", "Venture-backed"]
    },
    {
        id: "bagualu-brazil",
        name: "Bagualu",
        description: "Brazil's sovereign large language model project, developed to ensure AI technology aligns with Brazilian values and language needs.",
        dateAnnounced: "2023-10",
        status: "In Development",
        region: "Americas",
        subregion: "South America",
        country: "Brazil",
        organization: "FAPESP, USP",
        modelType: "LLM",
        languageFocus: ["Portuguese"],
        openSource: true,
        funding: {
            source: "São Paulo Research Foundation"
        },
        links: {
            website: "https://bagualu.ai/"
        },
        sovereigntyFocus: ["Language", "Infrastructure", "Digital Independence"],
        tags: ["Portuguese", "South America", "Academic"]
    }
];

export { initiativesData };
