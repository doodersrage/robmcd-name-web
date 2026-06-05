import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function BlogSidebar({
  pageNumber = 1,
}: {
  pageNumber?: number
}): Promise<React.ReactNode> {
  const payload = await getPayload({ config: configPromise })

  // Fetch all posts for sidebar
  const posts = await payload.find({
    collection: 'posts',
    sort: ['-sortOrder', 'title'],
    limit: 20,
    page: pageNumber,
  })

  return (
    <>
      {posts.docs.length > 0 && (
        <div className="flex-1 w-full max-w-[20rem] rounded-xl bg-white bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5 sm:mx-auto">
          <div className="p-4 mb-2">
            <h3>Posts</h3>
            <ol>
              {posts.docs.map((post, idx) => (
                <li key={post.id} className="mb-2">
                  {idx + 1}.{' '}
                  <a href={`/blog/${post.slug}`} className="text-xl font-semibold text-shadow-md">
                    {post.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </>
  )
}
