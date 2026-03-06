export const auth = {
async login(email: string, password: string): Promise<Session
  > {
try {
  const response = await authApi.login(email, password);
 if (response.token) {
 localStorage.setItem('hackathon_auth_token', response.
  token);
   }
  if (response.user) {
    localStorage.setItem('hackathon_user', JSON.stringify
   (response.user));
  }
   return { user: response.user, token: response.token };
 } catch (error) {
  throw new Error('Login failed. Please check your
   credentials.');
  }
  },
  async register(email: string, password: string, name?: string
 ):Promise<Session> {
    try {
    const response = await authApi.register(email, password,
     name);
if (response.token) {
     localStorage.setItem('hackathon_auth_token', response.
      token);
    }
if (response.user) {
    localStorage.setItem('hackathon_user', JSON.stringify
     (response.user));
         }
     return { user: response.user, token: response.token };
   } catch (error) {
     throw new Error('Registration failed. Please try again.'
  );
  }
 },
 // ... rest of the file
};
