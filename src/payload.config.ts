import fs from 'fs'
import path from 'path'
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { CloudflareContext, getCloudflareContext } from '@opennextjs/cloudflare'
import { GetPlatformProxyOptions } from 'wrangler'
import { r2Storage } from '@payloadcms/storage-r2'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { Posts } from './collections/Posts'
import { Pages } from './collections/Pages'
import { searchPlugin } from '@payloadcms/plugin-search'
import { extractPlainText } from './utilities/extractPlainText'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { importExportPlugin } from '@payloadcms/plugin-import-export'
import { createPuckPlugin } from '@delmaredigital/payload-puck/plugin'

import { validateTurnstile } from './hooks/validateTurnstile'
import { Users } from './collections/Users'
import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const realpath = (value: string) => (fs.existsSync(value) ? fs.realpathSync(value) : undefined)

const isCLI = process.argv.some((value) => realpath(value).endsWith(path.join('payload', 'bin.js')))
const isProduction = process.env.NODE_ENV === 'production'

const createLog =
  (level: string, fn: typeof console.log) => (objOrMsg: object | string, msg?: string) => {
    if (typeof objOrMsg === 'string') {
      fn(JSON.stringify({ level, msg: objOrMsg }))
    } else {
      fn(JSON.stringify({ level, ...objOrMsg, msg: msg ?? (objOrMsg as { msg?: string }).msg }))
    }
  }

const cloudflareLogger = {
  level: process.env.PAYLOAD_LOG_LEVEL || 'info',
  trace: createLog('trace', console.debug),
  debug: createLog('debug', console.debug),
  info: createLog('info', console.log),
  warn: createLog('warn', console.warn),
  error: createLog('error', console.error),
  fatal: createLog('fatal', console.error),
  silent: () => {},
} as any // Use PayloadLogger type when it's exported

const cloudflare =
  isCLI || !isProduction
    ? await getCloudflareContextFromWrangler()
    : await getCloudflareContext({ async: true })

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      providers: ['@/components/admin/PuckProvider'],
    },
  },
  collections: [Users, Media, Pages, Posts],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteD1Adapter({ binding: cloudflare.env.D1 }),
  logger: isProduction ? cloudflareLogger : undefined,
  jobs: {
    autoRun: [
      {
        allQueues: true,
        cron: '*/5 * * * *', // Check every 5 minutes
        queue: 'default',
      },
    ],
  },
  plugins: [
    createPuckPlugin({
      pagesCollection: 'pages',
      previewUrl: (page) => {
        const slug = page.slug as string
        if (slug === 'home') return '/'
        return `/${slug}`
      },
      // Runtime PostCSS compilation uses native Tailwind binaries and cannot run on
      // Cloudflare Workers. Dev uses the endpoint; production uses the pre-built file.
      ...(isProduction
        ? {}
        : { editorStylesheet: 'src/app/(frontend)/globals.scss' }),
      editorStylesheetCompiled: '/puck-editor-styles.css',
      editorStylesheetUrls: [
        'https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap',
      ],
    }),
    importExportPlugin({
      collections: [{ slug: 'users' }, { slug: 'pages' }, { slug: 'posts' }, { slug: 'media' }],
      // see below for a list of available options
    }),
    formBuilderPlugin({
      defaultToEmail: process.env.SMTP_MAIL_FROM,
      redirectRelationships: ['pages'],
      uploadCollections: ['media'],
      formSubmissionOverrides: {
        hooks: {
          beforeChange: [validateTurnstile],
        },
      },
    }),
    nestedDocsPlugin({
      collections: ['pages'], // Specify the collections to enable nesting
      generateLabel: (_, doc) => doc.title as string,
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    }),
    r2Storage({
      bucket: cloudflare.env.R2,
      collections: { media: true },
    }),
    searchPlugin({
      collections: ['pages', 'posts'],
      defaultPriorities: {
        pages: 10,
        posts: 20,
      },
      searchOverrides: {
        fields: ({ defaultFields }) => [
          ...defaultFields,
          {
            name: 'description',
            type: 'textarea',
            label: 'Description',
          },
          {
            name: 'slug',
            type: 'text',
            label: 'Slug',
          },
        ],
      },
      // Map content from your original documents into the shape expected in the search index
      beforeSync: ({ originalDoc, searchDoc }) => {
        const collection = searchDoc.doc.relationTo

        // If the document is from the pages collection...
        if (collection === 'pages') {
          return {
            ...searchDoc,
            // Map the 'heading' field from the article as the search result title
            title: originalDoc.title,
            slug: originalDoc.slug,

            // Extract and flatten the rich text content to make it searchable
            description: extractPlainText(originalDoc.content),
          }
        }

        // If the document is from the posts collection...
        if (collection === 'posts') {
          return {
            ...searchDoc,
            // Use the author's name as the title
            title: originalDoc.title,
            slug: `/blog/${originalDoc.slug}`,

            // Extract plain text from the bio for consistent searching
            description: extractPlainText(originalDoc.content),
          }
        }

        // For any other collections not explicitly handled, fall back to the default
        return searchDoc
      },
    }),
  ],
  email: nodemailerAdapter({
    defaultFromAddress: process.env.EMAIL_USER,
    defaultFromName: 'Your App Name',
    transportOptions: {
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    },
  }),
})

// Adapted from https://github.com/opennextjs/opennextjs-cloudflare/blob/d00b3a13e42e65aad76fba41774815726422cc39/packages/cloudflare/src/api/cloudflare-context.ts#L328C36-L328C46
function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(/* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`).then(
    ({ getPlatformProxy }) =>
      getPlatformProxy({
        environment: process.env.CLOUDFLARE_ENV,
        remoteBindings: isProduction,
      } satisfies GetPlatformProxyOptions),
  )
}
