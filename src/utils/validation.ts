import { Initiative } from '../data';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateInitiative = (initiative: Initiative): ValidationResult => {
  const errors: string[] = [];

  // Required fields validation
  if (!initiative.id?.trim()) {
    errors.push('ID is required');
  }

  if (!initiative.name?.trim()) {
    errors.push('Name is required');
  }

  if (!initiative.description?.trim()) {
    errors.push('Description is required');
  }

  if (!initiative.country?.trim()) {
    errors.push('Country is required');
  }

  if (!initiative.region?.trim()) {
    errors.push('Region is required');
  }

  if (!initiative.subregion?.trim()) {
    errors.push('Subregion is required');
  }

  if (!initiative.organization?.trim()) {
    errors.push('Organization is required');
  }

  if (!initiative.modelType?.trim()) {
    errors.push('Model type is required');
  }

  // Status validation
  const validStatuses = ['Announced', 'In Development', 'Released', 'Discontinued'];
  if (!validStatuses.includes(initiative.status)) {
    errors.push(`Status must be one of: ${validStatuses.join(', ')}`);
  }

  // Date format validation
  const dateRegex = /^\d{4}-\d{2}$/;
  if (!dateRegex.test(initiative.dateAnnounced)) {
    errors.push('Date announced must be in YYYY-MM format');
  }

  if (initiative.dateReleased && !dateRegex.test(initiative.dateReleased)) {
    errors.push('Date released must be in YYYY-MM format');
  }

  // Links validation
  if (!initiative.links || typeof initiative.links !== 'object') {
    errors.push('Links object is required');
  } else {
    const urlRegex = /^https?:\/\/.+/;
    
    if (initiative.links.website && !urlRegex.test(initiative.links.website)) {
      errors.push('Website must be a valid URL');
    }
    
    if (initiative.links.github && !urlRegex.test(initiative.links.github)) {
      errors.push('GitHub link must be a valid URL');
    }
    
    if (initiative.links.paper && !urlRegex.test(initiative.links.paper)) {
      errors.push('Paper link must be a valid URL');
    }
  }

  // Arrays validation
  if (!Array.isArray(initiative.sovereigntyFocus)) {
    errors.push('Sovereignty focus must be an array');
  }

  if (!Array.isArray(initiative.tags)) {
    errors.push('Tags must be an array');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateInitiativeArray = (initiatives: Initiative[]): ValidationResult => {
  const errors: string[] = [];
  const ids = new Set<string>();

  initiatives.forEach((initiative, index) => {
    const result = validateInitiative(initiative);
    
    if (!result.isValid) {
      errors.push(`Initiative ${index + 1}: ${result.errors.join(', ')}`);
    }

    // Check for duplicate IDs
    if (ids.has(initiative.id)) {
      errors.push(`Duplicate ID found: ${initiative.id}`);
    } else {
      ids.add(initiative.id);
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};