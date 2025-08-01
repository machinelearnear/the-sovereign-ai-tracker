import { Link } from 'react-router-dom';
import { ThemeToggle } from '../components/ThemeToggle';

const About = () => {
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
        
        <h1 className="text-4xl md:text-5xl font-medium text-gray-800 dark:text-white mb-10 tracking-tight">About</h1>
        
        {/* Attribution Statement */}
        <div className="mb-12 text-lg font-light italic border-l-4 border-blue-500 dark:border-blue-400 pl-6 py-2 text-gray-600 dark:text-gray-300">
          The Sovereign AI Tracker is a project by Nicolas Metallo that documents the rise of national AI initiatives around the world. The list tracks how countries are building their own AI capabilities to embed their unique languages, values, and strategic interests into foundation models. It serves as a global tracker for the technological and geopolitical shifts in AI sovereignty.
        </div>
        
        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-gray-300 dark:from-gray-700 to-transparent mb-12"></div>
        
        {/* Existing Content */}
        <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            The Sovereign AI Tracker is your global tracker for a critical technological and geopolitical shift: the rise of national AI initiatives. 
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
        
        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-300/50 dark:border-gray-800/50 text-center text-sm text-gray-500 dark:text-gray-400">
          Built with ❤️ & 🧉 between London and Madrid.
        </div>
      </div>
    </div>
  );
};

export default About;
