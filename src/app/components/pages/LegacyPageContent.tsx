import React, { Suspense } from 'react'
import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import type { Page } from '@/payload-types'
import MyForm from '@/app/components/blocks/MyForm'
import { CodeBlockComponent } from '@/app/components/blocks/CodeBlock'

export function LegacyPageContent({ page }: { page: Page }) {
  return (
    <article className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-[#AEC3B0] border-opacity-20">
        <h1 className="text-4xl md:text-5xl font-bold text-[#01161E] mb-6 leading-tight">
          {page.title}
        </h1>

        {page.content && (
          <div className="prose prose-lg max-w-none">
            <RichTextConverter data={page.content} />
          </div>
        )}

        {page.layout && page.layout.length > 0 && (
          <div className="mt-12 pt-8 border-t border-[#AEC3B0] border-opacity-30">
            {page.layout.map((block, index) => {
              switch (block.blockType) {
                case 'formBlock':
                  return (
                    <div
                      key={index}
                      className="my-8 p-6 rounded-xl bg-gradient-to-r from-[#EFF6E0] to-[#f5f9ec] border border-[#AEC3B0] border-opacity-30"
                    >
                      <h2 className="text-2xl font-bold text-[#01161E] mb-6">
                        {typeof block.form === 'object' ? block.form.title : ''}
                      </h2>
                      <Suspense
                        fallback={
                          <div className="text-center py-4 text-[#598392]">Loading form...</div>
                        }
                      >
                        <MyForm formId={String(typeof block.form === 'object' ? block.form.id : block.form)} />
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
                default:
                  return null
              }
            })}
          </div>
        )}
      </div>
    </article>
  )
}
