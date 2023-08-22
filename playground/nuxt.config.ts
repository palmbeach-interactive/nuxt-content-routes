import { resolve } from 'path'

export default defineNuxtConfig({
  modules: [
    '../src/module', 
    '@nuxt/content',
    '@nuxtjs/i18n',
  ],
  devtools: { enabled: true },
  content: {
    documentDriven: false,
    locales: ['en', 'de'],
    defaultLocale: 'en',
    sources: {
      content: {
        driver: 'fs',
        base: resolve(__dirname, 'content'),
      },
    },
  },
  i18n: {
    detectBrowserLanguage: false, 
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        name: 'English',
        iso: 'en-US',
        file: 'en.ts',
      },
      {
        code: 'de',
        name: 'Deutsch',
        iso: 'de-CH',
        file: 'de.ts',
      },
    ],
    lazy: true,
    langDir: './locales/',
    strategy: 'prefix_except_default', //https://i18n.nuxtjs.org/strategies/ (only prefix_except_default|prefix is supported with nurxt-content-routes)
    vueI18n: './i18n.config.ts',
  },
})
