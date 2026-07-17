'use client'
import React from 'react'
import { Highlight, themes } from 'prism-react-renderer'

type CodeBlockProps = {
  code: string
  language: string
}

export const CodeBlockComponent: React.FC<CodeBlockProps> = ({ code, language }) => {
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-[color:var(--color-border)] text-sm shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between border-b border-[color:var(--color-border)] bg-[rgb(8_10_18/0.95)] px-4 py-3 text-xs text-foreground-muted select-none">
        <span className="font-semibold uppercase tracking-wide">{language}</span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(code)
          }}
          className="btn btn-secondary px-3 py-1 text-xs"
          aria-label="Copy code to clipboard"
        >
          Copy
        </button>
      </div>
      <Highlight theme={themes.vsDark} code={code} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} overflow-x-auto bg-[rgb(8_10_18/0.98)] p-4`} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="mr-6 inline-block w-8 text-right text-foreground-subtle select-none opacity-70">
                  {i + 1}
                </span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
