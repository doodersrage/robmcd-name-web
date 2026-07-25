import { mergeConfigs, baseConfig } from '@delmaredigital/payload-puck/config'
import { editorConfig } from '@delmaredigital/payload-puck/config/editor'

import { HeroConfig } from '@/puck/components/Hero.config'
import { RawHtmlConfig } from '@/puck/components/RawHtml.config'

const heroExtension = {
  components: {
    Hero: HeroConfig,
    RawHtml: RawHtmlConfig,
  },
  categories: {
    sections: {
      title: 'Sections',
      components: ['Hero', 'RawHtml'],
      defaultExpanded: true,
    },
  },
}

export const siteConfig = mergeConfigs({
  base: baseConfig,
  ...heroExtension,
})

export const siteEditorConfig = mergeConfigs({
  base: editorConfig,
  ...heroExtension,
})
