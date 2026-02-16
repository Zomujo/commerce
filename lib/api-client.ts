import { ApiResponse, Page, Product, QuoteRequest, StrategicVertical, ContactMessage, PlatformStats, QuoteStatus, MessageStatus } from '@/types/api';

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
    quantity?: string;
    deliveryLocation?: string;
    incoterms?: string;
    preferredCurrency?: string;
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

  getStats: async (): Promise<PlatformStats> => {
    return fetchHelper<PlatformStats>('/stats');
  },

  // Admin - Quotes
  getQuotes: async (status?: QuoteStatus, page = 0, limit = 20): Promise<Page<QuoteRequest>> => {
    const statusParam = status ? `&status=${status}` : '';
    return fetchHelper<Page<QuoteRequest>>(`/admin/quotes?page=${page}&limit=${limit}${statusParam}`);
  },

  getQuoteById: async (id: string): Promise<QuoteRequest> => {
    return fetchHelper<QuoteRequest>(`/admin/quotes/${id}`);
  },

  updateQuoteStatus: async (id: string, status: QuoteStatus, note?: string): Promise<QuoteRequest> => {
    return fetchHelper<QuoteRequest>(`/admin/quotes/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, note }),
    });
  },

  addQuoteNote: async (id: string, note: string): Promise<QuoteRequest> => {
    return fetchHelper<QuoteRequest>(`/admin/quotes/${id}/note`, {
      method: 'PATCH',
      body: note, // Controller expects @RequestBody String
      headers: { 'Content-Type': 'text/plain' }, // Force text/plain if needed, but fetchHelper might override. 
      // Actually fetchHelper defaults to application/json. 
      // If backend accepts JSON string, JSON.stringify(note) is correct.
      // If backend expects raw text, we might need a distinct helper or override.
      // Let's assume JSON string for now as it's safer with valid JSON.
    });
  },

  assignQuote: async (id: string, email: string): Promise<QuoteRequest> => {
    return fetchHelper<QuoteRequest>(`/admin/quotes/${id}/assign`, {
      method: 'PATCH',
      body: email, 
    });
  },

  // Admin - Contacts
  getContacts: async (status?: MessageStatus, page = 0, limit = 20): Promise<Page<ContactMessage>> => {
    const statusParam = status ? `&status=${status}` : '';
    return fetchHelper<Page<ContactMessage>>(`/admin/contacts?page=${page}&limit=${limit}${statusParam}`);
  },

  getContactById: async (id: string): Promise<ContactMessage> => {
    return fetchHelper<ContactMessage>(`/admin/contacts/${id}`);
  },

  updateContactStatus: async (id: string, status: MessageStatus, note?: string): Promise<ContactMessage> => {
    return fetchHelper<ContactMessage>(`/admin/contacts/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, note }),
    });
  },

  addContactNote: async (id: string, note: string): Promise<ContactMessage> => {
    return fetchHelper<ContactMessage>(`/admin/contacts/${id}/note`, {
      method: 'PATCH',
      body: note,
    });
  },
};
