// src/api/calculateMatchAPI.tsx
import axios from 'axios';

// Backend URL'si
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ID Mapping (Kriterlerin Backend'deki ID'leriyle eşleştirilmesi)
const criteriaMapping: Record<string, string> = {
  "Security & Crime Rates": "1",
  "Cost of Living": "2",
  "Climate & Weather Conditions": "3",
  "Health Services & Quality": "4",
  "Accommodation Options & Cost": "5",
  "Cultural Richness": "6",
  "Education Quality": "7",
  "Environmental Factors": "8",
  "Food Culture": "9",
  "Internet Infrastructure": "10",
  "Job Opportunities": "11",
  "Language Barrier": "12",
  "Local Hospitality": "13",
  "Natural Beauties": "14",
  "Nightlife & Entertainment": "15",
  "Property Acquisition Ease": "16",
  "Religious & Cultural Harmony": "17",
  "Tax Policies": "18",
  "Transportation & Infrastructure": "19",
  "Visa Ease & Immigration": "20",
};

// Kriterleri ID formatına dönüştürme fonksiyonu
const transformCriteria = (criteria: Record<string, number>): Record<string, number> => {
  const transformed: Record<string, number> = {};
  for (const [key, value] of Object.entries(criteria)) {
    if (criteriaMapping[key]) {
      transformed[criteriaMapping[key]] = value; // Kriter adını ID ile değiştir
    }
  }
  return transformed;
};

// API Çağrısı
export const fetchMatchingCountries = async (
  criteria: Record<string, number>,
  page: number = 1
) => {
  const API_URL = `${BASE_URL}/api/calculate-match/`;

  const requestBody = {
    criteria: transformCriteria(criteria), // Kriterleri ID'ye dönüştürerek gönder
    page, // Sayfa numarasını ekle
  };

  console.log("Axios Gönderilen Veri:", requestBody); // Gönderilen veriyi yazdır

  try {
    const response = await axios.post(API_URL, requestBody, {
      headers: {
        "Content-Type": "application/json", // Backend'in beklediği başlık
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 429) {
      throw new Error('Çok fazla istek gönderildi. Lütfen biraz bekleyin.');
    }
    console.error("Axios Hatası:", error);
    throw new Error(error.response?.data?.detail || 'Veriler yüklenemedi');
  }
};