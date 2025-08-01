import { Initiative } from '../data';

// Regional mapping based on the new continental organization
export const REGIONAL_MAPPING: Record<string, string[]> = {
  'Europe': ['Spain', 'Portugal', 'Netherlands', 'Greece', 'France', 'UK', 'Russia'],
  'Middle East & Africa': ['UAE', 'Turkey', 'Egypt', 'Saudi Arabia', 'Israel'],
  'South Asia': ['India', 'Pakistan', 'Bangladesh'],
  'Asia Pacific': ['Singapore', 'Japan', 'Korea', 'Australia'],
  'China': ['China'],
  'North America': ['Canada', 'USA'],
  'Latin America': ['Brazil', 'Mexico', 'Argentina']
};

export interface CountryData {
  country: string;
  region: string;
  initiativeCount: number;
  initiatives: Initiative[];
  lastUpdated: string;
}

export interface RegionData {
  region: string;
  countries: CountryData[];
  totalInitiatives: number;
}

// Get region for a country
export const getRegionForCountry = (country: string): string => {
  for (const [region, countries] of Object.entries(REGIONAL_MAPPING)) {
    if (countries.includes(country)) {
      return region;
    }
  }
  // Default to 'Other' for unmapped countries
  return 'Other';
};

// Group initiatives by country
export const groupInitiativesByCountry = (initiatives: Initiative[]): Record<string, Initiative[]> => {
  return initiatives.reduce((acc, initiative) => {
    const country = initiative.country;
    if (!acc[country]) {
      acc[country] = [];
    }
    acc[country].push(initiative);
    return acc;
  }, {} as Record<string, Initiative[]>);
};

// Convert country groups to CountryData objects
export const createCountryData = (countryGroups: Record<string, Initiative[]>): CountryData[] => {
  return Object.entries(countryGroups).map(([country, initiatives]) => ({
    country,
    region: getRegionForCountry(country),
    initiativeCount: initiatives.length,
    initiatives,
    lastUpdated: new Date().toISOString()
  }));
};

// Group countries by region
export const groupCountriesByRegion = (countryData: CountryData[]): RegionData[] => {
  const regionGroups = countryData.reduce((acc, country) => {
    const region = country.region;
    if (!acc[region]) {
      acc[region] = [];
    }
    acc[region].push(country);
    return acc;
  }, {} as Record<string, CountryData[]>);

  return Object.entries(regionGroups).map(([region, countries]) => ({
    region,
    countries: countries.sort((a, b) => a.country.localeCompare(b.country)),
    totalInitiatives: countries.reduce((sum, country) => sum + country.initiativeCount, 0)
  }));
};

// Main aggregation function
export const aggregateInitiativesByCountry = (initiatives: Initiative[]): RegionData[] => {
  const countryGroups = groupInitiativesByCountry(initiatives);
  const countryData = createCountryData(countryGroups);
  return groupCountriesByRegion(countryData);
};

// Filter countries based on search term
export const filterCountriesBySearch = (
  regionData: RegionData[], 
  searchTerm: string
): RegionData[] => {
  if (!searchTerm.trim()) {
    return regionData;
  }

  const searchLower = searchTerm.toLowerCase();
  
  return regionData.map(region => ({
    ...region,
    countries: region.countries.filter(country => {
      // Search in country name
      if (country.country.toLowerCase().includes(searchLower)) {
        return true;
      }
      
      // Search in initiative names, descriptions, and organizations
      return country.initiatives.some(initiative => 
        initiative.name.toLowerCase().includes(searchLower) ||
        initiative.description.toLowerCase().includes(searchLower) ||
        initiative.organization.toLowerCase().includes(searchLower)
      );
    })
  })).filter(region => region.countries.length > 0);
};

// Filter countries by region
export const filterCountriesByRegion = (
  regionData: RegionData[], 
  selectedRegion: string
): RegionData[] => {
  if (selectedRegion === 'All') {
    return regionData;
  }
  
  return regionData.filter(region => region.region === selectedRegion);
};

// Filter countries by model type
export const filterCountriesByModelType = (
  regionData: RegionData[], 
  selectedModelType: string
): RegionData[] => {
  if (selectedModelType === 'All') {
    return regionData;
  }

  return regionData.map(region => ({
    ...region,
    countries: region.countries.filter(country => 
      country.initiatives.some(initiative => initiative.modelType === selectedModelType)
    )
  })).filter(region => region.countries.length > 0);
};

// Combined filter function
export const filterCountries = (
  regionData: RegionData[],
  searchTerm: string,
  selectedRegion: string,
  selectedModelType: string
): RegionData[] => {
  let filtered = regionData;
  
  filtered = filterCountriesBySearch(filtered, searchTerm);
  filtered = filterCountriesByRegion(filtered, selectedRegion);
  filtered = filterCountriesByModelType(filtered, selectedModelType);
  
  return filtered;
};

// Get all unique regions from data
export const getUniqueRegions = (regionData: RegionData[]): string[] => {
  return regionData.map(region => region.region).sort();
};

// Get country data by country name
export const getCountryByName = (regionData: RegionData[], countryName: string): CountryData | null => {
  for (const region of regionData) {
    const country = region.countries.find(c => c.country === countryName);
    if (country) {
      return country;
    }
  }
  return null;
};