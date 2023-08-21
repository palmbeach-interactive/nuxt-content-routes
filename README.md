# Nuxt Content Routes

[![npm version][npm-version-src]][npm-version-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

A small add-on for [Nuxt Content](https://content.nuxtjs.org). Might become obsolete with upcoming Nuxt Content releases.

Routes are generated during build from the Nuxt Content directory when the `documentDriven` option cannot be used. For example when nuxt content and static pages are mixed or a specific i18n strategy is needed.

Zero impact on runtime performance.

```TypeScript
//Only executed on build via nuxt generate / nuxt build
const paths = await listFilesInDirectory(
  directory,
  prefix,
  i18nDefaultLocale,
  i18nStrategy,
)

nuxt.hook('nitro:config', (nitroConfig) => {
  if (nitroConfig && nitroConfig.prerender) {
    nitroConfig.prerender.routes = nitroConfig.prerender.routes || []
    nitroConfig.prerender.routes.push(...paths)
  }
})
```

- [✨ &nbsp;Release Notes](/CHANGELOG.md)

## Features

- &nbsp;Generates all routes from nested directories
- &nbsp;Generate clean path names (no order prefixes, no file extensions, no Capital letters)
- &nbsp;i18n support (locale prefix, strategy: 'prefix_except_default')

## Quick Setup

1. Add `@palmbeach/nuxt-content-routes` dependency to your project

```bash
# Using pnpm
pnpm add -D @palmbeach/nuxt-content-routes

# Using yarn
yarn add --dev @palmbeach/nuxt-content-routes

# Using npm
npm install --save-dev @palmbeach/nuxt-content-routes
```

2. Add `nuxt-content-routes` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    '@palmbeach/nuxt-content-routes'
  ]
})
```

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@palmbeach/nuxt-content-routes/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@palmbeach/nuxt-content-routes

[license-src]: https://img.shields.io/npm/l/@palmbeach/nuxt-content-routes.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@palmbeach/nuxt-content-routes

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
