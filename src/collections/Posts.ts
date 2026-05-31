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
  InlineCodeFeature,
} from '@payloadcms/richtext-lexical'
import { FormBlock } from '@/blocks/FormBlock'
import { CodeBlock } from '@/blocks/CodeBlock'

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
      name: 'sortOrder',
      type: 'number',
      required: true,
      defaultValue: 0,
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
          InlineCodeFeature(),
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
    {
      name: 'layout', // Often used for building dynamic page layouts
      type: 'blocks',
      blocks: [
        // Define your layout blocks here (e.g., Hero, Content, Media)
        CodeBlock,
        FormBlock,
      ],
    },
  ],
}
