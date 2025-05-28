import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from './ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, setThemeMode, getActualTheme } = useTheme();
  const actualTheme = getActualTheme(theme);
  
  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={() => setThemeMode('light')}
        className={`p-2 rounded-full ${theme === 'light' 
          ? 'bg-gray-200/80 text-gray-700 shadow-sm' 
          : actualTheme === 'dark' 
            ? 'text-white hover:bg-gray-800' 
            : 'text-gray-700 hover:bg-gray-100'}`}
        aria-label="Switch to light mode"
        title="Light mode"
      >
        <Sun size={18} />
      </button>
      <button
        onClick={() => setThemeMode('dark')}
        className={`p-2 rounded-full ${theme === 'dark' 
          ? 'bg-gray-200/80 text-gray-900 border border-gray-500/50 shadow-sm' 
          : actualTheme === 'dark'
            ? 'text-white hover:bg-gray-800' 
            : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        aria-label="Switch to dark mode"
        title="Dark mode"
      >
        <Moon size={18} />
      </button>
      <button
        onClick={() => setThemeMode('system')}
        className={`p-2 rounded-full ${theme === 'system' 
          ? 'bg-gray-200/80 text-gray-900 border border-gray-500/50 shadow-sm' 
          : actualTheme === 'dark'
            ? 'text-white hover:bg-gray-800' 
            : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        aria-label="Use system theme"
        title="System theme"
      >
        <Monitor size={18} />
      </button>
    </div>
  );
};
