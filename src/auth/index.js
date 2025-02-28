import { BasicAuthProvider } from './basic-auth';
import { OAuth2Provider } from './oauth2';

/**
 * Factory function to create appropriate auth provider
 * @param {string} type - The type of authentication
 * @param {Object} config - Configuration for the provider
 * @returns {Object} The authentication provider
 */
export function createAuthProvider(type, config) {
  switch (type) {
    case 'basic':
      return new BasicAuthProvider(config);
    case 'oauth2':
      return new OAuth2Provider(config);
    default:
      throw new Error(`Unsupported authentication type: ${type}`);
  }
}

// Export all providers
export { BasicAuthProvider, OAuth2Provider }; 