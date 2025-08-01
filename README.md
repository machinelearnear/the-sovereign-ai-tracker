# The Sovereign AI Tracker

A global tracker for national AI initiatives focusing on technological sovereignty around the world.

![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)

## About The Project

The Sovereign AI Tracker is your global tracker for a critical technological and geopolitical shift: the rise of national AI initiatives. As AI models become the new "information stack"—shaping culture, education, and national security—reliance on external AI capabilities creates significant vulnerabilities. This repository documents how nations worldwide are building their own "AI factories," aiming to embed their unique languages, values, and strategic interests directly into the foundational AI that will define their digital future.

Understanding this trend is vital. It's not just about technological independence; it's about who controls the lens through which information is processed and realities are shaped. Whether you're in tech, policy, research, or simply an informed citizen, this list provides insight into how the world is preparing for an AI-driven era where digital and cultural sovereignty are paramount.

## Features

- **Interactive Initiative Cards**: Explore AI initiatives with detailed information including country, organization, timeline, and links
- **Advanced Filtering**: Filter by region, model type, or use the search functionality
- **Responsive Design**: Optimized for all device sizes
- **Dark/Light/System Modes**: Choose your preferred theme or let the system decide
- **Collapsible Sections**: Organized content with expandable/collapsible regions
- **Media Gallery**: Collection of related videos, articles, and research papers
- **Country Flag Visualization**: Visual identification of initiatives by country
- **Initiative Classification**: Clear labeling of model types (LLM, Infrastructure, Research, Policy)
- **Funding Source Badges**: Visual indicators for Government-funded vs Commercial initiatives

## Project Structure

The Sovereign AI Tracker is a web application built with:

- React
- TypeScript
- Tailwind CSS
- Vite

### Key Files

- **src/data.ts**: Contains the main dataset of sovereign AI initiatives
- **src/mediaData.ts**: Curates media content related to sovereign AI
- **src/sovereignAI.tsx**: Main component rendering the user interface
- **src/components/**: UI components including theme controls and media gallery

### Data Structure

The core data structure in `src/data.ts` contains information about various sovereign AI initiatives, including:

- Basic information (name, description, organization)
- Geographic classification (region, subregion, country)
- Development status and timeline
- Technical details (model type, size, language focus)
- Openness and licensing
- Funding information
- Sovereignty focus areas

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## How to Contribute

The Sovereign AI Tracker is an open-source project that welcomes contributions. There are two main ways to contribute:

### 1. Adding a National AI Initiative

To add a new sovereign AI initiative, edit the `src/data.ts` file and use this template structure:

```typescript
{
  id: "unique-id-slug",
  name: "Initiative Name",
  description: "Detailed description of the initiative...",
  dateAnnounced: "YYYY-MM", // Use this format
  dateReleased: "YYYY-MM",  // If applicable
  status: "Released",       // Choose: "Released", "In Development", "Announced", "Discontinued"
  region: "Region",         // E.g., "Europe", "Asia"
  subregion: "Subregion",   // E.g., "Western Europe", "South Asia"
  country: "Country",
  organization: "Organization Name",
  modelType: "Type",        // Choose: "LLM", "Infrastructure", "Research", "Policy"
  modelSize: "7B parameters", // If applicable
  languageFocus: ["Language1", "Language2"], // If applicable
  openSource: true,        // boolean
  license: "License type",  // If applicable
  funding: {               // If applicable
    amount: "Amount",
    currency: "Currency",
    source: "Funding source"
  },
  links: {
    website: "https://...",
    github: "https://...",  // If applicable
    paper: "https://..."    // If applicable
  },
  sovereigntyFocus: ["Language", "Infrastructure", "Digital Independence"],
  tags: ["Tag1", "Tag2", "Tag3"]
}
```

### 2. Adding Media Content

To add content to the "Also Featured" section, edit the `src/mediaData.ts` file using this structure:

```typescript
{
  id: "unique-id",
  title: "Content Title",
  type: "YouTube",          // Choose: "YouTube", "News", "Research", "Report", "Other"
  date: "YYYY-MM-DD",
  creator: "Author/Publication/Channel",
  sourceProvider: "Platform",
  sourceUrl: "https://...", // Link to original content
  thumbnailUrl: "https://...", // Image URL (auto-fetched for YouTube)
  youtubeId: "VIDEO_ID"     // Only for YouTube content
}
```

### Contribution Process

1. Fork the repository
2. Add or modify the data files using the templates above
3. Submit a pull request with your changes
4. Include reliable sources for all information

## License

MIT

---

Built with ❤️ & 🧉 between London and Madrid
