import { getPayload } from 'payload'
import React, { Suspense } from 'react'
import configPromise from '@payload-config'
import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import MyForm from '@/app/components/blocks/MyForm'
import { CodeBlockComponent } from '@/app/components/blocks/CodeBlock'
import BlogSidebar from '@/app/components/blog/BlogSidebar'
import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface'

export type paramsType = Promise<{ slug: string[] }>

export async function generateMetadata({
  params,
}: {
  params: Promise<paramsType>
}): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise })

  const { slug } = await params
  const pathArray = slug || []

  let post = null

  if (!slug) {
    // Fetch default blog page
    const pages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'blog',
        },
      },
    })

    post = pages.docs[0] || null
  } else {
    const pathArray: string = slug[0]?.replace('/blog/', '') || ''

    // Fetch selected blog page
    const postGet = await payload.find({
      collection: 'posts',
      where: {
        slug: {
          equals: pathArray,
        },
      },
    })

    post = postGet.docs[0]
  }

  return {
    title: post?.pageMeta?.headerTitle || post?.title,
    description: post?.pageMeta?.metaDescription || '',
    keywords: [post?.pageMeta?.metaKeywords],
    alternates: {
      canonical: `/blog/${post?.slug}`,
    },
  }
}

export default async function Page({ params }: { params: Promise<paramsType> }) {
  const payload = await getPayload({ config: configPromise })

  const { slug } = await params
  let post = null

  if (!slug) {
    // Fetch default blog page
    const pages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'blog',
        },
      },
    })

    post = pages.docs[0] || null

    if (!post) return <div>Post Not Found</div>
  } else {
    const pathArray: string = slug[0]?.replace('/blog/', '') || ''

    // Fetch selected blog page
    const postGet = await payload.find({
      collection: 'posts',
      where: {
        slug: {
          equals: pathArray,
        },
      },
    })

    post = postGet.docs[0]

    if (!post) return <div>Post Not Found</div>
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8">
        <article className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-[#AEC3B0] border-opacity-20">
            {post && (
              <>
                <h1 className="text-4xl md:text-5xl font-bold text-[#01161E] mb-6 leading-tight">
                  {post?.title}
                </h1>

                {post?.publishedDate && (
                  <div className="flex items-center gap-2 text-[#598392] mb-8 text-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {new Date(post?.publishedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                )}

                <div className="prose prose-lg max-w-none">
                  <RichTextConverter data={post?.content} />
                </div>
              </>
            )}

            {post && post.layout && (
              <div className="mt-12 pt-8 border-t border-[#AEC3B0] border-opacity-30">
                {post.layout.map((block: any, index: number) => {
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
                            fallback={<div className="text-center py-4">Loading form...</div>}
                          >
                            <MyForm formId={block.form.id} />
                          </Suspense>
                        </div>
                      )
                    case 'codeBlock':
                      return (
                        <div key={index} className="my-8">
                          <Suspense
                            fallback={<div className="text-center py-4">Loading code block...</div>}
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

        <aside className="lg:w-80">
          <Suspense
            fallback={
              <div className="bg-white rounded-2xl p-6 animate-pulse h-96">Loading sidebar...</div>
            }
          >
            <BlogSidebar pageNumber={1} />
          </Suspense>
        </aside>
      </div>
    </>
  )
}
