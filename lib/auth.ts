// Authentication utilities using Better Auth
import { authApi } from './api';

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface Session {
  user: User;
  token?: string;
}

// Storage keys
const STORAGE_KEYS = {
  TOKEN: 'hackathon_auth_token',
  USER: 'hackathon_user',
};

// Session management
export const auth = {
  async login(email: string, password: string): Promise<Session> {
    try {
      const response = await authApi.login(email, password);
      if (response.token) {
        localStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
      }
      if (response.user) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
      }
      return { user: response.user, token: response.token };
    } catch (error) {
      throw new Error('Login failed. Please check your credentials.');
    }
  },

  async register(email: string, password: string, name?: string): Promise<Session> {
    try {
      const response = await authApi.register(email, password, name);
      if (response.token) {
        localStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
      }
      if (response.user) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
      }
      return { user: response.user, token: response.token };
    } catch (error) {
      throw new Error('Registration failed. Please try again.');
    }
  },

  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  getSession(): Session | null {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        return { user, token };
      } catch {
        return null;
      }
    }
    return null;
  },

  isAuthenticated(): boolean {
    return this.getSession() !== null;
  },

  getToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  getUser(): User | null {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  },
};

// Get current user ID (for API calls)
export function getCurrentUserId(): string | null {
  const user = auth.getUser();
  return user?.id || null;
}
