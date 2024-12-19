// src/api.js

import axios from 'axios';

// Token'ı al ve axios instance'ına ekle
const fetchToken = async () => {
  const uniqueId = getUniqueId();
  try {
    const response = await axios.post('/api/get-token/', { unique_id: uniqueId });
    const token = response.data.token;
    localStorage.setItem('apiToken', token);
    return token;
  } catch (error) {
    console.error('Token alınırken hata oluştu:', error);
  }
};

// Axios instance oluşturma
const apiClient = axios.create();

apiClient.interceptors.request.use(async (config) => {
  let token = localStorage.getItem('apiToken');
  if (!token) {
    token = await fetchToken();
  }
  if (token) {
    config.headers['Authorization']
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;