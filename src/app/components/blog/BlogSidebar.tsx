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
        <div className="w-full max-w-sm rounded-2xl bg-gradient-to-br from-[#EFF6E0] to-[#f5f9ec] p-6 shadow-lg border border-[#AEC3B0] border-opacity-30 hover:shadow-xl hover:border-opacity-50 transition-all duration-300">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-[#124559] mb-1">Latest Posts</h3>
            <div className="h-1 w-12 bg-gradient-to-r from-[#124559] to-[#598392] rounded-full"></div>
          </div>

          <ol className="space-y-3">
            {posts.docs.map((post, idx) => (
              <li key={post.id} className="group">
                <a
                  href={`/blog/${post.slug}`}
                  className="flex items-start gap-3 p-3 rounded-lg bg-white bg-opacity-60 hover:bg-opacity-100 transition-all duration-300 border border-[#AEC3B0] border-opacity-0 hover:border-opacity-50 hover:-translate-x-1"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-[#124559] to-[#598392] text-[#EFF6E0] flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <span className="flex-1 font-semibold text-[#124559] group-hover:text-[#598392] transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </span>
                </a>
              </li>
            ))}
          </ol>

          {posts.totalPages && posts.totalPages > 1 && (
            <div className="mt-6 pt-4 border-t border-[#AEC3B0] border-opacity-30">
              <div className="flex gap-2">
                {Array.from({ length: posts.totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`px-3 py-1 rounded text-sm font-semibold transition-all duration-300 ${
                      pageNumber === page
                        ? 'bg-[#124559] text-[#EFF6E0]'
                        : 'bg-[#EFF6E0] text-[#124559] hover:bg-[#AEC3B0] hover:text-[#01161E]'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
