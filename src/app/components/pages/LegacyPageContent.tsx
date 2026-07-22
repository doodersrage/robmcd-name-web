import React, { Suspense } from 'react'
import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import type { Page } from '@/payload-types'
import MyForm from '@/app/components/blocks/MyForm'
import { CodeBlockComponent } from '@/app/components/blocks/CodeBlock'
import { PageShell } from '@/app/components/pages/PageShell'

export function LegacyPageContent({ page }: { page: Page }) {
  return (
    <PageShell title={page.title}>
      {page.content && (
        <div className="prose-site">
          <RichTextConverter data={page.content} />
        </div>
      )}

      {page.layout && page.layout.length > 0 && (
        <div className="space-y-8 border-t border-slate-200/80 pt-8 dark:border-zinc-800/80">
          {page.layout.map((block, index) => {
            switch (block.blockType) {
              case 'formBlock':
                return (
                  <div key={index} className="card">
                    <div className="card-content">
                      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
                        {typeof block.form === 'object' ? block.form.title : ''}
                      </h2>
                      <Suspense
                        fallback={
                          <div className="py-4 text-center text-sm text-slate-500 dark:text-zinc-500">
                            Loading form...
                          </div>
                        }
                      >
                        <MyForm
                          formId={String(typeof block.form === 'object' ? block.form.id : block.form)}
                        />
                      </Suspense>
                    </div>
                  </div>
                )
              case 'codeBlock':
                return (
                  <div key={index}>
                    <Suspense
                      fallback={
                        <div className="py-4 text-center text-sm text-slate-500 dark:text-zinc-500">
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
    </PageShell>
  )
}
