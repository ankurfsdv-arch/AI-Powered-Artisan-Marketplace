import { projectId, publicAnonKey } from './supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-4763b19b`;

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
}

async function apiCall(endpoint: string, options: ApiOptions = {}) {
  const { method = 'GET', body, headers = {} } = options;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(errorData.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// Artisan API functions
export const artisanApi = {
  get: (id: string) => apiCall(`/artisan/${id}`),
  
  create: (artisanData: any) => apiCall('/artisan', {
    method: 'POST',
    body: artisanData,
  }),
  
  update: (id: string, updates: any) => apiCall(`/artisan/${id}`, {
    method: 'PUT',
    body: updates,
  }),
  
  getProducts: (id: string) => apiCall(`/artisan/${id}/products`),
  
  createProduct: (id: string, productData: any) => apiCall(`/artisan/${id}/products`, {
    method: 'POST',
    body: productData,
  }),
  
  getAnalytics: (id: string) => apiCall(`/artisan/${id}/analytics`),
};

// Product API functions
export const productApi = {
  update: (productId: string, updates: any) => apiCall(`/product/${productId}`, {
    method: 'PUT',
    body: updates,
  }),
  
  delete: (productId: string) => apiCall(`/product/${productId}`, {
    method: 'DELETE',
  }),
};

// User API functions
export const userApi = {
  signup: (userData: any) => apiCall('/signup', {
    method: 'POST',
    body: userData,
  }),
};

// Health check
export const healthCheck = () => apiCall('/health');