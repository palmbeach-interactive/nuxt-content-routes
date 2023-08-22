import { defineNuxtModule } from '@nuxt/kit'
import fs from 'fs/promises'
import path from 'path'

async function listFilesInDirectory(
  directory: string,
  prefix: string = '',
  i18nDefaultLocale: string,
  i18nStrategy: string,
): Promise<string[]> {
  let entries = await fs.readdir(directory, {
    withFileTypes: true,
  })

  const regexStartDigits = /^\d+\./

  // Remove junk files
  entries = entries.filter((item) => !/(^|\/)\.[^/.]|^_dir/g.test(item.name))

  const routeSlugify = (str: string) =>
    str.replace(regexStartDigits, '').toLowerCase()

  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name)
      const cleanPrefix = routeSlugify(prefix)

      const preventDefaultLocaleAsPrefix =
        i18nStrategy == 'prefix_except_default' &&
        cleanPrefix == i18nDefaultLocale

      //Directory only
      if (entry.isDirectory()) {
        const directoryName = routeSlugify(entry.name)

        //Build final directory path
        const directoryPath = path.join(
          preventDefaultLocaleAsPrefix ? '' : cleanPrefix,
          directoryName,
        )

        //List all files in the directory
        return listFilesInDirectory(
          fullPath,
          directoryPath,
          i18nDefaultLocale,
          i18nStrategy,
        )
      }

      //Strip file extension and strip number prefix and convert to lowercase
      const name = routeSlugify(
        path.basename(entry.name, path.extname(entry.name)),
      )

      //Build fina file path
      //Prevent default locale as prefix if strategy is prefix_except_default
      let finalPath = path.join(
        '/',
        preventDefaultLocaleAsPrefix ? '' : cleanPrefix,
        name === 'index' ? '' : name,
      )

      //Replace backslashes with slashes
      if (path.sep === '\\') {
        finalPath = finalPath.replace(/\\/g, '/')
      }

      return finalPath
    }),
  )

  return Array.prototype.concat(...files)
}

export default defineNuxtModule({
  async setup(_moduleOptions: {}, nuxt) {
    const directory =
      'content' in nuxt.options
        ? //@ts-ignore
          nuxt.options.content?.sources.content.base
        : './playground/content'
    const prefix = ''
    const i18nDefaultLocale =
      //@ts-ignore
      'i18n' in nuxt.options ? nuxt.options.i18n.defaultLocale : ''
    const i18nStrategy =
      //@ts-ignore
      'i18n' in nuxt.options ? nuxt.options.i18n.strategy : ''

    console.info('Build Routes for:', directory + '...')
    if ('i18n' in nuxt.options) {
      console.info(
        'RotesList i18n:',
        //@ts-ignore
        nuxt.options.i18n.defaultLocale,
        //@ts-ignore
        nuxt.options.i18n.strategy,
      )
    }

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
  },
})