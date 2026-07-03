import { CollectionConfig } from 'payload'
import { createBreadcrumbsField } from '@payloadcms/plugin-nested-docs'
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

/** Normalize nested-docs breadcrumb relationship IDs before validation. */
function sanitizeBreadcrumbs(
  data: Record<string, unknown>,
  pageId: number | string | undefined,
): void {
  if (!Array.isArray(data.breadcrumbs) || pageId == null) return

  data.breadcrumbs = data.breadcrumbs
    .map((crumb: Record<string, unknown>, index: number, crumbs: unknown[]) => {
      const docValue = crumb?.doc
      const docId =
        typeof docValue === 'object' && docValue != null && 'id' in docValue
          ? (docValue as { id: number | string }).id
          : docValue

      return {
        ...crumb,
        doc: docId ?? (index === crumbs.length - 1 ? pageId : docId),
      }
    })
    .filter((crumb: Record<string, unknown>) => crumb.doc != null)
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  defaultSort: ['title'],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        // Breadcrumbs are computed by nested-docs; never validate client-provided values.
        if (data && 'breadcrumbs' in data) {
          delete data.breadcrumbs
        }
        return data
      },
    ],
    beforeChange: [
      ({ data, originalDoc }) => {
        sanitizeBreadcrumbs(data, originalDoc?.id ?? data?.id)
        return data
      },
    ],
  },
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
      name: 'hideInMenu',
      type: 'checkbox',
      required: true,
      defaultValue: false,
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
    // Defined here (not by nested-docs) so breadcrumbs are not localized — avoids
    // draft/version validation errors when localization is not enabled.
    createBreadcrumbsField('pages', { localized: false }),
  ],
}
