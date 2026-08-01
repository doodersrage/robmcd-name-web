import type { ComponentConfig } from '@puckeditor/core'

import { Testimonials } from '@/app/components/ui/Testimonials'
import { parseTestimonials } from '@/puck/lib/fieldParsers'

export type TestimonialsBlockProps = {
  eyebrow: string
  title: string
  description: string
  items: string
}

export const TestimonialsConfig: ComponentConfig<TestimonialsBlockProps> = {
  label: 'Testimonials',
  defaultProps: {
    eyebrow: 'Social proof',
    title: 'Loved by teams shipping in public',
    description: 'Real feedback from creators and studios using modern headless workflows.',
    items: [
      'Alex Rivera|Lead Developer, Northwind|5|Payload + Puck cut our landing page updates from days to minutes.|',
      'Sam Okonkwo|Indie founder|5|The glass UI and dark mode polish made our product site feel premium overnight.|',
      'Jordan Lee|Creative director|4|Bento blocks and stats sections are exactly what our case studies needed.|',
    ].join('\n---\n'),
  },
  fields: {
    eyebrow: { type: 'text', label: 'Eyebrow' },
    title: { type: 'text', label: 'Title' },
    description: { type: 'textarea', label: 'Description' },
    items: {
      type: 'textarea',
      label: 'Testimonials — separate with --- or one per line: name|role|rating|quote|avatarUrl',
    },
  },
  render: ({ eyebrow, title, description, items }) => (
    <Testimonials
      eyebrow={eyebrow}
      title={title}
      description={description}
      items={parseTestimonials(items)}
    />
  ),
}
