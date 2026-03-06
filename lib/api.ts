1 // API Configuration for Hackathon Phase 3
      2 // Connects frontend to Railway backend
       const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      
      // Generic API request handler
      async function apiRequest<T>(
        endpoint: string,
        options: RequestInit = {}
      ): Promise<T> {
const  url = `${API_URL}${endpoint}`;
const  config: RequestInit = {
  ... options,
  headers: {
   'Content-Type': 'application/json',
     ...options.headers,
  },
};
  
try {
  console.log('API Request:', url, config);
  const response = await fetch(url, config);
  console.log('API Response status:', response.status);
if (!response.ok) {
  const errorText = await response.text();
  console.error('API Error:', errorText)   
  throw new Error(`HTTP ${response.status}: ${errorText || 'Request failed'}`);
     }
   const data = await response.json();
   console.log('API Response data:', data);
   return data;
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
     
async getConversationHistory(userId: string, conversationId: number) 
 return apiRequest<any[]>(`/api/${userId}/conversations/${conversationId}`);
 },

async getConversations(userId: string) {
  return apiRequest<any[]>(`/api/${userId}/conversations`);
   },
 };
    
// Auth API functions
     export const authApi = {
     async login(email: string, password: string) {
       return apiRequest<{ token: string; user: any }>(`/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
     });
},

   async register(email: string, password: string, name?: string) {
    return apiRequest<{ token: string; user: any }>(`/api/auth/register`, {
     method: 'POST',
     body: JSON.stringify({ email, password, name }),
  });
},
async logout() {
      return apiRequest<void>(`/api/auth/logout`, {
   method: 'POST',
     });
    },
  
  async getSession() {
  return apiRequest<{ user: any } | null>(`/api/auth/session`);
     },
    };     
  export { API_URL, apiRequest };
