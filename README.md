# Nuxt Content Routes

[![npm version][npm-version-src]][npm-version-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

A small add-on for [Nuxt Content](https://content.nuxtjs.org) that generates static routes for markdown files.

Routes are generated during the build process from the Nuxt Content directory when the `documentDriven` option cannot be utilized. This is particularly useful in scenarios where Nuxt Content and static pages are combined, or when a specific i18n strategy is required.

Zero impact on runtime performance.

Please note that this add-on might become obsolete with upcoming Nuxt Content releases.

```TypeScript
//Only executed on build via nuxt build
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

- &nbsp;Generates all routes for Nuxt Content markdown files in content directory
- &nbsp;Supports i18n strategy 'prefix' and 'prefix_except_default'
- &nbsp;Generate clean path names (no order prefixes, no file extensions, no capital letters)

### Todo

- [Support for i18n strategy 'prefix_and_default'](https://github.com/palmbeach-interactive/nuxt-content-routes/issues/1)
- [Support for multiple Nuxt Content directories'](https://github.com/palmbeach-interactive/nuxt-content-routes/issues/2)

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

## Contributing

- Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

## Playground / Example

```bash
#content directory structure in playground
content/
├─ de/
│  ├─ 1.foo/
│  │  ├─ 1.bar.md
│  │  ├─ index.md
│  ├─ 2.bar/
│  │  ├─ 1.foo.md
│  │  ├─ index.md
│  ├─ index.md
├─ en/
│  ├─ 1.foo/
│  │  ├─ 1.bar.md
│  │  ├─ index.md
│  ├─ 2.bar/
│  │  ├─ 1.foo.md
│  │  ├─ index.md
│  ├─ index.md
├─ index.md

#routes: nuxt.config.ts > i18n > strategy = 'prefix'
├─ /de
├─ /en
├─ /
├─ /en/foo/bar
├─ /de/foo/bar
├─ /en/bar/foo
├─ /de/bar/foo
├─ /de/bar
├─ /de/foo
├─ /en/foo
├─ /en/bar 

#routes: nuxt.config.ts > i18n > strategy = 'prefix_except_default'
├─ /de
├─ /bar
├─ /
├─ /foo
├─ /de/foo/bar
├─ /de/bar/foo
├─ /bar/foo
├─ /foo/bar
├─ /de/foo
├─ /de/bar
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
