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
  name: string;
  description: string;
}

export interface Country {
  id: number;
  name: string;
  description: string;
  match_percentage: string;
  image_url: string;
  criteria: Criteria[];
  features: Feature[]; // Özellikler
  overall_score: number;
}

export interface CountriesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Country[];
}

// Sample data for testing purposes (Opsiyonel)
export const sampleCountries: Country[] = [
  {
    id: 1,
    name: "Sample Country",
    description: "This is a sample country for testing.",
    match_percentage: "75.00",
    image_url: "http://127.0.0.1:8000/media/defaults/default_world_image.jpg",
    criteria: [
      {
        id: 1,
        country: 1,
        criteria: 1,
        score: 8,
        criteria_name: "Güvenlik & Suç Oranları"
      },
      // Diğer kriterler...
    ],
    features: [
      {
        id: 1,
        name: "Zengin Kültür",
        description: "Çeşitli kültürel etkinlikler ve miras."
      },
      // Diğer özellikler...
    ],
    overall_score: 4.5
  },
  // Diğer sample ülkeler...
];