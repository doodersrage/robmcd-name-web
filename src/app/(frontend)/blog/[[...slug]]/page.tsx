import { getPayload } from 'payload'
import React, { Suspense } from 'react'
import configPromise from '@payload-config'
import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import MyForm from '@/app/components/blocks/MyForm'
import { CodeBlockComponent } from '@/app/components/blocks/CodeBlock'
import BlogSidebar from '@/app/components/blog/BlogSidebar'
import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface'
import { notFound } from 'next/navigation'
import { SITE_OWNER } from '@/lib/site'

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
  const isPostView = Boolean(slug?.length)

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

    if (!post) {
      notFound()
    }
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

    if (!post) {
      notFound()
    }
  }

  return (
    <>
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
        <article className="min-w-0 flex-1">
          <div className="card">
            <div className="card-content">
            {post && (
              <>
                <h1 className="page-title">{post?.title}</h1>

                {isPostView ? (
                  <div className="page-meta">
                    <span>{SITE_OWNER}</span>
                    {post?.createdAt ? (
                      <>
                        <span aria-hidden="true">·</span>
                        <time dateTime={post.createdAt}>
                          {new Date(post.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                      </>
                    ) : null}
                    {post?.updatedAt && post.updatedAt !== post.createdAt ? (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>
                          Updated{' '}
                          <time dateTime={post.updatedAt}>
                            {new Date(post.updatedAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </time>
                        </span>
                      </>
                    ) : null}
                  </div>
                ) : null}

                <div className="prose-site">
                  <RichTextConverter data={post?.content} />
                </div>
              </>
            )}

            {post && post.layout && (
              <div className="space-y-8 border-t border-slate-200/80 pt-8 dark:border-zinc-800/80">
                {post.layout.map((block: any, index: number) => {
                  switch (block.blockType) {
                    case 'formBlock':
                      return (
                        <div key={index} className="card">
                          <div className="card-content">
                          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
                            {block.form.title}
                          </h2>
                          <Suspense
                            fallback={<div className="text-center py-4">Loading form...</div>}
                          >
                            <MyForm formId={block.form.id} />
                          </Suspense>
                          </div>
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
          </div>
        </article>

        <aside className="lg:w-80">
          <Suspense
            fallback={
              <div className="card sidebar-card h-96 animate-pulse">Loading sidebar...</div>
            }
          >
            <BlogSidebar pageNumber={1} />
          </Suspense>
        </aside>
      </div>
    </>
  )
}
