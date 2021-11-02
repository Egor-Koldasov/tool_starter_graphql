const config = {
  graphqlPort: parseInt(String(process.env.GRAPHQL_PORT)) || 4000,
  // auth
  cookiesSecret: process.env.COOKIE_SECRET || '37e87192-1de4-4595-b317-cdf0ead367a7',
  authCookieName: process.env.AUTH_COOKIE_NAME || 'imhucauen',
  authSalt: process.env.AUTH_SALT || 'iuquoigiungcoiue',
  uuidNamespace: process.env.UUID_NAMESPACE || '4caeabca-8f4d-4488-8388-ae7fe46bd59e',
};
export default config;