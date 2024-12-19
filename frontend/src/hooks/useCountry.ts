import { useState, useEffect } from 'react';
import axios from 'axios';

interface Criteria {
  id: number;
  name: string;
  score: number;
}

interface Country {
  id: number;
  name: string;
  criteria: Criteria[];
  match_percentage: number;
  overall_score: number;
  image: string;
  latitude: number;
  longitude: number;
  capital: string;
  population: number;
  currency: string;
  language: string;
  long_description: string;
  last_updated: string;
  flag: string;
  features: { feature: string }[];
}

const useCountry = (id: number) => {
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get<Country>(`http://127.0.0.1:8000/api/country/${id}/`);
        setCountry(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [id]);

  return { loading, error, country };
};

export default useCountry;