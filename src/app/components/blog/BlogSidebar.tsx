import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function BlogSidebar({
  pageNumber = 1,
}: {
  pageNumber?: number
}): Promise<React.ReactNode> {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    sort: ['-sortOrder', 'title'],
    limit: 20,
    page: pageNumber,
  })

  return (
    <>
      {posts.docs.length > 0 && (
        <div className="card sidebar-card">
          <div className="mb-6">
            <h3 className="sidebar-title">Latest Posts</h3>
            <div className="sidebar-accent" />
          </div>

          <ol className="space-y-3">
            {posts.docs.map((post, idx) => (
              <li key={post.id} className="group">
                <a href={`/blog/${post.slug}`} className="sidebar-link">
                  <span className="sidebar-index">{idx + 1}</span>
                  <span className="line-clamp-2 flex-1 font-semibold">{post.title}</span>
                </a>
              </li>
            ))}
          </ol>

          {posts.totalPages && posts.totalPages > 1 && (
            <div className="mt-6 border-t border-slate-200/80 pt-4 dark:border-zinc-800/80">
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: posts.totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`rounded-xl px-3 py-1.5 text-sm font-semibold transition-all duration-300 ${
                      pageNumber === page ? 'btn-primary' : 'btn-secondary'
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
