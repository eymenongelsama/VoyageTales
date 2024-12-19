// src/types/country.ts

export interface Criteria {
  id: number;
  country: number;
  criteria: number;
  score: number;
  criteria_name: string;
}

export interface Feature {
  id: number;
  feature: string;
}


export interface Country {
  id: number;
  name: string;
  description: string;
  match_percentage: string;
  image: string;
  features: string[]; // features bir dizi string
  overall_score: number;
}

export interface CountriesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Country[];
}
