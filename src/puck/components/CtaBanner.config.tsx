import type { ComponentConfig } from '@puckeditor/core'

import { CtaBanner } from '@/app/components/ui/CtaBanner'

export type CtaBannerBlockProps = {
  title: string
  description: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel: string
  secondaryHref: string
}

export const CtaBannerConfig: ComponentConfig<CtaBannerBlockProps> = {
  label: 'CTA Banner',
  defaultProps: {
    title: 'Ready to build something remarkable?',
    description: 'Start with a modern Puck-powered page — edit visually in Payload, ship on the edge.',
    primaryLabel: 'Get started',
    primaryHref: '/contact',
    secondaryLabel: 'View projects',
    secondaryHref: '/projects',
  },
  fields: {
    title: { type: 'text', label: 'Title' },
    description: { type: 'textarea', label: 'Description' },
    primaryLabel: { type: 'text', label: 'Primary CTA Label' },
    primaryHref: { type: 'text', label: 'Primary CTA Link' },
    secondaryLabel: { type: 'text', label: 'Secondary CTA Label' },
    secondaryHref: { type: 'text', label: 'Secondary CTA Link' },
  },
  render: ({ title, description, primaryLabel, primaryHref, secondaryLabel, secondaryHref }) => (
    <CtaBanner
      title={title}
      description={description}
      primaryLabel={primaryLabel}
      primaryHref={primaryHref}
      secondaryLabel={secondaryLabel}
      secondaryHref={secondaryHref}
    />
  ),
}
