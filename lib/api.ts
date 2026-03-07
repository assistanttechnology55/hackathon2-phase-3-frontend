const API_URL = process.env.NEXT_PUBLIC_API_URL ||
'http://localhost:8000';
function getAuthToken(): string | null {
  return localStorage.getItem('hackathon_auth_token');
}
async function apiRequest<T>(
 endpoint: string,
 options: RequestInit = {}
):Promise<T> {
 const url = `${API_URL}${endpoint}`;
 const token = getAuthToken();
     
 const config: RequestInit = {
  ...options,
  headers: {
   'Content-Type': 'application/json',
  ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  ...options.headers,
  },
};
try {
  const response = await fetch(url, config);
   
 if (!response.ok) {
   const errorText = await response.text();
   console.error('API Error:', response.status, errorText);
   throw new Error(`HTTP ${response.status}: ${errorText ||
'Request failed'}`);
 }
     
return await response.json(); 
} catch (error) {
  console.error('API Request Error:', error);
  throw error;
  }
}
export const chatApi = {
  async sendMessage(userId: string, conversationId: number | 
null, message: string) {
 return apiRequest(`/api/${userId}/chat`, {
   method: 'POST',
   body: JSON.stringify({
     conversation_id: conversationId,
     message,
    }),
   });
  },
 };
export const authApi = {
  async login(email: string, password: string) {
   return apiRequest(`/api/auth/login`, {
     method: 'POST',
     body: JSON.stringify({ email, password }),
  });
},
           
async register(email: string, password: string, name?: string
){
return apiRequest(`/api/auth/signup`, {
  method: 'POST',
  body: JSON.stringify({
   name:name ||email.split('@')[0],
   email,
   password,}),
 });
  },
async logout() {
  return apiRequest(`/api/auth/logout`, {
    method: 'POST',
 });
},
};
export { API_URL, apiRequest };
