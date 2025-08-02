// Centralized country mappings and utilities

export const COUNTRY_FLAGS: Record<string, string> = {
  'Spain': '🇪🇸',
  'Portugal': '🇵🇹',
  'Netherlands': '🇳🇱',
  'Greece': '🇬🇷',
  'UAE': '🇦🇪',
  'France': '🇫🇷',
  'Brazil': '🇧🇷',
  'Singapore': '🇸🇬',
  'India': '🇮🇳',
  'Canada': '🇨🇦',
  'USA': '🇺🇸'
};

export const COUNTRY_ISO_CODES: Record<string, string> = {
  'Spain': 'ESP',
  'Portugal': 'PRT',
  'Netherlands': 'NLD',
  'Greece': 'GRC',
  'UAE': 'ARE',
  'France': 'FRA',
  'Brazil': 'BRA',
  'Singapore': 'SGP',
  'India': 'IND',
  'Canada': 'CAN',
  'USA': 'USA'
};

export const COUNTRY_ADJECTIVES: Record<string, string[]> = {
  'France': ['French'],
  'Canada': ['Canadian'],
  'Netherlands': ['Dutch'],
  'Greece': ['Greek', 'Hellenic'],
  'UAE': ['Emirati'],
  'Brazil': ['Brazilian'],
  'Singapore': ['Singaporean'],
  'India': ['Indian'],
  'USA': ['American', 'U.S.']
};

export const getCountryFlag = (country: string): string => {
  return COUNTRY_FLAGS[country] || '🏳️';
};

export const getCountryISOCode = (country: string): string => {
  return COUNTRY_ISO_CODES[country] || country;
};

export const removeCountryFromTitle = (name: string, country: string): string => {
  // Remove country name from the beginning
  const regex = new RegExp(`^${country}\\s+`, 'i');
  let cleanedName = name.replace(regex, '');
  
  // Remove country name from the end
  const endRegex = new RegExp(`\\s+of\\s+${country}`, 'i');
  cleanedName = cleanedName.replace(endRegex, '');
  
  // Remove country adjective forms
  const adjectives = COUNTRY_ADJECTIVES[country];
  if (adjectives) {
    for (const adjective of adjectives) {
      const adjRegex = new RegExp(`^${adjective}\\s+`, 'i');
      cleanedName = cleanedName.replace(adjRegex, '');
    }
  }
  
  return cleanedName;
};