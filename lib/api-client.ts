import { ApiResponse, AuthResponse, LoginRequest, Page, Product, QuoteRequest, RefreshTokenRequest, RegisterRequest, StrategicVertical, ContactMessage, PlatformStats, QuoteStatus, MessageStatus, SupplierSummary, SupplierProfile, CreateSupplierRequest, UpdateSupplierRequest, SupplierProductResponse, CreateProductRequest, VerificationStatus, Coa, CreateCoaRequest } from '@/types/api';
import { Auth } from './auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

async function fetchHelper<T>(endpoint: string, options?: RequestInit, token?: string): Promise<T> {
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...authHeader,
      ...options?.headers,
    },
  });

  if (res.status === 401 && token) {
    // Attempt silent token refresh
    const refreshToken = Auth.getRefreshToken();
    if (refreshToken) {
      try {
        const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        });
        if (refreshRes.ok) {
          const refreshData: ApiResponse<AuthResponse> = await refreshRes.json();
          Auth.updateAccessToken(refreshData.data.accessToken);
          // Retry original request with new token
          const retryRes = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${refreshData.data.accessToken}`,
              ...options?.headers,
            },
          });
          if (retryRes.ok) {
            const retryData: ApiResponse<T> = await retryRes.json();
            return retryData.data;
          }
        }
      } catch {
        // refresh failed — fall through to error
      }
    }
    const role = Auth.getRole();
    Auth.clear();
    window.location.href = role === 'SUPPLIER' ? '/supplier/login' : '/admin/login';
    throw new Error('Session expired. Please log in again.');
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${res.status} ${res.statusText}`);
  }

  const response: ApiResponse<T> = await res.json();
  return response.data;
}

async function fetchAuthEndpoint<T>(endpoint: string, options?: RequestInit): Promise<T> {
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
  // Auth
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    return fetchAuthEndpoint<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    return fetchAuthEndpoint<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  refreshToken: async (data: RefreshTokenRequest): Promise<AuthResponse> => {
    return fetchAuthEndpoint<AuthResponse>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  logout: async (): Promise<void> => {
    const token = Auth.getAccessToken();
    await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }).catch(() => {});
  },

  // Public
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
    return fetchHelper<StrategicVertical[]>('/verticals');
  },

  getVerticalById: async (id: string): Promise<StrategicVertical> => {
    return fetchHelper<StrategicVertical>(`/verticals/${id}`);
  },

  getPublicQuoteById: async (id: string): Promise<QuoteRequest> => {
    return fetchHelper<QuoteRequest>(`/quotes/${id}`);
  },

  submitQuote: async (data: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
    productId?: string;
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
    return fetchHelper<Page<QuoteRequest>>(`/admin/quotes?page=${page}&limit=${limit}${statusParam}`, {}, Auth.getAccessToken() ?? undefined);
  },

  getQuoteById: async (id: string): Promise<QuoteRequest> => {
    return fetchHelper<QuoteRequest>(`/admin/quotes/${id}`, {}, Auth.getAccessToken() ?? undefined);
  },

  updateQuoteStatus: async (id: string, status: QuoteStatus, note?: string): Promise<QuoteRequest> => {
    return fetchHelper<QuoteRequest>(`/admin/quotes/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, note }),
    }, Auth.getAccessToken() ?? undefined);
  },

  addQuoteNote: async (id: string, note: string): Promise<QuoteRequest> => {
    return fetchHelper<QuoteRequest>(`/admin/quotes/${id}/note`, {
      method: 'PATCH',
      body: note,
      headers: { 'Content-Type': 'text/plain' },
    }, Auth.getAccessToken() ?? undefined);
  },

  assignQuote: async (id: string, email: string): Promise<QuoteRequest> => {
    return fetchHelper<QuoteRequest>(`/admin/quotes/${id}/assign`, {
      method: 'PATCH',
      body: email,
    }, Auth.getAccessToken() ?? undefined);
  },

  // Admin - Contacts
  getContacts: async (status?: MessageStatus, page = 0, limit = 20): Promise<Page<ContactMessage>> => {
    const statusParam = status ? `&status=${status}` : '';
    return fetchHelper<Page<ContactMessage>>(`/admin/contacts?page=${page}&limit=${limit}${statusParam}`, {}, Auth.getAccessToken() ?? undefined);
  },

  getContactById: async (id: string): Promise<ContactMessage> => {
    return fetchHelper<ContactMessage>(`/admin/contacts/${id}`, {}, Auth.getAccessToken() ?? undefined);
  },

  updateContactStatus: async (id: string, status: MessageStatus, note?: string): Promise<ContactMessage> => {
    return fetchHelper<ContactMessage>(`/admin/contacts/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, note }),
    }, Auth.getAccessToken() ?? undefined);
  },

  addContactNote: async (id: string, note: string): Promise<ContactMessage> => {
    return fetchHelper<ContactMessage>(`/admin/contacts/${id}/note`, {
      method: 'PATCH',
      body: note,
    }, Auth.getAccessToken() ?? undefined);
  },

  // Files
  getUploadUrl: async (filename: string, contentType: string): Promise<{ uploadUrl: string; fileUrl: string }> => {
    const token = Auth.getAccessToken();
    const res = await fetch(`${API_URL}/files/upload-url?filename=${encodeURIComponent(filename)}&contentType=${encodeURIComponent(contentType)}`, {
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    });
    if (!res.ok) throw new Error(`Upload URL error: ${res.status}`);
    return res.json();
  },

  viewFile: async (name: string): Promise<string> => {
    const token = Auth.getAccessToken();
    const res = await fetch(`${API_URL}/files/view/${encodeURIComponent(name)}`, {
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    });
    if (!res.ok) throw new Error(`View file error: ${res.status}`);
    return res.text();
  },

  getDownloadUrl: (name: string): string => {
    return `${API_URL}/files/download/${encodeURIComponent(name)}`;
  },

  // Public - CoA
  getProductCoas: async (productId: string): Promise<Coa[]> => {
    return fetchHelper<Coa[]>(`/products/${productId}/coa`);
  },

  getProductCoaById: async (productId: string, id: string): Promise<Coa> => {
    return fetchHelper<Coa>(`/products/${productId}/coa/${id}`);
  },

  // Supplier
  getMySuppliers: async (): Promise<SupplierSummary[]> => {
    return fetchHelper<SupplierSummary[]>('/suppliers', {}, Auth.getAccessToken() ?? undefined);
  },

  getSupplierById: async (id: string): Promise<SupplierProfile> => {
    return fetchHelper<SupplierProfile>(`/suppliers/${id}`, {}, Auth.getAccessToken() ?? undefined);
  },

  createSupplier: async (data: CreateSupplierRequest): Promise<SupplierProfile> => {
    return fetchHelper<SupplierProfile>('/suppliers', {
      method: 'POST',
      body: JSON.stringify(data),
    }, Auth.getAccessToken() ?? undefined);
  },

  updateSupplier: async (id: string, data: UpdateSupplierRequest): Promise<SupplierProfile> => {
    return fetchHelper<SupplierProfile>(`/suppliers/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }, Auth.getAccessToken() ?? undefined);
  },

  getSupplierProducts: async (supplierId: string): Promise<SupplierProductResponse[]> => {
    return fetchHelper<SupplierProductResponse[]>(`/suppliers/${supplierId}/products`, {}, Auth.getAccessToken() ?? undefined);
  },

  getSupplierProductById: async (id: string): Promise<SupplierProductResponse> => {
    return fetchHelper<SupplierProductResponse>(`/suppliers/products/${id}`, {}, Auth.getAccessToken() ?? undefined);
  },

  createSupplierProduct: async (supplierId: string, data: CreateProductRequest): Promise<SupplierProductResponse> => {
    return fetchHelper<SupplierProductResponse>(`/suppliers/${supplierId}/products`, {
      method: 'POST',
      body: JSON.stringify(data),
    }, Auth.getAccessToken() ?? undefined);
  },

  updateSupplierProduct: async (id: string, data: Partial<CreateProductRequest>): Promise<SupplierProductResponse> => {
    return fetchHelper<SupplierProductResponse>(`/suppliers/products/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }, Auth.getAccessToken() ?? undefined);
  },

  createSupplierProductCoa: async (supplierId: string, productId: string, data: CreateCoaRequest): Promise<Coa> => {
    return fetchHelper<Coa>(`/suppliers/${supplierId}/products/${productId}/coa`, {
      method: 'POST',
      body: JSON.stringify(data),
    }, Auth.getAccessToken() ?? undefined);
  },

  deleteSupplierCoa: async (supplierId: string, id: string): Promise<void> => {
    return fetchHelper<void>(`/suppliers/${supplierId}/coa/${id}`, {
      method: 'DELETE',
    }, Auth.getAccessToken() ?? undefined);
  },

  getAdminSuppliersByEmail: async (email: string): Promise<SupplierProfile> => {
    return fetchHelper<SupplierProfile>(`/admin/suppliers/by-email?email=${encodeURIComponent(email)}`, {}, Auth.getAccessToken() ?? undefined);
  },

  // Admin - Suppliers
  getAdminSuppliers: async (status?: VerificationStatus, page = 0, limit = 20): Promise<Page<SupplierSummary>> => {
    const statusParam = status ? `&status=${status}` : '';
    return fetchHelper<Page<SupplierSummary>>(`/admin/suppliers?page=${page}&limit=${limit}${statusParam}`, {}, Auth.getAccessToken() ?? undefined);
  },

  getAdminSupplierById: async (id: string): Promise<SupplierProfile> => {
    return fetchHelper<SupplierProfile>(`/admin/suppliers/${id}`, {}, Auth.getAccessToken() ?? undefined);
  },

  updateSupplierStatus: async (id: string, status: VerificationStatus): Promise<SupplierProfile> => {
    return fetchHelper<SupplierProfile>(`/admin/suppliers/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }, Auth.getAccessToken() ?? undefined);
  },
};
