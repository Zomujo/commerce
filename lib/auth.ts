import { AuthResponse } from '@/types/api';

const ACCESS_TOKEN_KEY = 'wg_access_token';
const REFRESH_TOKEN_KEY = 'wg_refresh_token';
const USER_KEY = 'wg_user';

type StoredUser = {
  email: string;
  fullName: string;
  role: 'ADMIN' | 'SALES' | 'SUPPLIER';
};

export const Auth = {
  setTokens(auth: AuthResponse): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, auth.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, auth.refreshToken);
    localStorage.setItem(USER_KEY, JSON.stringify({ email: auth.email, fullName: auth.fullName, role: auth.role }));
  },

  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  getUser(): StoredUser | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw) as StoredUser; } catch { return null; }
  },

  getRole(): string | null {
    return this.getUser()?.role ?? null;
  },

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  },

  getAuthHeader(): Record<string, string> {
    const token = this.getAccessToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

  updateAccessToken(accessToken: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  },

  clear(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};
