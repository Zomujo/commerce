import { ApiResponse, Page, Product, QuoteRequest, StrategicVertical, ContactMessage } from '@/types/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

async function fetchHelper<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${res.status} ${res.statusText}`);
  }

  const response: ApiResponse<T> = await res.json();
  return response.data;
}

export const ApiClient = {
  getProducts: async (params?: {
    vertical?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<Page<Product>> => {
    const query = new URLSearchParams();
    if (params?.vertical) query.append('vertical', params.vertical);
    if (params?.search) query.append('search', params.search);
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());

    return fetchHelper<Page<Product>>(`/products?${query.toString()}`);
  },

  getProductById: async (id: string): Promise<Product> => {
    return fetchHelper<Product>(`/products/${id}`);
  },

  getPopularProducts: async (limit: number = 4): Promise<Product[]> => {
    return fetchHelper<Product[]>(`/products/popular?limit=${limit}`);
  },

  getRecentProducts: async (): Promise<Product[]> => {
    return fetchHelper<Product[]>(`/products/recent`);
  },

  getVerticals: async (): Promise<StrategicVertical[]> => {
    // Assuming you have an endpoint for this, referencing VerticalController
    return fetchHelper<StrategicVertical[]>('/verticals');
  },

  submitQuote: async (data: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
    productName?: string;
    message?: string;
  }): Promise<QuoteRequest> => {
    return fetchHelper<QuoteRequest>('/quotes', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  submitContact: async (data: ContactMessage): Promise<void> => {
    return fetchHelper<void>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
