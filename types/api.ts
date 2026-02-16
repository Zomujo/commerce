export interface StrategicVertical {
  id: string; // critical-minerals, etc.
  name: string;
  tagline?: string;
  description?: string;
  edge?: string;
  icon?: string;
  productCount?: number;
}

export interface Product {
  id: string; // UUID
  name: string;
  vertical: StrategicVertical;
  description?: string;
  originCountry: string;
  originSite?: string;
  traceabilityHash?: string;
  purityGrade: string;
  certifications: string[];
  coaUrl?: string;
  qaPartner?: string;
  specifications?: Record<string, string>; // Map<String, String>
  image: string;
  badge?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface QuoteRequest {
  id: string; // UUID
  fullName: string;
  email: string;
  companyName: string;
  phoneNumber?: string;
  details: string;
  status: 'PENDING' | 'REVIEWED' | 'QUOTED' | 'REJECTED';
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface Page<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  empty: boolean;
}
