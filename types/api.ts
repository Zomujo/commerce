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

export enum QuoteStatus {
  PENDING = 'PENDING',
  REVIEWED = 'REVIEWED',
  QUOTED = 'QUOTED',
  REJECTED = 'REJECTED'
}

export enum Incoterms {
  FOB = 'FOB',
  CIF = 'CIF',
  CFR = 'CFR',
  EXW = 'EXW'
}

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GHS = 'GHS'
}

export interface QuoteRequest {
  id: string; // UUID
  name: string;
  email: string;
  company: string;
  phone?: string;
  
  // Product Interest
  product?: Product;
  productName?: string;
  vertical?: StrategicVertical;

  // Requirements
  quantity?: string;
  deliveryLocation?: string;
  incoterms?: Incoterms;
  preferredCurrency?: Currency;
  message?: string;

  // Status & Admin
  status: QuoteStatus;
  adminNotes?: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt?: string;
}

export enum ContactSubject {
  QUOTE = 'QUOTE',
  PRODUCT = 'PRODUCT',
  SUPPORT = 'SUPPORT',
  PARTNERSHIP = 'PARTNERSHIP',
  OTHER = 'OTHER',
}

export enum MessageStatus {
  NEW = 'NEW',
  READ = 'READ',
  REPLIED = 'REPLIED',
  ARCHIVED = 'ARCHIVED'
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: ContactSubject;
  message: string;
  
  // Status & Admin
  status: MessageStatus;
  adminNotes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface PlatformStats {
  productCount: string;
  verifiedSuppliers: string;
  countriesServed: string;
  supportAvailability: string;
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
