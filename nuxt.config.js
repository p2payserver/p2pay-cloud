const isDeployed = (
  process.env.AUTH_ORIGIN === 'http://localhost:3000'
  || !process.env.AUTH_ORIGIN
) ? false : true;
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
    provider: {
      type: 'authjs',
      addDefaultCallbackUrl: true
    },
    origin: deploymentDomain,
    baseUrl: `/api/auth`,
    addDefaultCallbackUrl: true,
    globalAppMiddleware: {
      isEnabled: true,
      allow404WithoutAuth: true,
      addDefaultCallbackUrl: true
    },
  },

  nitro: {
    devStorage: {
      db: {
        driver: 'fs',
        base: './foo'
      }
    },
    storage: {
      db: {
        driver: 'github',
        repo: process.env.GITHUB_REPO,
        branch: 'main',
        dir: '/foo',
      }
    },
  }
});
