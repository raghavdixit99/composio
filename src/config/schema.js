const authSchema = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['none', 'basic', 'oauth2'],
      default: 'none'
    },
    // Basic auth options
    username: { type: 'string' },
    password: { type: 'string' },
    // OAuth2 options
    clientId: { type: 'string' },
    clientSecret: { type: 'string' },
    redirectUri: { type: 'string' },
    authorizationEndpoint: { type: 'string' },
    tokenEndpoint: { type: 'string' },
    scope: { type: 'string' }
  },
  required: ['type'],
  additionalProperties: false,
  allOf: [
    {
      if: { properties: { type: { const: 'basic' } } },
      then: { required: ['username', 'password'] }
    },
    {
      if: { properties: { type: { const: 'oauth2' } } },
      then: { required: ['clientId', 'clientSecret', 'redirectUri', 'authorizationEndpoint', 'tokenEndpoint'] }
    }
  ]
}; 