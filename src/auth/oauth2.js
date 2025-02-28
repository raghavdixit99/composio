import axios from 'axios';

/**
 * OAuth2 Authentication Provider
 * Supports various OAuth2 flows including authorization code and client credentials
 */
export class OAuth2Provider {
  constructor(config) {
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.redirectUri = config.redirectUri;
    this.authorizationEndpoint = config.authorizationEndpoint;
    this.tokenEndpoint = config.tokenEndpoint;
    this.scope = config.scope || 'read';
  }

  /**
   * Generate the authorization URL for the OAuth2 flow
   * @param {Object} options - Additional options
   * @returns {string} The authorization URL
   */
  getAuthorizationUrl(options = {}) {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      response_type: 'code',
      scope: this.scope,
      ...options
    });

    return `${this.authorizationEndpoint}?${params.toString()}`;
  }

  /**
   * Exchange an authorization code for an access token
   * @param {string} code - The authorization code
   * @returns {Promise<Object>} The token response
   */
  async getAccessToken(code) {
    const params = new URLSearchParams({
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: 'authorization_code',
      code,
      redirect_uri: this.redirectUri
    });

    const response = await axios.post(this.tokenEndpoint, params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return response.data;
  }

  /**
   * Refresh an access token using a refresh token
   * @param {string} refreshToken - The refresh token
   * @returns {Promise<Object>} The token response
   */
  async refreshToken(refreshToken) {
    const params = new URLSearchParams({
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    });

    const response = await axios.post(this.tokenEndpoint, params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return response.data;
  }
} 