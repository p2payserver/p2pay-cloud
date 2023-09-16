const isDeployed = (
  process.env.AUTH_ORIGIN === 'http://localhost:3000'
  || !process.env.AUTH_ORIGIN
) ? false : true;
const deploymentDomain = process.env.AUTH_ORIGIN || 'http://localhost:3000';

import {
  locales,
  defaultLocale,
  excludedRoutes
} from './assets/js/locales';

export default defineNuxtConfig({

  app: {
    head: {
      title: 'AnyBTCPay',
      meta: [
        {
          charset: 'utf-8'
        },
        {
          id: "viewport",
          name: "viewport",
          content: "width=device-width, initial-scale=1"
        },
        {
          id: 'googlebot',
          name: 'googlebot',
          content: 'notranslate'
        },
        {
          id: 'og:type',
          name: 'og:type',
          content: 'website'
        },
        {
          id: 'og:url',
          name: 'og:url',
          content: deploymentDomain
        },
        {
          id: 'og:site_name',
          name: 'og:site_name',
          content: 'AnyBTCPay'
        },
        {
          id: 'og:image',
          name: 'og:image',
          itemprop: 'image primaryImageOfPage',
          content: `${deploymentDomain}/favicon/favicon.png`
        },
        {
          id: 'twitter:card',
          name: 'twitter:card',
          content: 'summary'
        },
        {
          id: 'twitter:image',
          name: 'twitter:image',
          itemprop: 'image primaryImageOfPage',
          content: `${deploymentDomain}/favicon/favicon.png`
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon/favicon.ico'
        },
      ]
    },
  },
  
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

  css: [
    '~/assets/scss/main.scss',
    '~/assets/scss/mdi.scss'
  ],

  components: [{
    path: '~/components',
    pathPrefix: false,
    global: true
  }],

  modules: [
    '@nuxt/content',
    'nuxt-simple-robots',
    'nuxt-simple-sitemap',
    '@nuxtjs/i18n',
    '@sidebase/nuxt-auth',
    'nuxt-delay-hydration'
  ],

  robots: {
    disallow: excludedRoutes.map(route => route.replace('/**', '')),
    // sitemap: `${deploymentDomain}/sitemap_index.xml`
  },

  sitemap: {
    xsl: false,
    exclude: excludedRoutes,
    autoI18n: true
  },

  i18n: {
    baseUrl: deploymentDomain,
    locales,
    defaultLocale,
    lazy: true,
    langDir: 'lang',
    strategy: 'prefix',
    detectBrowserLanguage: {
      useCookie: false,
      // Those 2 settings are silly
      // but to work the redirect set in the index.vue page the are needed
      // actual strategy is that it redirects only on home page
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

  delayHydration: {
    mode: 'init',
    exclude: excludedRoutes,
    debug: process.env.NODE_ENV === 'development'
  },

  nitro: {
    devStorage: {
      lang: {
        driver: 'fs',
        base: './lang'
      },
      content: {
        driver: 'fs',
        base: './content'
      }
    },
    storage: {
      lang: {
        driver:'github',
        repo: process.env.GITHUB_REPO,
        token: process.env.GITHUB_TOKEN,
        branch: 'main',
        dir: '/lang',
      },
      content: {
        driver: 'github',
        repo: process.env.GITHUB_REPO,
        token: process.env.GITHUB_TOKEN,
        branch: 'main',
        dir: '/content',
      }
    },
  },
});
