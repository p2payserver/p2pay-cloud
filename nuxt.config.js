const isDev = process.env.NODE_ENV !== 'production'
const isDeployed = (process.env.DEPLOYMENT_DOMAIN) ? true : false
const deploymentDomain = (isDeployed) ? `https://${process.env.DEPLOYMENT_DOMAIN}` : 'http://localhost:3000'

export default defineNuxtConfig({

  runtimeConfig: {
    nextAuthSecret: process.env.NEXTAUTH_SECRET,
    faunaSecret: process.env.FAUNA_SECRET,
    marangaduUser: process.env.MARANGADU_USER,
    marangaduPassword: process.env.MARANGADU_PASSWORD,
    marangaduHost: process.env.MARANGADU_HOST,
    marangaduPort: process.env.MARANGADU_PORT,
    marangaduFrom: process.env.MARANGADU_FROM,
    public: {
    }
  },

  modules: [
    '@sidebase/nuxt-auth'
  ],

  auth: {
    origin: deploymentDomain,
    globalAppMiddleware: true
  }
});
