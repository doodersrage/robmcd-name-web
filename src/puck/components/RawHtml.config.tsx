import type { ComponentConfig } from '@puckeditor/core'

export type RawHtmlBlockProps = {
  html: string
}

export const RawHtmlConfig: ComponentConfig<RawHtmlBlockProps> = {
  label: 'Raw HTML',
  defaultProps: {
    html: '<div>Enter your HTML content here</div>',
  },
  fields: {
    html: {
      type: 'textarea',
      label: 'HTML Content',
    },
  },
  render: ({ html }) => (
    <div
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  ),
}
