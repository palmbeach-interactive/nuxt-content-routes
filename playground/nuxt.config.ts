import { resolve } from 'path'

export default defineNuxtConfig({
  modules: ['../src/module', '@nuxt/content'],
  devtools: { enabled: true },
  content: {
    documentDriven: false,
    locales: ['de', 'en'],
    defaultLocale: 'de',
    // navigation: {
    //   fields: ['author', 'publishedAt', 'navigation', 'description', 'head']
    // },
    sources: {
      content: {
        driver: 'fs',
        base: resolve(__dirname, 'content'),
      },
    },
  },
})
