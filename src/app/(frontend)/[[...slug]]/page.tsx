import { getPayload } from 'payload'
import React from 'react'
import configPromise from '@payload-config'
import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import MyForm from '@/app/components/myForm'

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
        equals: pathArray[0] === 'blog' ? 'blog' : pathArray.join('/') || 'home', // Fallback to home page
      },
    },
  })

  const page = pages.docs[0]
  let posts: { docs: any[] } = { docs: [] }
  let postGet: { docs: any[] } = { docs: [] }
  let post: any = null

  if (pathArray[0] !== 'blog') {
    if (!page) return <div>Page Not Found</div>
  } else {
    // check for blog section
    if (pathArray[0] === 'blog') {
      posts = await payload.find({
        collection: 'posts',
        sort: ['-sortOrder', 'title'],
      })
    }
    if (pathArray.length > 1) {
      pathArray.shift() // remove 'blog' from the path

      postGet = await payload.find({
        collection: 'posts',
        where: {
          slug: {
            equals: pathArray.join('/'),
          },
        },
      })
      console.log('postGet', postGet)
      if (!postGet.docs.length) return <div>Post Not Found</div>
      post = postGet.docs[0]
    }
  }

  return (
    <>
      <head>
        {page && !post && (
          <>
            <title>{page.pageMeta?.headerTitle || page.title}</title>
            <meta name="description" content={page.pageMeta?.metaDescription || ''} />
            <meta name="keywords" content={page.pageMeta?.metaKeywords || ''} />
          </>
        )}
        {post && (
          <>
            <title>{post?.pageMeta?.headerTitle || post?.title}</title>
            <meta name="description" content={post?.pageMeta?.metaDescription || ''} />
            <meta name="keywords" content={post?.pageMeta?.metaKeywords || ''} />
          </>
        )}
      </head>
      <main>
        <div className="relative h-20 w-full flex">
          <div className="relative flex h-[calc(100vh-20rem)] w-full grow flex-col rounded-xl bg-clip-border p-4">
            {page && !post && (
              <>
                <h1 className="capitalize text-shadow-md text-2xl font-bold mb-4">{page.title}</h1>
                <RichTextConverter data={page.content} />
              </>
            )}

            {post && (
              <div className="mt-8">
                <h1 className="capitalize text-shadow-md text-2xl font-bold mb-4">{post?.title}</h1>
                <RichTextConverter data={post?.content} />
              </div>
            )}

            {page.layout && (
              <div className="mt-8">
                {page.layout.map((block: any, index: number) => {
                  if (block.blockType === 'formBlock') {
                    return (
                      <div key={index} className="my-8">
                        <h2 className="text-xl font-semibold mb-4">{block.form.title}</h2>
                        <MyForm formId={block.form.id} />
                      </div>
                    )
                  }
                })}
              </div>
            )}
          </div>

          {posts.docs.length > 0 && (
            <div className="relative h-[calc(100vh-20rem)] w-full max-w-[20rem] flex flex-col rounded-xl bg-white bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5">
              <div className="p-4 mb-2">
                <h3>Posts</h3>
                {posts.docs.map((post) => (
                  <div key={post.id} className="mb-6">
                    <a href={`/blog/${post.slug}`} className="text-xl font-semibold text-shadow-md">
                      {post.title}
                    </a>
                    <p className="text-gray-600">{post.pageMeta?.metaDescription}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
