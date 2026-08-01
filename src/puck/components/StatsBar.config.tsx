import type { ComponentConfig } from '@puckeditor/core'

import { StatsBar } from '@/app/components/ui/StatsBar'
import { parseStats } from '@/puck/lib/fieldParsers'

export type StatsBarBlockProps = {
  eyebrow: string
  title: string
  stats: string
}

export const StatsBarConfig: ComponentConfig<StatsBarBlockProps> = {
  label: 'Stats Bar',
  defaultProps: {
    eyebrow: 'By the numbers',
    title: 'Trusted by builders',
    stats: ['50+|Projects delivered', '99%|Client satisfaction', '24/7|Support coverage', '10x|Faster iteration'].join(
      '\n',
    ),
  },
  fields: {
    eyebrow: { type: 'text', label: 'Eyebrow' },
    title: { type: 'text', label: 'Title' },
    stats: {
      type: 'textarea',
      label: 'Stats (one per line: value|label|detail)',
    },
  },
  render: ({ eyebrow, title, stats }) => (
    <StatsBar eyebrow={eyebrow} title={title} stats={parseStats(stats)} />
  ),
}
