import { createAuthProvider } from '../auth';

export class ApiClient {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.timeout = config.timeout || 30000;
    this.authProvider = config.auth ? createAuthProvider(config.auth.type, config.auth) : null;
    this.axios = axios.create({
      baseURL: this.baseUrl,
      timeout: this.timeout
    });
    
    // Setup request interceptors for authentication
    this.axios.interceptors.request.use(async (config) => {
      if (!this.authProvider) return config;
      
      if (this.authProvider instanceof OAuth2Provider) {
        const token = await this.getOAuthToken();
        config.headers.Authorization = `Bearer ${token}`;
      } else if (this.authProvider instanceof BasicAuthProvider) {
        const auth = this.authProvider.getAuthHeader();
        config.headers.Authorization = auth;
      }
      
      return config;
    });
  }
  
  async getOAuthToken() {
    // Check if we have a valid token
    if (this.token && this.tokenExpiry > Date.now()) {
      return this.token;
    }
    
    // If we have a refresh token, use it
    if (this.refreshToken) {
      const response = await this.authProvider.refreshToken(this.refreshToken);
      this.setTokenFromResponse(response);
      return this.token;
    }
    
    // Otherwise redirect to authorization
    window.location.href = this.authProvider.getAuthorizationUrl();
    return null;
  }
  
  setTokenFromResponse(response) {
    this.token = response.access_token;
    this.refreshToken = response.refresh_token;
    this.tokenExpiry = Date.now() + (response.expires_in * 1000);
  }
  
  // ... existing code ...
} 