
const isDeployed = (process.env.AUTH_ORIGIN) ? true : false;
const deploymentDomain = process.env.AUTH_ORIGIN || 'http://localhost:3000';

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
    platformAdmins: process.env.PLATFORM_ADMINS.split(','),
    public: {
      isDeployed,
      deploymentDomain
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
    // https://sidebase.io/nuxt-auth/v0.6/configuration/nuxt-auth-handler#nuxtauthhandler
    origin: `${deploymentDomain}`,
    // https://sidebase.io/nuxt-auth/v0.6/configuration/nuxt-config#module-nuxtconfigts
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

  debug: (isDeployed) ? false : true
});
