const isDev = process.env.NODE_ENV !== 'production'
const isDeployed = (process.env.CYCLIC_URL) ? true : false
const deploymentDomain = (isDeployed) ? `https://${process.env.CYCLIC_URL}` : 'http://localhost:3000'

export default defineNuxtConfig({

  routeRules: {
    '/**': {
      static: false
    }
  },

  runtimeConfig: {
    nextAuthSecret: process.env.NEXTAUTH_SECRET,
    faunaSecret: process.env.FAUNA_SECRET,
    marangaduUser: process.env.MARANGADU_USER,
    marangaduPassword: process.env.MARANGADU_PASSWORD,
    marangaduHost: process.env.MARANGADU_HOST,
    marangaduPort: process.env.MARANGADU_PORT,
    marangaduFrom: process.env.MARANGADU_FROM,
    public: {
      deploymentDomain
    }
  },

  modules: [
    '@sidebase/nuxt-auth'
  ],

  auth: {
    provider: {
      type: 'authjs'
    },
    baseUrl: `${deploymentDomain}/api/auth`,
    addDefaultCallbackUrl: true,
    globalAppMiddleware: true,
  }
});
