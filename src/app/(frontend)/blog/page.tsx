import { Suspense } from 'react'
import { getPayload } from 'payload'
import React from 'react'
import configPromise from '@payload-config'
import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import MyForm from '@/app/components/blocks/MyForm'
import { CodeBlockComponent } from '@/app/components/blocks/CodeBlock'
import BlogSidebar from '@/app/components/blog/BlogSidebar'

export default async function Page(): Promise<React.ReactNode> {
  const payload = await getPayload({ config: configPromise })

  // Fetch default blog page
  const pages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'blog',
      },
    },
  })

  const page = pages.docs[0]

  if (!page) return <div>Page Not Found</div>

  return (
    <>
      <head>
        {page && (
          <>
            <title>{page.pageMeta?.headerTitle || page.title}</title>
            <meta name="description" content={page.pageMeta?.metaDescription || ''} />
            <meta name="keywords" content={page.pageMeta?.metaKeywords || ''} />
          </>
        )}
      </head>
      <main className="max-w-340 mx-auto flex flex-col md:flex-row gap-4 py-5 sm:px-6 lg:px-8">
        <div className="flex-1 grow rounded-xl bg-clip-border p-4">
          <Suspense fallback={<div>Loading blog...</div>}>
            {page && (
              <>
                <h1 className="capitalize text-shadow-md text-2xl font-bold mb-4">{page.title}</h1>
                <RichTextConverter data={page.content} />
              </>
            )}

            {page && page.layout && (
              <div className="mt-8">
                {page.layout.map((block: any, index: number) => {
                  switch (block.blockType) {
                    case 'formBlock':
                      return (
                        <div key={index} className="my-8">
                          <h2 className="text-xl font-semibold mb-4">{block.form.title}</h2>
                          <MyForm formId={block.form.id} />
                        </div>
                      )
                    case 'codeBlock':
                      return (
                        <div key={index} className="my-8">
                          <CodeBlockComponent code={block.code} language={block.language} />
                        </div>
                      )
                  }
                })}
              </div>
            )}
          </Suspense>
        </div>

        <BlogSidebar pageNumber={1} />
      </main>
    </>
  )
}
