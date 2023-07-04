import {
  locales,
  defaultLocale,
} from './assets/js/locales'

const deploymentDomain = process.env.NEXTAUTH_URL

export default defineNuxtConfig({

  css: [
    '~/assets/scss/main.scss',
  ],
  
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
    '@nuxtjs/i18n',
    '@sidebase/nuxt-auth'
  ],

  i18n: {
    baseUrl: deploymentDomain,
    locales,
    defaultLocale,
    lazy: true,
    langDir: 'lang',
    strategy: 'prefix',
    detectBrowserLanguage: {
      useCookie: false,
      redirectOnRoot: true,
      alwaysRedirect: true,
    }
  },

  auth: {
    baseUrl: `${deploymentDomain}/api/auth`,
    addDefaultCallbackUrl: true,
    provider: {
      type: 'authjs',
      addDefaultCallbackUrl: true
    },
    globalAppMiddleware: {
      isEnabled: true,
      allow404WithoutAuth: true,
      addDefaultCallbackUrl: true
    },
  }
});
