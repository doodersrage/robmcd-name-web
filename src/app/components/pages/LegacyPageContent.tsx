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
        <div className="mt-12 border-t border-[color:var(--color-border)] pt-8">
          {page.layout.map((block, index) => {
            switch (block.blockType) {
              case 'formBlock':
                return (
                  <div key={index} className="card my-8">
                    <div className="card-content">
                      <h2 className="mb-6 text-2xl font-bold text-foreground">
                        {typeof block.form === 'object' ? block.form.title : ''}
                      </h2>
                      <Suspense
                        fallback={
                          <div className="py-4 text-center text-foreground-subtle">Loading form...</div>
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
                  <div key={index} className="my-8">
                    <Suspense
                      fallback={
                        <div className="py-4 text-center text-foreground-subtle">Loading code block...</div>
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
