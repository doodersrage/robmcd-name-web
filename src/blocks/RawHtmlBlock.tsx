import { Block } from 'payload'

export const RawHtmlBlock: Block = {
  slug: 'rawHtmlBlock',
  labels: {
    singular: 'Raw HTML Block',
    plural: 'Raw HTML Blocks',
  },
  fields: [
    {
      name: 'html',
      type: 'textarea',
      label: 'HTML Content',
      required: true,
    },
  ],
}
