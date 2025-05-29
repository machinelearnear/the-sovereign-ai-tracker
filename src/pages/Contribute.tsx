import { Link } from 'react-router-dom';
import { ThemeToggle } from '../components/ThemeToggle';
import { ExternalLink } from 'lucide-react';

const Contribute = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b dark:from-black dark:via-gray-950 dark:to-black from-white to-white text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-gray-900 dark:via-gray-950 dark:to-black transition-colors duration-300" />
      
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      
      <div className="relative max-w-3xl mx-auto px-6 py-12">
        {/* Navigation */}
        <div className="mb-16">
          <Link to="/" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <span className="text-lg">←</span>
            <span className="ml-2">Back to Home</span>
          </Link>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-medium text-gray-800 dark:text-white mb-10 tracking-tight">How to Contribute</h1>
        
        {/* Content */}
        <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            This project is open-source and welcomes contributions. There are two main ways to contribute:
          </p>
          
          <div className="mt-8">
            <h3 className="text-xl font-medium mb-2">1. Adding a National AI Initiative</h3>
            <p className="mb-4">To add a new sovereign AI initiative, edit the <code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded text-gray-800 dark:text-gray-200">src/data.ts</code> file and use this template structure:</p>
            
            {/* Code example */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto">
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
            <h3 className="text-xl font-medium mb-2">2. Adding Media Content</h3>
            <p className="mb-4">To add content to the "Also Featured" section, edit the <code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded text-gray-800 dark:text-gray-200">src/mediaData.ts</code> file using this structure:</p>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto">
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
          
          <ol className="list-decimal pl-6 mt-8">
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
          
          <div className="mt-12 text-center">
            <a
              href="https://github.com/machinelearnear/the-sovereign-ai-list"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <span>Contribute on GitHub</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-300/50 dark:border-gray-800/50 text-center text-sm text-gray-500 dark:text-gray-400">
          Built with ❤️ & 🧉 between London and Madrid.
        </div>
      </div>
    </div>
  );
};

export default Contribute;
