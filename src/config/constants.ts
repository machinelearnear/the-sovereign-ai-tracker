// Application configuration constants

export const APP_CONFIG = {
  // Media Grid
  MEDIA_ITEMS_PER_PAGE: 6,
  
  // Initiative Cards
  INITIATIVE_DESCRIPTION_LINES: 6,
  
  // Animation Durations
  TRANSITION_DURATION: 300,
  HOVER_TRANSITION_DURATION: 500,
  
  // Layout
  MAX_CONTAINER_WIDTH: '7xl',
  
  // External Links
  GITHUB_REPO: 'https://github.com/machinelearnear/the-sovereign-ai-tracker',
  LINKEDIN_PROFILE: 'https://www.linkedin.com/in/nicolas-metallo/',
  TWITTER_PROFILE: 'https://x.com/nicolasmetallo'
} as const;

export const FUNDING_KEYWORDS = {
  GOVERNMENT: [
    'government',
    'university',
    'research',
    'iit',
    'innovation, science and economic',
    'tno',
    'fapesp'
  ]
} as const;

export const MODEL_TYPE_COLORS = {
  'LLM': 'bg-purple-100 dark:bg-purple-900/70 text-purple-700 dark:text-purple-200 border border-purple-300 dark:border-purple-800',
  'Infrastructure': 'bg-blue-100 dark:bg-blue-900/70 text-blue-700 dark:text-blue-200 border border-blue-300 dark:border-blue-800',
  'Research': 'bg-amber-100 dark:bg-amber-900/70 text-amber-700 dark:text-amber-200 border border-amber-300 dark:border-amber-800',
  'Dataset': 'bg-emerald-100 dark:bg-emerald-900/70 text-emerald-700 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800'
} as const;

export const FUNDING_SOURCE_COLORS = {
  'Government-funded': 'bg-blue-100 dark:bg-blue-900/70 text-blue-700 dark:text-blue-200 border border-blue-300 dark:border-blue-800',
  'Commercial': 'bg-purple-100 dark:bg-purple-900/70 text-purple-700 dark:text-purple-200 border border-purple-300 dark:border-purple-800'
} as const;