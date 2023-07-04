
const isDeployed = (process.env.NEXTAUTH_URL) ? true : false;

import {
  locales,
  defaultLocale,
} from './assets/js/locales';

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
      isDeployed,
      deploymentDomain : process.env.NEXTAUTH_URL || 'http://localhost:3000'
    },
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
  },

  debug: (isDeployed) ? true : false
});
