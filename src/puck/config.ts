import { mergeConfigs, baseConfig } from '@delmaredigital/payload-puck/config'
import { editorConfig } from '@delmaredigital/payload-puck/config/editor'

import { BentoGridConfig } from '@/puck/components/BentoGrid.config'
import { CtaBannerConfig } from '@/puck/components/CtaBanner.config'
import { HeroConfig } from '@/puck/components/Hero.config'
import { ProjectShowcaseConfig } from '@/puck/components/ProjectShowcase.config'
import { RawHtmlConfig } from '@/puck/components/RawHtml.config'
import { StatsBarConfig } from '@/puck/components/StatsBar.config'
import { TestimonialsConfig } from '@/puck/components/Testimonials.config'

const siteExtension = {
  components: {
    Hero: HeroConfig,
    BentoGrid: BentoGridConfig,
    StatsBar: StatsBarConfig,
    Testimonials: TestimonialsConfig,
    CtaBanner: CtaBannerConfig,
    ProjectShowcase: ProjectShowcaseConfig,
    RawHtml: RawHtmlConfig,
  },
  categories: {
    hero: {
      title: 'Hero',
      components: ['Hero'],
      defaultExpanded: true,
    },
    features: {
      title: 'Features',
      components: ['BentoGrid', 'StatsBar', 'ProjectShowcase'],
    },
    'social-proof': {
      title: 'Social Proof',
      components: ['Testimonials'],
    },
    conversion: {
      title: 'Conversion',
      components: ['CtaBanner'],
    },
    advanced: {
      title: 'Advanced',
      components: ['RawHtml'],
    },
  },
}

export const siteConfig = mergeConfigs({
  base: baseConfig,
  ...siteExtension,
})

export const siteEditorConfig = mergeConfigs({
  base: editorConfig,
  ...siteExtension,
})
