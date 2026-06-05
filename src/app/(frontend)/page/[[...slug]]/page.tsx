import { getPayload } from 'payload'
import React, { Suspense } from 'react'
import { Metadata } from 'next'
import configPromise from '@payload-config'
import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import MyForm from '@/app/components/blocks/MyForm'
import { CodeBlockComponent } from '@/app/components/blocks/CodeBlock'

export type paramsType = Promise<{ slug: string[] }>

export async function generateMetadata({
  params,
}: {
  params: Promise<paramsType>
}): Promise<Metadata> {
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

  return {
    title: page?.pageMeta?.headerTitle || page?.title,
    description: page?.pageMeta?.metaDescription || '',
    keywords: [page?.pageMeta?.metaKeywords],
    alternates: {
      canonical: `/${page?.slug}`,
    },
  }
}

export default async function Page({ params }: { params: Promise<paramsType> }) {
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

  if (!page) return <div className="text-center py-12">Page Not Found</div>

  return (
    <>
      <article className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-[#AEC3B0] border-opacity-20">
          {page && (
            <>
              <h1 className="text-4xl md:text-5xl font-bold text-[#01161E] mb-6 leading-tight">
                {page.title}
              </h1>
              <div className="prose prose-lg max-w-none">
                <RichTextConverter data={page.content} />
              </div>
            </>
          )}

          {page && page.layout && (
            <div className="mt-12 pt-8 border-t border-[#AEC3B0] border-opacity-30">
              {page.layout.map((block: any, index: number) => {
                switch (block.blockType) {
                  case 'formBlock':
                    return (
                      <div
                        key={index}
                        className="my-8 p-6 rounded-xl bg-gradient-to-r from-[#EFF6E0] to-[#f5f9ec] border border-[#AEC3B0] border-opacity-30"
                      >
                        <h2 className="text-2xl font-bold text-[#01161E] mb-6">
                          {block.form.title}
                        </h2>
                        <Suspense
                          fallback={
                            <div className="text-center py-4 text-[#598392]">Loading form...</div>
                          }
                        >
                          <MyForm formId={block.form.id} />
                        </Suspense>
                      </div>
                    )
                  case 'codeBlock':
                    return (
                      <div key={index} className="my-8">
                        <Suspense
                          fallback={
                            <div className="text-center py-4 text-[#598392]">
                              Loading code block...
                            </div>
                          }
                        >
                          <CodeBlockComponent code={block.code} language={block.language} />
                        </Suspense>
                      </div>
                    )
                }
              })}
            </div>
          )}
        </div>
      </article>
    </>
  )
}
