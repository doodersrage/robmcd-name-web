import type { ComponentConfig } from '@puckeditor/core'

import { BentoGrid } from '@/app/components/ui/BentoGrid'
import { parseBentoItems } from '@/puck/lib/fieldParsers'

export type BentoGridBlockProps = {
  eyebrow: string
  title: string
  description: string
  items: string
}

export const BentoGridConfig: ComponentConfig<BentoGridBlockProps> = {
  label: 'Feature Bento Grid',
  defaultProps: {
    eyebrow: 'Capabilities',
    title: 'Everything you need to ship faster',
    description: 'Modular blocks, modern stack, and a visual editor your team will actually use.',
    items: [
      'wide|Zap|Lightning performance|Edge-rendered pages with sub-second loads.',
      'default|Shield|Enterprise security|Auth, quotas, and audit-ready defaults.',
      'default|Layers|Visual page builder|Drag-and-drop Puck blocks synced to Payload CMS.',
      'tall|Rocket|Launch-ready|From prototype to production on Cloudflare.',
    ].join('\n'),
  },
  fields: {
    eyebrow: { type: 'text', label: 'Eyebrow' },
    title: { type: 'text', label: 'Title' },
    description: { type: 'textarea', label: 'Description' },
    items: {
      type: 'textarea',
      label: 'Items — one per line: span|icon|title|description (span: default/wide/tall; icons: Sparkles, Zap, Shield, Rocket, Layers, Globe, Lock, Cpu, Box, BarChart3)',
    },
  },
  render: ({ eyebrow, title, description, items }) => (
    <BentoGrid
      eyebrow={eyebrow}
      title={title}
      description={description}
      items={parseBentoItems(items)}
    />
  ),
}
