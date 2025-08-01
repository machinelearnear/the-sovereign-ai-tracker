# Design Document

## Overview

This design transforms The Sovereign AI Tracker from an initiative-centric view to a country-centric view with aggregated data. The new architecture maintains the existing technical stack while reorganizing the data presentation layer to show countries as primary entities with initiative counts, organized by continental regions.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Main Application                          │
├─────────────────────────────────────────────────────────────┤
│  CountryGridView (New)          │  CountryDetailView (New)   │
│  ├─ RegionalSections           │  ├─ CountryHeader          │
│  ├─ CountryCards               │  ├─ InitiativeGrid         │
│  └─ FilterControls             │  └─ BackNavigation         │
├─────────────────────────────────────────────────────────────┤
│                    Shared Components                         │
│  ├─ ThemeToggle                │  ├─ ErrorBoundary          │
│  ├─ MediaGrid                  │  └─ Navigation             │
├─────────────────────────────────────────────────────────────┤
│                    Data Layer                               │
│  ├─ CountryAggregator (New)    │  ├─ RegionMapper (New)     │
│  ├─ InitiativeData             │  └─ CountryUtils           │
└─────────────────────────────────────────────────────────────┘
```

### Regional Mapping Strategy

The application will use a new regional classification system:

```typescript
const REGIONAL_MAPPING = {
  'Europe': ['Spain', 'Portugal', 'Netherlands', 'Greece', 'France', 'UK', 'Russia'],
  'MENAT': ['UAE', 'Turkey', 'Egypt', 'Saudi Arabia', 'Israel'],
  'South Asia': ['India', 'Pakistan', 'Bangladesh'],
  'Asia Pacific': ['Singapore', 'Japan', 'Korea', 'Australia'],
  'China': ['China'],
  'North America': ['Canada', 'USA'],
  'Latin America': ['Brazil', 'Mexico', 'Argentina']
};
```

## Components and Interfaces

### New Components

#### 1. CountryCard Component

```typescript
interface CountryCardProps {
  country: string;
  initiativeCount: number;
  region: string;
  onClick: (country: string) => void;
}

const CountryCard: React.FC<CountryCardProps> = ({
  country,
  initiativeCount,
  region,
  onClick
}) => {
  // Design: Large flag emoji, country name, count badge
  // Hover effects similar to current initiative cards
  // Click handler for navigation to detail view
};
```

#### 2. CountryGridView Component

```typescript
interface CountryGridViewProps {
  searchTerm: string;
  selectedRegion: string;
  selectedModelType: string;
}

const CountryGridView: React.FC<CountryGridViewProps> = ({
  searchTerm,
  selectedRegion,
  selectedModelType
}) => {
  // Aggregates initiatives by country
  // Filters countries based on search/filter criteria
  // Renders regional sections with country cards
};
```

#### 3. CountryDetailView Component

```typescript
interface CountryDetailViewProps {
  country: string;
  onBack: () => void;
}

const CountryDetailView: React.FC<CountryDetailViewProps> = ({
  country,
  onBack
}) => {
  // Shows all initiatives for selected country
  // Uses existing InitiativeCard components
  // Provides navigation back to grid view
};
```

### Updated Components

#### 1. Enhanced FilterControls

```typescript
interface FilterControlsProps {
  // Existing props plus:
  view: 'grid' | 'detail';
  selectedCountry?: string;
  onViewChange: (view: 'grid' | 'detail') => void;
}
```

#### 2. Modified RegionSection

```typescript
interface RegionSectionProps {
  region: string;
  countries: CountryData[];
  isExpanded: boolean;
  onToggle: () => void;
}
```

## Data Models

### New Data Structures

#### CountryData Interface

```typescript
interface CountryData {
  country: string;
  region: string;
  initiativeCount: number;
  initiatives: Initiative[];
  lastUpdated: string;
}
```

#### RegionData Interface

```typescript
interface RegionData {
  region: string;
  countries: CountryData[];
  totalInitiatives: number;
}
```

### Data Processing Pipeline

```typescript
// 1. Group initiatives by country
const groupInitiativesByCountry = (initiatives: Initiative[]): Record<string, Initiative[]> => {
  return initiatives.reduce((acc, initiative) => {
    if (!acc[initiative.country]) {
      acc[initiative.country] = [];
    }
    acc[initiative.country].push(initiative);
    return acc;
  }, {} as Record<string, Initiative[]>);
};

// 2. Map countries to regions
const mapCountriesToRegions = (countryGroups: Record<string, Initiative[]>): RegionData[] => {
  // Implementation maps countries to their respective regions
};

// 3. Apply filters
const filterCountriesBySearch = (regions: RegionData[], searchTerm: string): RegionData[] => {
  // Implementation filters countries based on search criteria
};
```

## User Interface Design

### Country Card Visual Design

```
┌─────────────────────────────────┐
│                                 │
│              🇬🇷                │
│                                 │
│            Greece               │
│             (2)                 │
│                                 │
└─────────────────────────────────┘
```

**Visual Specifications:**
- Card size: 200px x 160px
- Flag emoji: 48px font size, centered
- Country name: 18px font size, medium weight
- Count badge: 14px font size, gray color
- Hover effect: Subtle scale and shadow
- Border radius: 12px
- Background: White/dark mode compatible

### Grid Layout Specifications

```css
.country-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 1rem 0;
}

@media (max-width: 640px) {
  .country-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
}

@media (min-width: 1024px) {
  .country-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 2rem;
  }
}
```

### Country Detail View Layout

```
┌─────────────────────────────────────────────────────────────┐
│  ← Back to Countries    🇬🇷 Greece (2 initiatives)          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────┐                          │
│  │  Meltemi    │  │ Llama-KriKri│                          │
│  │  Initiative │  │ Initiative  │                          │
│  │  Card       │  │ Card        │                          │
│  └─────────────┘  └─────────────┘                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Routing Strategy

### URL Structure

```
/ - Main country grid view
/country/:countryName - Country detail view
/about - About page (unchanged)
/contribute - Contribute page (unchanged)
```

### Navigation Implementation

```typescript
// React Router setup
const router = createBrowserRouter([
  {
    path: "/",
    element: <CountryGridView />,
  },
  {
    path: "/country/:countryName",
    element: <CountryDetailView />,
  },
  // ... existing routes
]);
```

## Error Handling

### Error Scenarios

1. **Country not found**: When navigating to `/country/invalid-country`
2. **No initiatives found**: When filters result in empty country list
3. **Data loading errors**: When initiative data fails to load

### Error Handling Strategy

```typescript
// Country not found
if (!countryData) {
  return <CountryNotFound country={countryName} />;
}

// No results
if (filteredCountries.length === 0) {
  return <NoCountriesFound searchTerm={searchTerm} />;
}

// Data loading error
if (error) {
  return <ErrorBoundary fallback={<DataLoadError />} />;
}
```

## Testing Strategy

### Unit Tests

1. **CountryAggregator**: Test initiative grouping logic
2. **RegionMapper**: Test country-to-region mapping
3. **FilterLogic**: Test search and filter functionality
4. **CountryCard**: Test rendering and interaction

### Integration Tests

1. **Navigation**: Test routing between grid and detail views
2. **Search**: Test end-to-end search functionality
3. **Responsive**: Test grid layout on different screen sizes

### Visual Tests

1. **Country Cards**: Verify consistent styling
2. **Grid Layout**: Test responsive behavior
3. **Detail View**: Test initiative display

## Performance Considerations

### Optimization Strategies

1. **Memoization**: Use `useMemo` for country aggregation
2. **Virtual Scrolling**: For large numbers of countries (future)
3. **Lazy Loading**: Load country details on demand
4. **Image Optimization**: Optimize flag emoji rendering

### Implementation

```typescript
// Memoized country aggregation
const countryData = useMemo(() => {
  return aggregateInitiativesByCountry(initiatives);
}, [initiatives]);

// Memoized filtered results
const filteredCountries = useMemo(() => {
  return filterCountries(countryData, searchTerm, selectedRegion);
}, [countryData, searchTerm, selectedRegion]);
```

## Migration Strategy

### Phase 1: Component Creation
- Create new country-focused components
- Implement data aggregation logic
- Add routing for detail view

### Phase 2: Integration
- Replace main view with country grid
- Update navigation and filtering
- Test all functionality

### Phase 3: Polish
- Refine visual design
- Add animations and transitions
- Optimize performance

### Backward Compatibility

The existing initiative data structure remains unchanged, ensuring:
- No data migration required
- Easy rollback if needed
- Gradual feature rollout possible