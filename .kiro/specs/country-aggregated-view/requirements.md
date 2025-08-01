# Requirements Document

## Introduction

Transform The Sovereign AI Tracker from showing individual initiative cards to displaying country-based cards with aggregated counts. This will reduce visual clutter as the dataset grows and provide a cleaner, more organized view of sovereign AI activities by country and region.

## Requirements

### Requirement 1: Regional Organization

**User Story:** As a user, I want to see countries organized by continental regions, so that I can understand the geographic distribution of sovereign AI initiatives.

#### Acceptance Criteria

1. WHEN the application loads THEN countries SHALL be grouped into the following regions:
   - Europe (including UK and Russia)
   - MENAT (Middle East, North Africa, and Turkey)
   - South Asia
   - Asia Pacific (including Japan and Korea)
   - China (as separate region)
   - North America
   - Latin America

2. WHEN a region has no countries with initiatives THEN that region SHALL NOT be displayed

3. WHEN regions are displayed THEN they SHALL maintain the current collapsible section structure

### Requirement 2: Country Card Display

**User Story:** As a user, I want to see country cards with flag emojis and initiative counts, so that I can quickly identify which countries have sovereign AI activities and their relative activity levels.

#### Acceptance Criteria

1. WHEN displaying countries THEN each country card SHALL show:
   - Country flag emoji (large, prominent)
   - Country name below the flag
   - Initiative count in parentheses format "(X)" where X is the number of initiatives

2. WHEN a country has only one initiative THEN the count SHALL display "(1)"

3. WHEN a country has multiple initiatives THEN the count SHALL display "(X)" where X > 1

4. WHEN a country card is clicked THEN it SHALL navigate to a detailed view showing all initiatives for that country

### Requirement 3: Grid Layout Preservation

**User Story:** As a user, I want the grid layout to be maintained for country cards, so that the visual structure remains familiar and organized.

#### Acceptance Criteria

1. WHEN country cards are displayed THEN they SHALL use a responsive grid layout:
   - 1 column on mobile devices
   - 2-3 columns on tablet devices  
   - 4-6 columns on desktop devices

2. WHEN country cards are displayed THEN they SHALL maintain consistent sizing and spacing

3. WHEN hovering over country cards THEN they SHALL provide visual feedback similar to current initiative cards

### Requirement 4: Content Type Support

**User Story:** As a user, I want the system to support different types of sovereign AI content beyond just models, so that I can track comprehensive national AI strategies.

#### Acceptance Criteria

1. WHEN content is categorized THEN the system SHALL support these types:
   - AI Models (LLM, Multimodal, etc.)
   - National AI Plans/Strategies (PDF documents)
   - Policy Documents
   - Infrastructure Initiatives
   - Research Programs

2. WHEN counting initiatives THEN all content types SHALL be included in the country totals

3. WHEN displaying initiative details THEN content type SHALL be clearly indicated

### Requirement 5: Search and Filter Adaptation

**User Story:** As a user, I want search and filtering to work with the new country-based view, so that I can still find relevant information efficiently.

#### Acceptance Criteria

1. WHEN searching THEN results SHALL filter countries based on:
   - Country names
   - Initiative names within countries
   - Organization names within countries
   - Content descriptions within countries

2. WHEN applying region filters THEN only countries from selected regions SHALL be displayed

3. WHEN applying model type filters THEN only countries with matching initiative types SHALL be displayed

4. WHEN no countries match filters THEN an appropriate "no results" message SHALL be displayed

### Requirement 6: Country Detail View

**User Story:** As a user, I want to click on a country card to see all initiatives from that country, so that I can explore the detailed sovereign AI activities of specific nations.

#### Acceptance Criteria

1. WHEN a country card is clicked THEN a detailed view SHALL display all initiatives for that country

2. WHEN in country detail view THEN initiatives SHALL be displayed using the current initiative card design

3. WHEN in country detail view THEN there SHALL be a clear way to return to the main country grid view

4. WHEN in country detail view THEN the page title/header SHALL indicate the selected country

### Requirement 7: Data Structure Compatibility

**User Story:** As a developer, I want the new view to work with existing data structures, so that no data migration is required.

#### Acceptance Criteria

1. WHEN processing existing initiative data THEN the system SHALL automatically group by country

2. WHEN counting initiatives THEN the system SHALL handle all existing data fields correctly

3. WHEN displaying country information THEN existing country mappings (flags, names) SHALL be reused

4. WHEN new initiatives are added THEN they SHALL automatically appear in the correct country aggregation