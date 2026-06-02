import { getPayload } from 'payload'
import React, { Suspense } from 'react'
import configPromise from '@payload-config'
import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import MyForm from '@/app/components/blocks/MyForm'
import { CodeBlockComponent } from '@/app/components/blocks/CodeBlock'
import BlogSidebar from '@/app/components/blog/BlogSidebar'

export type paramsType = Promise<{ slug: string[] }>

export default async function Page({ params }: { params: Promise<paramsType> }) {
  const payload = await getPayload({ config: configPromise })

  const { slug } = await params
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

  const post = postGet.docs[0]

  if (!post) return <div>Post Not Found</div>

  return (
    <>
      <head>
        {post && (
          <>
            <title>{post?.pageMeta?.headerTitle || post?.title}</title>
            <meta name="description" content={post?.pageMeta?.metaDescription || ''} />
            <meta name="keywords" content={post?.pageMeta?.metaKeywords || ''} />
          </>
        )}
      </head>
      <main className="max-w-340 mx-auto flex flex-col md:flex-row gap-4 py-5 sm:px-6 lg:px-8">
        <div className="flex-1 grow rounded-xl bg-clip-border p-4">
          {post && (
            <>
              <h1 className="capitalize text-shadow-md text-2xl font-bold mb-4">{post?.title}</h1>
              <RichTextConverter data={post?.content} />
            </>
          )}

          {post && post.layout && (
            <div className="mt-8">
              {post.layout.map((block: any, index: number) => {
                switch (block.blockType) {
                  case 'formBlock':
                    return (
                      <div key={index} className="my-8">
                        <h2 className="text-xl font-semibold mb-4">{block.form.title}</h2>
                        <Suspense fallback={<div>Loading form...</div>}>
                          <MyForm formId={block.form.id} />
                        </Suspense>
                      </div>
                    )
                  case 'codeBlock':
                    return (
                      <div key={index} className="my-8">
                        <Suspense fallback={<div>Loading code block...</div>}>
                          <CodeBlockComponent code={block.code} language={block.language} />
                        </Suspense>
                      </div>
                    )
                }
              })}
            </div>
          )}
        </div>

        <Suspense fallback={<div>Loading sidebar...</div>}>
          <BlogSidebar pageNumber={1} />
        </Suspense>
      </main>
    </>
  )
}
