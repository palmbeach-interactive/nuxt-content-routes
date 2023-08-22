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
    detectBrowserLanguage: false, //https://github.com/nuxt-modules/i18n/issues/1632
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
    strategy: 'prefix_except_default',
    vueI18n: './i18n.config.ts',
  },
})
