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
  vertical?: StrategicVertical;
  verticalName?: string;
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
  productId?: string;
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

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  email: string;
  fullName: string;
  role: 'ADMIN' | 'SALES' | 'SUPPLIER';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export type VerificationStatus = 'PENDING' | 'VERIFIED' | 'SUSPENDED';

export interface Verification {
  siteAuditPassed: boolean;
  siteAuditDate?: string;
  financialSolvencyCheck: boolean;
  esgCompliance: boolean;
  documentsVerified: boolean;
  operationalCapacityVerified: boolean;
}

export interface SupplierSummary {
  id: string;
  companyName: string;
  country: string;
  contactEmail: string;
  contactPhone?: string;
  verificationStatus: VerificationStatus;
  userId: string;
  createdAt: string;
  updatedAt?: string;
}

export interface SupplierProfile {
  id: string;
  companyName: string;
  country: string;
  contactEmail: string;
  contactPhone?: string;
  description?: string;
  website?: string;
  logoUrl?: string;
  certifications: string[];
  verification: Verification;
  verificationStatus: VerificationStatus;
  userId: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateSupplierRequest {
  companyName: string;
  country: string;
  contactEmail: string;
  contactPhone?: string;
  description?: string;
  website?: string;
  logoUrl?: string;
  certifications?: string[];
}

export interface UpdateSupplierRequest {
  companyName?: string;
  country?: string;
  contactEmail?: string;
  contactPhone?: string;
  description?: string;
  website?: string;
  logoUrl?: string;
  certifications?: string[];
}

export interface SupplierProductResponse {
  id: string;
  name: string;
  description?: string;
  verticalId?: string;
  verticalName?: string;
  originCountry: string;
  originSite?: string;
  purityGrade: string;
  certifications: string[];
  qaPartner?: string;
  specifications: Record<string, string>;
  image: string;
  badge?: string;
  createdAt: string;
}

export interface CreateProductRequest {
  name: string;
  verticalId: string;
  description?: string;
  originCountry: string;
  originSite?: string;
  purityGrade: string;
  certifications?: string[];
  coaUrl?: string;
  qaPartner?: string;
  specifications?: Record<string, string>;
  image: string;
  badge?: string;
}

export interface UpdateProductRequest {
  name?: string;
  verticalId?: string;
  description?: string;
  originCountry?: string;
  originSite?: string;
  purityGrade?: string;
  certifications?: string[];
  coaUrl?: string;
  qaPartner?: string;
  specifications?: Record<string, string>;
  image?: string;
  badge?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface CoaTestResult {
  parameter: string;
  value: string;
  specification?: string;
  status: string;
}

export interface Coa {
  id: string;
  productId: string;
  batchNumber: string;
  qaPartner: string;
  analysisDate: string;
  expiryDate?: string;
  results: CoaTestResult[];
  documentUrl: string;
  digitalSignature?: string;
  createdAt: string;
}

export interface CreateCoaRequest {
  batchNumber: string;
  qaPartner: string;
  analysisDate: string;
  expiryDate?: string;
  results: CoaTestResult[];
  documentUrl: string;
  digitalSignature?: string;
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
