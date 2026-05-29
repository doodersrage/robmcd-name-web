import { getPayload } from 'payload'
import React from 'react'
import configPromise from '@payload-config'
import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import MyFormComponent from '@/app/components/MyFormComponent'

export type paramsType = Promise<{ slug: string[] }>

type Props = {
  params: paramsType
}

export default async function Page({ params }: Props): Promise<React.ReactNode> {
  const payload = await getPayload({ config: configPromise })

  const { slug } = await params
  const pathArray = slug || []

  // Fetch the page by slug
  const pages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: pathArray.join('/') || 'home', // Fallback to home page
      },
    },
  })

  const page = pages.docs[0]

  if (!page) return <div>Page Not Found</div>

  return (
    <>
      <head>
        <title>{page.pageMeta?.headerTitle || page.title}</title>
        <meta name="description" content={page.pageMeta?.metaDescription || ''} />
        <meta name="keywords" content={page.pageMeta?.metaKeywords || ''} />
      </head>
      <main>
        <h1 className="capitalize text-shadow-md text-2xl font-bold mb-4">{page.title}</h1>
        <RichTextConverter data={page.content} />
        {page.layout && (
          <div className="mt-8">
            {page.layout.map((block: any, index: number) => {
              if (block.blockType === 'formBlock') {
                return (
                  <div key={index} className="my-8">
                    <h2 className="text-xl font-semibold mb-4">{block.form.title}</h2>
                    <MyFormComponent formId={block.form.id} />
                  </div>
                )
              }
            })}
          </div>
        )}
      </main>
    </>
  )
}
