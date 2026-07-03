import { CollectionConfig, Field } from 'payload'
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

/** Coerce relationship values to numeric IDs (D1/SQLite expects numbers). */
function normalizeRelationshipId(value: unknown): number | undefined {
  if (value == null || value === '') return undefined

  if (typeof value === 'object' && 'id' in value) {
    return normalizeRelationshipId((value as { id: unknown }).id)
  }

  if (typeof value === 'number' && !Number.isNaN(value)) return value

  if (typeof value === 'string') {
    const parsed = parseInt(value, 10)
    return Number.isNaN(parsed) ? undefined : parsed
  }

  return undefined
}

/** Normalize nested-docs breadcrumb rows after populateBreadcrumbs runs. */
function sanitizeBreadcrumbs(data: Record<string, unknown>, pageId: unknown): void {
  const normalizedPageId = normalizeRelationshipId(pageId)
  if (!Array.isArray(data.breadcrumbs) || normalizedPageId == null) return

  data.breadcrumbs = data.breadcrumbs
    .map((crumb: Record<string, unknown>, index: number, crumbs: unknown[]) => {
      const docId =
        normalizeRelationshipId(crumb?.doc) ??
        (index === crumbs.length - 1 ? normalizedPageId : undefined)

      if (docId == null) return null

      return { ...crumb, doc: docId }
    })
    .filter(Boolean)
}

/**
 * Breadcrumbs for nested-docs. Custom field so we can skip validation on the
 * server-managed `doc` relationship (populated objects fail publish validation).
 */
const breadcrumbsField: Field = {
  name: 'breadcrumbs',
  type: 'array',
  localized: false,
  admin: {
    readOnly: true,
  },
  fields: [
    {
      name: 'doc',
      type: 'relationship',
      relationTo: 'pages',
      maxDepth: 0,
      admin: {
        disabled: true,
        readOnly: true,
      },
      validate: (): true => true,
      hooks: {
        beforeChange: [
          ({ value, data, originalDoc }) => {
            return (
              normalizeRelationshipId(value) ??
              normalizeRelationshipId(originalDoc?.id ?? data?.id)
            )
          },
        ],
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'url',
          type: 'text',
          admin: { width: '50%' },
          label: 'URL',
        },
        {
          name: 'label',
          type: 'text',
          admin: { width: '50%' },
        },
      ],
    },
  ],
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
    breadcrumbsField,
  ],
}
