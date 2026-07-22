import { mergeConfigs, baseConfig } from '@delmaredigital/payload-puck/config'
import { editorConfig } from '@delmaredigital/payload-puck/config/editor'

import { HeroConfig } from '@/puck/components/Hero.config'

const heroExtension = {
  components: {
    Hero: HeroConfig,
  },
  categories: {
    sections: {
      title: 'Sections',
      components: ['Hero'],
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
