import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setThemeMode: (theme: Theme) => void;
  getActualTheme: (theme: Theme) => 'dark' | 'light';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get actual theme based on system preference when in 'system' mode
  const getActualTheme = (theme: Theme): 'dark' | 'light' => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  };
  
  // Check if user has a saved preference or use system as default
  const getInitialTheme = (): Theme => {
    if (typeof window === 'undefined') return 'system'; // Default for SSR
    
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light' || savedTheme === 'system')) {
      return savedTheme;
    }
    
    return 'system';
  };
  
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  
  // Function to set theme directly (for specific theme buttons)
  const setThemeMode = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Legacy toggle function that rotates through the themes
  const toggleTheme = () => {
    setTheme(prevTheme => {
      let newTheme: Theme;
      if (prevTheme === 'light') newTheme = 'dark';
      else if (prevTheme === 'dark') newTheme = 'system';
      else newTheme = 'light';
      
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };
  
  // Apply theme to document when it changes and listen for system preference changes
  useEffect(() => {
    const root = window.document.documentElement;
    const actualTheme = getActualTheme(theme);
    
    root.classList.remove('dark', 'light');
    root.classList.add(actualTheme);
    
    // Listen for changes in system preference when in 'system' mode
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = () => {
        root.classList.remove('dark', 'light');
        root.classList.add(mediaQuery.matches ? 'dark' : 'light');
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setThemeMode, getActualTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using the theme
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};
