/**
 * User API endpoints
 * @param {ApiClient} client - The API client
 */
export function createUserApi(client) {
  return {
    /**
     * Get the currently authenticated user's profile
     * @returns {Promise<Object>} User profile data
     */
    getCurrentUser: async () => {
      const response = await client.get('/api/v2/user/profile');
      return response.data;
    },
    
    /**
     * Update the current user's profile
     * @param {Object} profileData - New profile data
     * @returns {Promise<Object>} Updated user profile
     */
    updateProfile: async (profileData) => {
      const response = await client.put('/api/v2/user/profile', profileData);
      return response.data;
    },
    
    /**
     * Get user permissions
     * @returns {Promise<Array>} User permissions
     */
    getPermissions: async () => {
      const response = await client.get('/api/v2/user/permissions');
      return response.data;
    }
  };
} 