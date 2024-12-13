export interface Country {
  name: string;
  matchScore: number;
  imageUrl: string;
  description: string;
  highlights: string[];
}

export const sampleCountries: Country[] = [
  {
    name: 'Portugal',
    matchScore: 92,
    imageUrl: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80',
    description: 'Excellent quality of life, rich culture, and great weather. Perfect for digital nomads and retirees.',
    highlights: ['Safe', 'Affordable', 'Great Healthcare', 'Golden Visa'],
  },
  {
    name: 'Spain',
    matchScore: 88,
    imageUrl: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&q=80',
    description: 'Vibrant culture, excellent food, and diverse landscapes. Ideal for both short and long-term stays.',
    highlights: ['Rich Culture', 'Good Healthcare', 'Great Food', 'Beach Life'],
  },
  {
    name: 'Thailand',
    matchScore: 85,
    imageUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80',
    description: 'Low cost of living, beautiful beaches, and friendly people. Popular among digital nomads.',
    highlights: ['Affordable', 'Tropical Climate', 'Rich Culture', 'Great Food'],
  },
];