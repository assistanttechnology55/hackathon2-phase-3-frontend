// API Configuration for Hackathon Phase 3
// Connects frontend to Railway backend

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// API endpoints
const ENDPOINTS = {
  CHAT: (userId: string) => `/api/${userId}/chat`,
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    SESSION: '/api/auth/session',
  },
};

// Generic API request handler
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

// Chat API functions
export const chatApi = {
  async sendMessage(userId: string, conversationId: number | null, message: string) {
    return apiRequest<{
      conversation_id: number;
      response: string;
      tool_calls: any[];
    }>(`/api/${userId}/chat`, {
      method: 'POST',
      body: JSON.stringify({
        conversation_id: conversationId,
        message,
      }),
    });
  },

  async getConversationHistory(userId: string, conversationId: number) {
    return apiRequest<any[]>(`/api/${userId}/conversations/${conversationId}`);
  },

  async getConversations(userId: string) {
    return apiRequest<any[]>(`/api/${userId}/conversations`);
  },
};

// Auth API functions
export const authApi = {
  async login(email: string, password: string) {
    return apiRequest<{ token: string; user: any }>(ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  async register(email: string, password: string, name?: string) {
    return apiRequest<{ token: string; user: any }>(ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  },

  async logout() {
    return apiRequest<void>(ENDPOINTS.AUTH.LOGOUT, {
      method: 'POST',
    });
  },

  async getSession() {
    return apiRequest<{ user: any } | null>(ENDPOINTS.AUTH.SESSION);
  },
};

export { API_URL, apiRequest };
