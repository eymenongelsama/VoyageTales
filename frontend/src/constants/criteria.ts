export const initialCriteria = [
  'Security & Crime Rates',
  'Cost of Living',
  'Climate & Weather Conditions',
  'Health Services & Quality',
  'Accommodation Options & Cost',
  'Transportation & Infrastructure',
  'Visa Ease & Immigration',
  'Education Quality',
  'Job Opportunities',
  'Internet Infrastructure',
] as const;

export const additionalCriteria = [
  'Language Barrier',
  'Cultural Richness',
  'Food Culture',
  'Local Hospitality',
  'Nightlife & Entertainment',
  'Natural Beauties',
  'Environmental Factors',
  'Tax Policies',
  'Religious & Cultural Harmony',
  'Property Acquisition Ease',
] as const;

export type CriteriaType = typeof initialCriteria[number] | typeof additionalCriteria[number];