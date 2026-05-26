import { CollectionConfig } from 'payload'
import {
  BlocksFeature,
  EXPERIMENTAL_TableFeature,
  LinkFeature,
  ParagraphFeature,
  HeadingFeature,
  TextStateFeature,
  lexicalEditor,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  defaultSort: ['title'],
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          TextStateFeature(),
          HeadingFeature(),
          ParagraphFeature(),
          LinkFeature(),
          EXPERIMENTAL_TableFeature(),
          BlocksFeature({
            blocks: [
              {
                interfaceName: 'MyTextBlock',
                slug: 'myTextBlock',
                fields: [
                  {
                    name: 'text',
                    type: 'text',
                  },
                ],
              },
            ],
          }),
        ],
      }),
    },
    {
      name: 'pageMeta',
      type: 'group', // required
      interfaceName: 'Meta', // optional
      fields: [
        {
          name: 'headerTitle',
          type: 'text',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
        },
        {
          name: 'metaKeywords',
          type: 'textarea',
        },
        {
          name: 'metaExtra',
          type: 'textarea',
        },
      ],
    },
    // {
    //   name: 'layout', // Often used for building dynamic page layouts
    //   type: 'blocks',
    //   blocks: [
    //     // Define your layout blocks here (e.g., Hero, Content, Media)
    //   ],
    // },
  ],
}
