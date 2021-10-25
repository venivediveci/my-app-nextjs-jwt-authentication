module.exports = {
  reactStrictMode: true,
  eslint: ['pages/', 'components', 'lib', 'utils', 'helpers', 'services'],

  serverRuntimeConfig: {
    secret:
      'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING',
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api' // development api
        : 'http://localhost:3000/api', // production api
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false,
      }
    }

    return config
  },
}
